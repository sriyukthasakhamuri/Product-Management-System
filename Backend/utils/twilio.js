const twilio = require('twilio');
require('dotenv').config(); // Ensure this line is at the top of your server.js

// Initialize Twilio client with environment variables
const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send an SMS
const sendSMS = (to, body) => {
  return client.messages.create({
    body, // Message body
    to, // Recipient's phone number
    from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
  })
  .then((message) => console.log(`SMS sent successfully: ${message.sid}`))
  .catch((error) => console.error('Error sending SMS:', error));
};

module.exports = sendSMS; // Export the sendSMS function
