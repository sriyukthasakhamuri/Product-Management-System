const nodemailer = require('nodemailer');

// Create a transporter for Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider (e.g., Gmail)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to, // Recipient's email
    subject, // Subject line
    text, // Email body
  };

  return transporter.sendMail(mailOptions)
    .then(() => console.log('Email sent successfully'))
    .catch((error) => console.error('Error sending email:', error));
};

module.exports = sendEmail; // Export the sendEmail function
