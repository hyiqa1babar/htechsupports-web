const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { commitFilesAtomic, readFileFromRepo, getOctokit } = require('../utils/github');

const DATA_DIR = path.join(__dirname, '..', 'content');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const REPO_PATH = 'server/content/messages.json';

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

async function readMessagesFromRepo() {
  try {
    const { content } = await readFileFromRepo(REPO_PATH);
    return JSON.parse(content);
  } catch (_) {
    return [];
  }
}

function nextId() {
  return Date.now().toString();
}

exports.handleContactSubmission = async (req, res) => {
  try {
    const { name, phone, email, role, type, company, message, subject } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required.'
      });
    }

    const submissionType = type || role || 'General Inquiry';
    const senderName = name && name.trim() ? name.trim() : (submissionType.toLowerCase().includes('newsletter') ? 'Newsletter Subscriber' : 'Website Visitor');
    const messageContent = message && message.trim() ? message.trim() : (submissionType.toLowerCase().includes('newsletter') ? 'Subscribed to HTech Supports Insights newsletter' : 'No message provided');

    // Create standardized message record
    const newMessage = {
      id: nextId(),
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

    if (getOctokit()) {
      try {
        const repoMessages = await readMessagesFromRepo();
        repoMessages.unshift(newMessage);
        await commitFilesAtomic(
          [{ path: REPO_PATH, content: JSON.stringify(repoMessages, null, 2) }],
          `lead: new ${submissionType} from ${senderName}`
        );
      } catch (err) {
        console.warn('GitHub sync failed for contact message, falling back to local file:', err.message);
        const messages = readMessagesFile();
        messages.unshift(newMessage);
        writeMessagesFile(messages);
      }
    } else {
      const messages = readMessagesFile();
      messages.unshift(newMessage);
      writeMessagesFile(messages);
    }

    console.log('Received submission:', newMessage);

    // Optional Nodemailer transporter notification
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

        const recipient = process.env.CONTACT_EMAIL || 'info@htechsupports.com';
        await transporter.sendMail({
          from: `"${senderName}" <${email}>`,
          to: recipient,
          subject: `[HTech Supports] New ${submissionType}: ${senderName}`,
          text: `Type: ${submissionType}\nName: ${senderName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nRole: ${role || 'N/A'}\n\nMessage:\n${messageContent}\n\nSubmitted on: ${new Date().toLocaleString()}`,
        });
      } catch (mailErr) {
        console.warn('SMTP notification failed, but submission was saved:', mailErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We will respond shortly.',
      id: newMessage.id
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

exports.updateMessageStatus = async (req, res) => {
  try {
    const messages = readMessagesFile();
    const index = messages.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Message not found' });

    const updated = {
      ...messages[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    messages[index] = updated;

    if (getOctokit()) {
      try {
        const repoMessages = await readMessagesFromRepo();
        const rIdx = repoMessages.findIndex(m => m.id === req.params.id);
        if (rIdx !== -1) {
          repoMessages[rIdx] = updated;
          await commitFilesAtomic(
            [{ path: REPO_PATH, content: JSON.stringify(repoMessages, null, 2) }],
            `admin: update message ${req.params.id} status to ${updated.status || 'updated'}`
          );
        }
      } catch (err) {
        console.warn('GitHub update failed for message:', err.message);
      }
    }

    writeMessagesFile(messages);
    res.json(updated);
  } catch (err) {
    console.error('updateMessageStatus error:', err);
    res.status(500).json({ error: err.message || 'Update failed' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messages = readMessagesFile();
    const filtered = messages.filter(m => m.id !== req.params.id);
    if (messages.length === filtered.length) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (getOctokit()) {
      try {
        const repoMessages = await readMessagesFromRepo();
        const rFiltered = repoMessages.filter(m => m.id !== req.params.id);
        await commitFilesAtomic(
          [{ path: REPO_PATH, content: JSON.stringify(rFiltered, null, 2) }],
          `admin: delete message ${req.params.id}`
        );
      } catch (err) {
        console.warn('GitHub delete failed for message:', err.message);
      }
    }

    writeMessagesFile(filtered);
    res.status(204).end();
  } catch (err) {
    console.error('deleteMessage error:', err);
    res.status(500).json({ error: err.message || 'Delete failed' });
  }
};