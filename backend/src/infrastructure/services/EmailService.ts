import * as nodemailer from "nodemailer";

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private testAccount: nodemailer.TestAccount | null = null;

  private async getTransporter(): Promise<nodemailer.Transporter> {
    if (this.transporter) {
      return this.transporter;
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      this.testAccount = await nodemailer.createTestAccount();
      
      this.transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: this.testAccount.user,
          pass: this.testAccount.pass,
        },
      });
      
      console.log(`[EmailService] Ethereal Test Account Created: ${this.testAccount.user}`);
    }

    return this.transporter;
  }

  async sendOtpEmail(to: string, otp: string, expirationMinutes: number): Promise<void> {
    try {
      const transporter = await this.getTransporter();

      const fromEmail = process.env.EMAIL_FROM || '"JurisDesk System" <noreply@jurisdesk.com>';

      const info = await transporter.sendMail({
        from: fromEmail,
        to,
        subject: "Verify your JurisDesk Registration",
        text: `Your registration verification code is: ${otp}\nThis code will expire in ${expirationMinutes} minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #0f172a; margin-top: 0;">JurisDesk Verification</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.5;">
              Thank you for registering your practice with JurisDesk. Please use the verification code below to complete your registration.
            </p>
            <div style="background-color: #f1f5f9; padding: 16px; text-align: center; border-radius: 6px; margin: 24px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0f172a;">${otp}</span>
            </div>
            <p style="color: #475569; font-size: 14px;">
              This code will expire in <strong>${expirationMinutes} minutes</strong>.
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 12px; margin-bottom: 0;">
              If you didn't request this code, you can safely ignore this email.
            </p>
          </div>
        `,
      });

      console.log("Message sent: %s", info.messageId);
      
      if (this.testAccount) {
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    } catch (error) {
      console.error("Error sending OTP email:", error);
      throw new Error("Failed to send verification email. Please try again later.");
    }
  }
}

export const emailService = new EmailService();
