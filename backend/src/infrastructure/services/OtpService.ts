import crypto from "crypto";

export class OtpService {
  private store: Map<string, { otp: string; expiresAt: number; data?: any }> = new Map();

  private readonly EXPIRATION_MINUTES = 10;

  generateOtp(email: string, data?: any): string {
    const otp = crypto.randomInt(100000, 999999).toString();
    
    const expiresAt = Date.now() + this.EXPIRATION_MINUTES * 60 * 1000;
    
    this.store.set(email, { otp, expiresAt, data });
    
    console.log(`\n\n[MOCK EMAIL SERVICE] OTP for ${email}: ${otp} (Valid for ${this.EXPIRATION_MINUTES} minutes)\n\n`);
    
    return otp;
  }

  verifyOtp(email: string, otp: string): { isValid: boolean, data?: any } {
    const record = this.store.get(email);
    
    if (!record) {
      return { isValid: false };
    }
    
    if (Date.now() > record.expiresAt) {
      this.store.delete(email);
      return { isValid: false };
    }
    
    if (record.otp === otp) {
      this.store.delete(email);
      return { isValid: true, data: record.data };
    }
    
    return { isValid: false };
  }
}

export const otpService = new OtpService();
