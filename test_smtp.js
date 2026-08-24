import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  try {
    await transporter.verify();
    console.log("SMTP Connection successful!");
  } catch (error) {
    console.error("SMTP Connection Failed:", error);
  }
}

testConnection();
