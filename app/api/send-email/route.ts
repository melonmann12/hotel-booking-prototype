import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


export const dynamic = 'force-dynamic';

function buildEmailHtml({
  customerName,
  hotelName,
  checkIn,
  checkOut,
  totalPrice,
}: {
  customerName: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: string;
}) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("vi-VN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Xác nhận đặt phòng – DeliBook</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a1a2e;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%);padding:40px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#94a3b8;">Xác nhận đặt phòng</p>
              <h1 style="margin:0;font-size:32px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">DeliBook</h1>
              <p style="margin:12px 0 0;font-size:14px;color:#7dd3fc;">Hành trình tuyệt vời bắt đầu từ đây</p>
            </td>
          </tr>

          <!-- Success Banner -->
          <tr>
            <td style="background:#0ea5e9;padding:16px 48px;text-align:center;">
              <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">
                ✅ &nbsp;Đặt phòng của bạn đã được xác nhận!
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:40px 48px 24px;">
              <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#0f172a;">
                Xin chào, ${customerName}! 👋
              </p>
              <p style="margin:0;font-size:15px;color:#64748b;line-height:1.7;">
                Cảm ơn bạn đã tin tưởng lựa chọn <strong>DeliBook</strong>. Chúng tôi rất vui được xác nhận đặt phòng của bạn. Dưới đây là thông tin chi tiết về chuyến đi sắp tới của bạn.
              </p>
            </td>
          </tr>

          <!-- Booking Details Card -->
          <tr>
            <td style="padding:0 48px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">

                <!-- Card Title -->
                <tr>
                  <td colspan="2" style="background:#0f172a;padding:16px 24px;">
                    <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7dd3fc;">
                      Chi tiết đặt phòng
                    </p>
                  </td>
                </tr>

                <!-- Hotel -->
                <tr>
                  <td style="padding:20px 24px 10px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:40%;vertical-align:top;">
                    Khách sạn / Resort
                  </td>
                  <td style="padding:20px 24px 10px;font-size:15px;font-weight:700;color:#0f172a;vertical-align:top;">
                    ${hotelName}
                  </td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;"/></td></tr>

                <!-- Check-in -->
                <tr>
                  <td style="padding:16px 24px 8px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">
                    🗓 Nhận phòng
                  </td>
                  <td style="padding:16px 24px 8px;font-size:15px;font-weight:600;color:#0f172a;vertical-align:top;">
                    ${formatDate(checkIn)}
                  </td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;"/></td></tr>

                <!-- Check-out -->
                <tr>
                  <td style="padding:16px 24px 8px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;vertical-align:top;">
                    🗓 Trả phòng
                  </td>
                  <td style="padding:16px 24px 8px;font-size:15px;font-weight:600;color:#0f172a;vertical-align:top;">
                    ${formatDate(checkOut)}
                  </td>
                </tr>
                <tr><td colspan="2" style="padding:0 24px;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;"/></td></tr>

                <!-- Total Price -->
                <tr>
                  <td style="padding:16px 24px 20px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;vertical-align:middle;">
                    💳 Tổng tiền
                  </td>
                  <td style="padding:16px 24px 20px;vertical-align:middle;">
                    <span style="font-size:20px;font-weight:800;color:#0ea5e9;">
                      ${totalPrice}
                    </span>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Policy Notice -->
          <tr>
            <td style="padding:0 48px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;padding:16px 20px;">
                <tr>
                  <td style="font-size:13px;color:#92400e;line-height:1.7;">
                    <strong>📋 Lưu ý quan trọng:</strong><br/>
                    Vui lòng mang theo email xác nhận này khi làm thủ tục nhận phòng. Giờ nhận phòng tiêu chuẩn từ <strong>14:00</strong>, giờ trả phòng trước <strong>12:00</strong>. Để thay đổi hoặc hủy đặt phòng, vui lòng liên hệ với chúng tôi trước 24 giờ.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 48px 40px;text-align:center;">
              <a href="https://delibook.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:16px 40px;border-radius:8px;letter-spacing:0.5px;">
                Xem đặt phòng của tôi →
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;"/>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 48px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f172a;">DeliBook – Nền tảng đặt phòng thông minh</p>
              <p style="margin:0 0 16px;font-size:12px;color:#94a3b8;line-height:1.6;">
                Email này được gửi tự động, vui lòng không trả lời trực tiếp.<br/>
                Nếu bạn cần hỗ trợ, hãy liên hệ <a href="mailto:support@delibook.vn" style="color:#0ea5e9;text-decoration:none;">support@delibook.vn</a>
              </p>
              <p style="margin:0;font-size:11px;color:#cbd5e1;">
                © ${new Date().getFullYear()} DeliBook. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { email, customerName, hotelName, checkIn, checkOut, totalPrice } = body;

    // Validate required fields
    if (!email || !customerName || !hotelName || !checkIn || !checkOut || !totalPrice) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc. Vui lòng cung cấp đầy đủ các trường: email, customerName, hotelName, checkIn, checkOut, totalPrice." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "DeliBook <onboarding@resend.dev>",
      to: [email],
      subject: `✅ Xác nhận đặt phòng tại ${hotelName} – DeliBook`,
      html: buildEmailHtml({ customerName, hotelName, checkIn, checkOut, totalPrice }),
    });

    if (error) {
      console.error("[send-email] Resend error:", error);
      return NextResponse.json(
        { error: "Không thể gửi email. Vui lòng thử lại sau.", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email xác nhận đã được gửi thành công.", id: data?.id },
      { status: 200 }
    );
  } catch (err) {
    console.error("[send-email] Unexpected error:", err);
    return NextResponse.json(
      { error: "Lỗi máy chủ nội bộ." },
      { status: 500 }
    );
  }
}
