const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const emailOptions = {
    from: 'Cineflix support <support@inflex.com>',
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  try {
    // Send email
    const info = await transporter.sendMail(emailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for further handling
  }
};

module.exports = sendEmail;
