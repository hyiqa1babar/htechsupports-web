const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'server', 'content');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function readMessages() {
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'));
  } catch (_) {
    return [];
  }
}

function writeMessages(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2));
  } catch (_) {}
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json(readMessages());
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { name, phone, email, role, type, company, message, subject } = req.body || {};

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }

    const submissionType = type || role || 'General Inquiry';
    const senderName = name && name.trim() ? name.trim() : (submissionType.toLowerCase().includes('newsletter') ? 'Newsletter Subscriber' : 'Website Visitor');
    const messageContent = message && message.trim() ? message.trim() : (submissionType.toLowerCase().includes('newsletter') ? 'Subscribed to HTech Supports Insights newsletter' : 'No message provided');

    const newMessage = {
      id: Date.now().toString(),
      name: senderName,
      email: email.trim(),
      phone: phone ? phone.trim() : '',
      company: company ? company.trim() : '',
      role: role || submissionType,
      type: submissionType,
      subject: subject || `${submissionType} from ${senderName}`,
      message: messageContent,
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    const messages = readMessages();
    messages.unshift(newMessage);
    writeMessages(messages);

    console.log('Received contact submission (serverless):', newMessage);

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
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
          from: `"${senderName}" <${email}>`,
          to: process.env.CONTACT_EMAIL || 'info@htechsupports.com',
          subject: `[HTech Supports] New ${submissionType}: ${senderName}`,
          text: `Type: ${submissionType}\nName: ${senderName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\n\nMessage:\n${messageContent}`,
        });
      } catch (e) {
        console.warn('Serverless SMTP send failed:', e.message);
      }
    }

    return res.status(200).json({ success: true, message: 'Thank you for reaching out! We will respond shortly.', id: newMessage.id });
  } catch (error) {
    console.error('Contact form submission error (serverless):', error);
    return res.status(500).json({ success: false, error: 'An internal server error occurred while processing your submission.' });
  }
};
