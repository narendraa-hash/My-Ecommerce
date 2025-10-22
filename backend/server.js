// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('Backend up'));

// main endpoint
app.post('/send-email', async (req, res) => {
    const { toEmail, subject, message } = req.body;

    if (!toEmail || !subject || !message) {
        return res.status(400).json({ error: 'toEmail, subject and message are required' });
    }

    try {
        // transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // your gmail
                pass: process.env.EMAIL_PASS, // app password
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: toEmail,
            subject,
            text: message,
        });

        console.log('Email sent:', info.messageId);
        return res.status(200).json({ message: 'Email sent', id: info.messageId });
    } catch (err) {
        console.error('Send error:', err);
        return res.status(500).json({ error: 'Failed to send email', details: err.message || err });
    }
});

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
