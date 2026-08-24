const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

async function sendTestEmail() {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const fromEmail = process.env.EMAIL_USER.replace('@', '+orders@');

  try {
    const info = await transporter.sendMail({
      from: `"Sky Crackers" <${fromEmail}>`,
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      subject: 'Test Email for "me" fix with alias',
      html: '<p>Test</p>',
    });
    console.log("Sent successfully!", info.messageId);
  } catch (error) {
    console.error("Failed to send:", error);
  }
}

sendTestEmail();
