const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('======================================================');
    console.log('EMAIL NOT SENT - NO SMTP USER/PASS PROVIDED');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('Message:', options.message);
    console.log('======================================================');
    return;
  }

  const host = (process.env.SMTP_HOST || '').toLowerCase();
  const isGmail = host.includes('gmail') || (process.env.SMTP_USER || '').includes('gmail');

  let transportConfig;
  if (isGmail) {
    transportConfig = {
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  } else {
    const port = Number(process.env.SMTP_PORT) || 587;
    transportConfig = {
      host: process.env.SMTP_HOST,
      port: port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  }

  const transporter = nodemailer.createTransport(transportConfig);

  const cleanFromName = (process.env.FROM_NAME || 'Nursing Officer Training').replace(/^["']|["']$/g, '').trim();
  const cleanFromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@example.com').trim();

  const message = {
    from: `"${cleanFromName}" <${cleanFromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML message
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  return info;
};

module.exports = sendEmail;
