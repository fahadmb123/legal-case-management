import { emailService } from "./EmailService";

async function run() {
  console.log("Starting email test...");
  await emailService.sendOtpEmail("test@jurisdesk.com", "123456", 10);
  console.log("Done.");
}

run().catch(console.error);
