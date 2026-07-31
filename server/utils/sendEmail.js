const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!process.env.SMTP_HOST) {
    console.log('======================================================');
    console.log('EMAIL NOT SENT - NO SMTP CREDENTIALS PROVIDED');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('Message:', options.message);
    console.log('======================================================');
    return;
  }

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Nursing Website'} <${process.env.FROM_EMAIL || 'noreply@example.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
