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

export const sendWelcomeEmail = async ({
  to,
  html,
  subject,
}: SendMailOptions) => {
  const mailOptions = {
    from: `Mentora LMS <${env.SMTP_FROM} || ${env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};
