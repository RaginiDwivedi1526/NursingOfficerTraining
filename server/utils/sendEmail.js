const nodemailer = require('nodemailer');

const createTransporter = (port) => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout: 8000, // 8-second connection timeout
    greetingTimeout: 8000,
    socketTimeout: 10000
  });
};

const sendEmail = async (options) => {
  // 1. Resend HTTP API: 100% supported on Vercel & cloud serverless (uses HTTPS Port 443, never blocked)
  if (process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Nursing Officer Training <onboarding@resend.dev>',
          to: [options.email],
          subject: options.subject,
          text: options.message,
          html: options.html
        })
      });

      const resendData = await resendRes.json();
      if (!resendRes.ok) {
        throw new Error(resendData.message || 'Resend API call failed');
      }
      console.log('[sendEmail] Email delivered successfully via Resend HTTP API:', resendData.id);
      return resendData;
    } catch (resendError) {
      console.warn('[sendEmail] Resend HTTP API failed, falling back to SMTP:', resendError.message);
    }
  }

  // 2. Standard SMTP Fallback
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('======================================================');
    console.log('EMAIL NOT SENT - NO SMTP USER/PASS PROVIDED');
    console.log('To:', options.email);
    console.log('Subject:', options.subject);
    console.log('Message:', options.message);
    console.log('======================================================');
    return;
  }

  const cleanFromName = (process.env.FROM_NAME || 'Nursing Officer Training').replace(/^["']|["']$/g, '').trim();
  const cleanFromEmail = (process.env.FROM_EMAIL || process.env.SMTP_USER || 'noreply@example.com').trim();

  const message = {
    from: `"${cleanFromName}" <${cleanFromEmail}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Optional HTML message
  };

  const primaryPort = Number(process.env.SMTP_PORT) || 587;
  const fallbackPort = primaryPort === 587 ? 465 : 587;

  try {
    const transporter = createTransporter(primaryPort);
    const info = await transporter.sendMail(message);
    console.log(`[sendEmail] Message sent via port ${primaryPort}: %s`, info.messageId);
    return info;
  } catch (errPrimary) {
    console.warn(`[sendEmail] Port ${primaryPort} connection failed (${errPrimary.message}). Trying fallback port ${fallbackPort}...`);
    const fallbackTransporter = createTransporter(fallbackPort);
    const info = await fallbackTransporter.sendMail(message);
    console.log(`[sendEmail] Message sent via fallback port ${fallbackPort}: %s`, info.messageId);
    return info;
  }
};

module.exports = sendEmail;
