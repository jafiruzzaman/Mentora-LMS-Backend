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

export const sendEmail = async ({
  to,
  html,
  subject,
}: SendMailOptions) => {
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
