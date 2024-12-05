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
    // Define inline TwiML response
    const twiml = `<Response><Say>Emergency! Please respond immediately.</Say></Response>`;

    // Use inline TwiML directly in the API call
    return client.calls.create({
        to: contact.phone,
        from: twilioNumber,
        twiml: twiml, // Directly pass the inline TwiML
        statusCallback: 'http://localhost:3000/status', // Track status callbacks
        statusCallbackEvent: ['completed', 'failed', 'no-answer'], // Track relevant call events
    })
    .then(call => {
        // Log the call details after it's made
        console.log(`Call initiated: ${call.sid}`);
        console.log(`To: ${call.to}`);
        console.log(`From: ${call.from}`);
        console.log(`Call status: ${call.status}`);
    })
    .catch(error => {
        // Log any error that occurs during the call
        console.error('Error initiating call:', error.message);
    });
}

module.exports = { makeCall };
