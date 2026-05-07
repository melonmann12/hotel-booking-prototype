import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// ——— Lightweight hotel data for token optimization ———
interface HotelSummary {
  name: string;
  city: string;
  stars: number;
  startingPrice: number;
  description: string;
  amenities: string[];
  rating: number;
  roomTypes: string[];
}

async function getOptimizedHotelData(): Promise<string> {
  const filePath = path.join(process.cwd(), "data/hotels.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const hotels = JSON.parse(fileContents);

  const optimized: HotelSummary[] = hotels.map((h: any) => ({
    name: h.name,
    city: h.city,
    stars: h.stars,
    startingPrice: h.startingPrice,
    // Trim description to 120 chars to save tokens
    description:
      h.description.length > 120
        ? h.description.slice(0, 120) + "…"
        : h.description,
    amenities: h.amenities.map((a: any) => a.label),
    rating: h.rating.score,
    roomTypes: h.rooms.map((r: any) => `${r.type} (${r.price.toLocaleString("vi-VN")} ₫)`),
  }));

  return JSON.stringify(optimized, null, 0); // compact JSON, no extra whitespace
}

// ——— Multi-key rotation with 429 fallback ———
function getApiKeys(): string[] {
  const multiKeysRaw = process.env.GEMINI_API_KEYS;
  const singleKeyRaw = process.env.GEMINI_API_KEY;

  // ── ENV DETECTION LOG ──
  if (!multiKeysRaw && !singleKeyRaw) {
    console.error(
      "\n🚨🚨🚨 CRITICAL: Neither GEMINI_API_KEYS nor GEMINI_API_KEY is defined in environment!\n" +
        "   Check .env.local file and restart the dev server.\n"
    );
    return [];
  }

  if (!multiKeysRaw) {
    console.warn(
      "⚠️  GEMINI_API_KEYS is undefined — falling back to single GEMINI_API_KEY"
    );
  }

  // Support both GEMINI_API_KEYS (comma-separated) and legacy single GEMINI_API_KEY
  if (multiKeysRaw) {
    const keys = multiKeysRaw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    return keys;
  }

  if (singleKeyRaw) {
    return [singleKeyRaw.trim()];
  }

  return [];
}

const SYSTEM_INSTRUCTION_TEMPLATE = `Bạn là "DeliBook Assistant" — trợ lý đặt phòng khách sạn thông minh của nền tảng DeliBook.

NGUYÊN TẮC CHÍNH:
- Trả lời bằng tiếng Việt, lịch sự, thân thiện và chuyên nghiệp.
- CHỈ trả lời dựa trên dữ liệu khách sạn được cung cấp bên dưới. Nếu câu hỏi nằm ngoài phạm vi dữ liệu, hãy nói rõ "Hiện tại mình chưa có thông tin về vấn đề này, bạn có thể liên hệ hotline DeliBook để được hỗ trợ thêm nhé!".
- Khi nói về giá, hãy format theo kiểu "1.250.000 ₫" (dùng dấu chấm ngăn hàng nghìn, ký hiệu ₫).
- Trả lời ngắn gọn, dễ hiểu. Dùng emoji phù hợp để tăng tính thân thiện (🏨, ⭐, 💰, 🌊, v.v.).
- Nếu người dùng hỏi gợi ý, hãy so sánh các khách sạn phù hợp và đưa ra lý do.
- Khi liệt kê nhiều khách sạn, dùng format dạng danh sách cho dễ đọc.`;

export async function POST(req: NextRequest) {
  const requestId = Date.now().toString(36); // short unique ID for tracing
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🔵 [${requestId}] New /api/chat request at ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}`);

  try {
    // ── STEP 1: Verify API Keys ──
    const apiKeys = getApiKeys();
    console.log(`\n🔑 [${requestId}] API Key Audit:`);
    console.log(`   Total keys detected: ${apiKeys.length}`);
    if (apiKeys.length === 0) {
      console.error(`   ❌ NO KEYS FOUND — aborting request`);
      return NextResponse.json(
        { error: "No Gemini API keys are configured." },
        { status: 500 }
      );
    }
    apiKeys.forEach((key, i) => {
      console.log(
        `   Key #${i + 1}: ${key.slice(0, 8)}...${key.slice(-4)} (length: ${key.length})`
      );
    });

    // Check for duplicate keys
    const uniqueKeys = new Set(apiKeys);
    if (uniqueKeys.size < apiKeys.length) {
      console.warn(
        `   ⚠️  WARNING: ${apiKeys.length - uniqueKeys.size} duplicate key(s) detected! Rotation will not help if keys are the same.`
      );
    }

    // ── STEP 2: Parse Request Body ──
    const { message, history } = await req.json();
    console.log(`\n📩 [${requestId}] Request Payload:`);
    console.log(`   User message: "${message?.slice(0, 80)}${message?.length > 80 ? "..." : ""}"`);
    console.log(`   History turns: ${(history || []).length}`);

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // ── STEP 3: Build Context & Trace Token Payload ──
    const hotelData = await getOptimizedHotelData();
    const systemInstruction = `${SYSTEM_INSTRUCTION_TEMPLATE}\n\nDỮ LIỆU KHÁCH SẠN:\n${hotelData}`;

    const chatHistory = (history || []).map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })
    );

    // Estimate total character payload (rough token proxy: ~4 chars per token)
    const historyChars = chatHistory.reduce(
      (sum: number, m: any) => sum + m.parts[0].text.length,
      0
    );
    const totalChars =
      systemInstruction.length + historyChars + message.length;
    const estimatedTokens = Math.ceil(totalChars / 4);

    console.log(`\n📊 [${requestId}] Payload Size Trace:`);
    console.log(`   System instruction: ${systemInstruction.length} chars`);
    console.log(`   Hotel data (optimized): ${hotelData.length} chars`);
    console.log(`   Chat history: ${chatHistory.length} turns, ${historyChars} chars`);
    console.log(`   User message: ${message.length} chars`);
    console.log(`   ─────────────────────────────`);
    console.log(`   TOTAL: ~${totalChars.toLocaleString()} chars (~${estimatedTokens.toLocaleString()} estimated tokens)`);

    if (estimatedTokens > 15000) {
      console.warn(
        `   ⚠️  HIGH TOKEN COUNT — this may hit TPM limits on Free Tier`
      );
    }

    // ── STEP 4: Key Rotation Loop ──
    let lastError: any = null;

    for (let i = 0; i < apiKeys.length; i++) {
      const keyPreview = `${apiKeys[i].slice(0, 8)}...${apiKeys[i].slice(-4)}`;
      console.log(`\n🔄 [${requestId}] --- Attempting Key #${i + 1}/${apiKeys.length} (${keyPreview}) ---`);

      try {
        const startTime = performance.now();

        const genAI = new GoogleGenerativeAI(apiKeys[i]);
        const model = genAI.getGenerativeModel({
          model: "gemini-2.0-flash",
          systemInstruction,
        });

        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(message);
        const text = result.response.text();

        const elapsed = (performance.now() - startTime).toFixed(0);
        console.log(`   ✅ SUCCESS with Key #${i + 1} in ${elapsed}ms`);
        console.log(`   Response length: ${text.length} chars`);

        return NextResponse.json({ reply: text });
      } catch (error: any) {
        lastError = error;
        const elapsed = "N/A";
        const errorMsg = error?.message || "Unknown error";

        console.error(`\n   ❌ Key #${i + 1} FAILED:`);
        console.error(`   Error message: ${errorMsg.slice(0, 200)}`);

        // ── STEP 5: Full Error Dump ──
        console.error(`   Full error object:`);
        console.dir(error, { depth: null, colors: true });

        // Check for specific error fields from Google API
        if (error?.errorDetails) {
          console.error(`   Google API errorDetails:`);
          console.dir(error.errorDetails, { depth: null, colors: true });
        }
        if (error?.status) {
          console.error(`   HTTP status from Google: ${error.status}`);
        }

        const is429 =
          errorMsg.includes("429") ||
          errorMsg.includes("quota") ||
          errorMsg.includes("Too Many Requests") ||
          errorMsg.includes("RESOURCE_EXHAUSTED");

        if (is429 && i < apiKeys.length - 1) {
          console.warn(
            `   ↪ Quota exhausted — rotating to Key #${i + 2}...`
          );
          continue;
        }

        if (is429) {
          console.error(`   🛑 ALL ${apiKeys.length} KEYS EXHAUSTED (429 on every key)`);
        } else {
          console.error(`   🛑 Non-retryable error — stopping rotation`);
        }
        break;
      }
    }

    // ── STEP 6: Final Error Response ──
    const isQuotaError =
      lastError?.message?.includes("429") ||
      lastError?.message?.includes("quota");

    console.log(`\n🔴 [${requestId}] Request FAILED:`);
    console.log(`   Error type: ${isQuotaError ? "QUOTA_EXHAUSTED" : "INTERNAL_ERROR"}`);
    console.log(`   Returning HTTP ${isQuotaError ? 429 : 500}`);
    console.log(`${"=".repeat(60)}\n`);

    return NextResponse.json(
      {
        error: isQuotaError
          ? "Tất cả API key đã hết quota. Vui lòng đợi và thử lại sau."
          : lastError?.message || "An unexpected error occurred.",
        code: isQuotaError ? "QUOTA_EXHAUSTED" : "INTERNAL_ERROR",
      },
      { status: isQuotaError ? 429 : 500 }
    );
  } catch (error: any) {
    console.error(`\n💥 [${requestId}] UNHANDLED ERROR:`);
    console.dir(error, { depth: null, colors: true });
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred.", code: "INTERNAL_ERROR" },
      { status: 500 }
    );
  }
}
