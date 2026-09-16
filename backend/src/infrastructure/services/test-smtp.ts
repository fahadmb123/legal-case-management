import dotenv from "dotenv";
import * as nodemailer from "nodemailer";

// Load environment variables from .env file
dotenv.config();

async function testSMTP() {
  console.log("Loading SMTP configuration from .env...");
  
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  if (!host || !user || !pass) {
    console.error("❌ ERROR: Missing SMTP credentials in .env file.");
    console.error("Please ensure SMTP_HOST, SMTP_USER, and SMTP_PASS are set.");
    process.exit(1);
  }

  console.log(`Connecting to SMTP server at ${host}:${port}...`);
  console.log(`Using email: ${user}`);

  try {
    const transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(port || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: user,
        pass: pass,
      },
    });

    console.log("Verifying connection...");
    await transporter.verify();
    console.log("✅ Connection successful!");

    console.log("Attempting to send a test email to yourself...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || user,
      to: user, // Send to yourself
      subject: "JurisDesk - SMTP Test Successful",
      text: "Your SMTP credentials are working perfectly!",
      html: "<h2 style='color: green;'>Success!</h2><p>Your SMTP credentials are working perfectly for JurisDesk.</p>"
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Check your inbox (and spam folder) for the test email.");

  } catch (error: any) {
    console.error("\n❌ ERROR: SMTP Test Failed!");
    console.error(error.message);
    if (error.message.includes("Invalid login")) {
      console.log("\nTIP: If you are using Gmail, make sure you generated a 16-letter App Password. Your standard Google password will not work.");
    }
  }
}

testSMTP();
