const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { name, phone, email, role, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required fields.' });
    }

    console.log('Received contact submission (serverless):', { name, phone, email, role, message });

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.CONTACT_EMAIL || 'info@htechsupports.com',
        subject: `New Contact Request: ${role || 'General Inquiry'}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nRole: ${role}\nMessage: ${message}`,
      });
    }

    return res.status(200).json({ success: true, message: 'Thank you for reaching out! We will respond shortly.' });
  } catch (error) {
    console.error('Contact form submission error (serverless):', error);
    return res.status(500).json({ success: false, error: 'An internal server error occurred while processing your submission.' });
  }
};
