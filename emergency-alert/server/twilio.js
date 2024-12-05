const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

/**
 * Initiates a call to a contact.
 * @param {Object} contact - Contact object with name and phone.
 */
function makeCall(contact) {
    return client.calls.create({
        to: contact.phone,
        from: twilioNumber,
        url: 'http://localhost:3000/public/twiml.xml', // Hosted TwiML for voice message
        statusCallback: 'http://localhost:3000/status',
        statusCallbackEvent: ['completed', 'failed', 'no-answer'],
    });
}

module.exports = { makeCall };
