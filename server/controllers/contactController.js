const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'content');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

function readMessagesFile() {
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (_) {
    return [];
  }
}

function writeMessagesFile(data) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2));
}

function nextId() {
  return Date.now().toString();
}

exports.handleContactSubmission = async (req, res) => {
  try {
    const { name, phone, email, role, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required fields.'
      });
    }

    // Save message to JSON file
    const newMessage = {
      id: nextId(),
      name,
      phone: phone || '',
      email,
      role: role || 'General Inquiry',
      message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    const messages = readMessagesFile();
    messages.push(newMessage);
    writeMessagesFile(messages);

    console.log('Received contact submission:', newMessage);

    // Optional Nodemailer transporter setup
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

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We will respond shortly.'
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your submission.'
    });
  }
};

exports.getMessages = (req, res) => {
  const messages = readMessagesFile();
  res.json(messages);
};

exports.updateMessageStatus = (req, res) => {
  const messages = readMessagesFile();
  const index = messages.findIndex(m => m.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Message not found' });

  const updated = {
    ...messages[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  messages[index] = updated;
  writeMessagesFile(messages);
  res.json(updated);
};

exports.deleteMessage = (req, res) => {
  const messages = readMessagesFile();
  const filtered = messages.filter(m => m.id !== req.params.id);
  if (messages.length === filtered.length) {
    return res.status(404).json({ error: 'Message not found' });
  }
  writeMessagesFile(filtered);
  res.status(204).end();
};