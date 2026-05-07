"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

const COOLDOWN_SECONDS = 30;

export default function AIChatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Xin chào! 👋 Mình là DeliBook Assistant. Mình có thể giúp bạn tìm khách sạn, so sánh giá, xem tiện nghi và nhiều hơn nữa. Hãy hỏi mình bất cứ điều gì nhé! 🏨",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const cooldownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input when chat window opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Cleanup cooldown timer on unmount
  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, []);

  const startCooldown = useCallback(() => {
    setCooldown(COOLDOWN_SECONDS);

    // Clear any existing timer
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);

    cooldownTimerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownTimerRef.current!);
          cooldownTimerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const isSendDisabled = isLoading || cooldown > 0 || !input.trim();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || cooldown > 0) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build history (exclude the welcome message and the current user message)
      const history = messages
        .filter((_, i) => i > 0) // skip the initial welcome
        .filter((m) => !m.isError) // skip error messages from history
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      const data = await res.json();

      if (!res.ok) {
        const isQuota = res.status === 429 || data.code === "QUOTA_EXHAUSTED";

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: isQuota
              ? `⚠️ Hệ thống đang quá tải, vui lòng đợi ${COOLDOWN_SECONDS} giây và thử lại!`
              : "Xin lỗi, mình đang gặp sự cố kết nối. Bạn vui lòng thử lại sau nhé! 🙏",
            isError: true,
          },
        ]);

        // Start cooldown on quota/server errors
        if (isQuota || res.status >= 500) {
          startCooldown();
        }
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Xin lỗi, mình đang gặp sự cố kết nối. Bạn vui lòng thử lại sau nhé! 🙏",
          isError: true,
        },
      ]);
      startCooldown();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-on-surface text-surface rotate-90"
            : "bg-primary text-on-primary"
        }`}
        aria-label={isOpen ? "Đóng chatbot" : "Mở chatbot DeliBook"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] flex flex-col rounded-2xl shadow-2xl border border-outline/15 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
      >
        {/* Header */}
        <div className="bg-primary text-on-primary px-lg py-md flex items-center gap-sm shrink-0">
          <div className="w-9 h-9 rounded-full bg-on-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-button text-button leading-tight">
              DeliBook Assistant
            </div>
            <div className="text-on-primary/70 text-[11px] leading-tight">
              Trợ lý đặt phòng AI
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-on-primary/20 flex items-center justify-center transition-colors"
            aria-label="Đóng chatbot"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto bg-surface-container-lowest px-md py-md space-y-md overscroll-contain">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-xs items-end ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-1 ${
                    msg.isError ? "bg-error/10" : "bg-primary/10"
                  }`}
                >
                  {msg.isError ? (
                    <AlertTriangle className="w-4 h-4 text-error" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
              )}
              <div
                className={`max-w-[75%] px-md py-sm rounded-2xl text-[14px] leading-relaxed whitespace-pre-wrap break-words ${
                  msg.role === "user"
                    ? "bg-primary text-on-primary rounded-br-sm"
                    : msg.isError
                      ? "bg-error-container text-on-error-container rounded-bl-sm"
                      : "bg-surface-container text-on-surface rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                  <User className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex gap-xs items-end justify-start">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mb-1">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-surface-container text-on-surface-variant px-md py-sm rounded-2xl rounded-bl-sm text-[14px]">
                <span className="inline-flex items-center gap-xs">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang trả lời...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Cooldown Banner */}
        {cooldown > 0 && (
          <div className="shrink-0 bg-error-container text-on-error-container px-md py-xs text-[12px] text-center font-button flex items-center justify-center gap-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            Vui lòng đợi {cooldown}s trước khi gửi tiếp
          </div>
        )}

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="shrink-0 border-t border-outline/15 bg-surface-container-lowest px-md py-sm flex items-center gap-sm"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              cooldown > 0
                ? `Đợi ${cooldown}s...`
                : "Hỏi về khách sạn..."
            }
            disabled={isLoading || cooldown > 0}
            className="flex-1 bg-surface-container rounded-full px-md py-sm text-[14px] text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-2 focus:ring-primary/30 transition-shadow disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isSendDisabled}
            className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            aria-label="Gửi tin nhắn"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
