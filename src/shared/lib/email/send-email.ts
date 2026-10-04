/**
 * @file send-email.ts
 * @description send email utility functions
 * @author Mohammad-Jafiruzzaman
 * @license Apache-2.0
 * @date 4th October
 */

import { env } from "@/config/env";
import { transporter } from "./mailer";

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// 1. Basic HTML Template Generator for Welcome Emails
export const generateWelcomeEmailTemplate = (name: string): string => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f5f7; padding: 20px; color: #333; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px; }
          .title { color: #1e293b; margin: 0; font-size: 24px; }
          .content { line-height: 1.6; font-size: 16px; }
          .btn { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1 class="title">Welcome to Mentora LMS!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for joining Mentora LMS. We're excited to have you on board!</p>
            <p>Explore our wide range of courses and start learning today.</p>
            <a href="${env.APP_URL || "#"}" class="btn">Go to Dashboard</a>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Mentora LMS. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};
export const passwordResetEmailTemplate = (resetUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Reset your Mentora password</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f3f8;
          font-family: Arial, Helvetica, sans-serif;
          color: #18151f;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            background-color: #f4f3f8;
            padding: 40px 16px;
          "
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 20px;
                  overflow: hidden;
                  box-shadow:
                    0 10px 40px
                    rgba(20, 15, 35, 0.08);
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 32px 40px;
                      background-color: #08070b;
                    "
                  >
                    <div
                      style="
                        font-size: 26px;
                        font-weight: 700;
                        letter-spacing: -0.8px;
                        color: #ffffff;
                      "
                    >
                      Mentora
                    </div>

                    <div
                      style="
                        margin-top: 6px;
                        font-size: 13px;
                        color: #aaa5b5;
                      "
                    >
                      Learn. Build. Grow.
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 48px 40px 40px;">

                    <div
                      style="
                        width: 56px;
                        height: 56px;
                        line-height: 56px;
                        text-align: center;
                        border-radius: 16px;
                        background-color: #f0e9ff;
                        font-size: 26px;
                      "
                    >
                      🔐
                    </div>

                    <h1
                      style="
                        margin: 24px 0 0;
                        font-size: 30px;
                        line-height: 1.25;
                        letter-spacing: -0.8px;
                        color: #18151f;
                      "
                    >
                      Reset your password
                    </h1>

                    <p
                      style="
                        margin: 18px 0 0;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #625d6b;
                      "
                    >
                      We received a request to reset the password
                      associated with your Mentora account.
                    </p>

                    <p
                      style="
                        margin: 14px 0 0;
                        font-size: 16px;
                        line-height: 1.7;
                        color: #625d6b;
                      "
                    >
                      Click the button below to choose a new password
                      and get back to learning.
                    </p>

                    <!-- Button -->
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="margin-top: 32px;"
                    >
                      <tr>
                        <td
                          align="center"
                          style="
                            border-radius: 10px;
                            background-color: #7c3aed;
                          "
                        >
                          <a
                            href="${resetUrl}"
                            target="_blank"
                            style="
                              display: inline-block;
                              padding: 15px 28px;
                              font-size: 15px;
                              font-weight: 700;
                              color: #ffffff;
                              text-decoration: none;
                              border-radius: 10px;
                            "
                          >
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Expiry -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="
                        margin-top: 32px;
                        background-color: #faf9fc;
                        border-radius: 12px;
                      "
                    >
                      <tr>
                        <td style="padding: 18px 20px;">
                          <p
                            style="
                              margin: 0;
                              font-size: 14px;
                              line-height: 1.6;
                              color: #625d6b;
                            "
                          >
                            <strong style="color: #18151f;">
                              This link expires in 15 minutes.
                            </strong>
                            For your security, please reset your
                            password before the link expires.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Security -->
                    <p
                      style="
                        margin: 32px 0 0;
                        padding-top: 24px;
                        border-top: 1px solid #eceaf0;
                        font-size: 13px;
                        line-height: 1.7;
                        color: #85808e;
                      "
                    >
                      If you didn't request a password reset, you can
                      safely ignore this email. Your password will
                      remain unchanged.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 28px 40px;
                      background-color: #faf9fc;
                      border-top: 1px solid #eeeaf3;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 13px;
                        color: #85808e;
                      "
                    >
                      © 2026 Mentora. All rights reserved.
                    </p>

                    <p
                      style="
                        margin: 6px 0 0;
                        font-size: 12px;
                        color: #a09ba8;
                      "
                    >
                      This is an automated security email.
                      Please don't reply to this message.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export const resetPasswordConfirmationTemplate = (
  firstName?: string
): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Changed Successfully</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f3f8;
  font-family: Arial, Helvetica, sans-serif;
  color: #18181b;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="padding: 40px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #08070B;
                padding: 32px;
                text-align: center;
              "
            >
              <h1
                style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  font-weight: 700;
                  letter-spacing: -0.5px;
                "
              >
                Mentora
              </h1>

              <p
                style="
                  margin: 8px 0 0;
                  color: #B48CFF;
                  font-size: 14px;
                "
              >
                Learn. Build. Grow.
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 36px;">

              <h2
                style="
                  margin: 0 0 16px;
                  font-size: 24px;
                  color: #18181b;
                "
              >
                Password changed successfully
              </h2>

              <p
                style="
                  margin: 0 0 16px;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #52525b;
                "
              >
                Hi${firstName ? ` ${firstName}` : ""},
              </p>

              <p
                style="
                  margin: 0 0 20px;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #52525b;
                "
              >
                Your Mentora account password has been successfully
                changed.
              </p>

              <!-- Success Box -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background-color: #f5f3ff;
                  border-radius: 12px;
                  margin: 24px 0;
                "
              >
                <tr>
                  <td style="padding: 20px;">

                    <p
                      style="
                        margin: 0 0 8px;
                        color: #6d28d9;
                        font-size: 15px;
                        font-weight: 700;
                      "
                    >
                      ✓ Password updated
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #52525b;
                        font-size: 14px;
                        line-height: 1.5;
                      "
                    >
                      Your new password is now active and can be
                      used the next time you sign in.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Security Notice -->
              <p
                style="
                  margin: 24px 0 0;
                  font-size: 14px;
                  line-height: 1.6;
                  color: #71717a;
                "
              >
                <strong style="color: #18181b;">
                  Didn't make this change?
                </strong>
                If you didn't reset your password, your account may
                have been compromised. Please contact our support team
                immediately and secure your account.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 24px 36px;
                background-color: #fafafa;
                border-top: 1px solid #eeeeee;
                text-align: center;
              "
            >

              <p
                style="
                  margin: 0 0 8px;
                  font-size: 13px;
                  color: #71717a;
                "
              >
                This is an automated security notification from Mentora.
              </p>

              <p
                style="
                  margin: 0;
                  font-size: 12px;
                  color: #a1a1aa;
                "
              >
                © ${new Date().getFullYear()} Mentora. All rights reserved.
              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

export const sendEmail = async ({ to, html, subject }: SendMailOptions) => {
  const mailOptions = {
    // Fixed string interpolation logic
    from: `Mentora LMS <${env.SMTP_FROM || env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};
