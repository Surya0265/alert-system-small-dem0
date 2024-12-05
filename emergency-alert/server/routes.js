const express = require('express');
const { makeCall } = require('./twilio');  // Import the Twilio call logic
const contacts = require('../data/contacts.json');  // Load contacts from the file

const router = express.Router();

// Trigger alert calls
router.post('/alert', async (req, res) => {
    // Create promises to initiate calls to all contacts
    const callPromises = contacts.map(contact => makeCall(contact));

    try {
        // Wait for all calls to be initiated
        await Promise.all(callPromises);
        res.send({ status: 'Calls initiated to all contacts!' });
    } catch (error) {
        console.error('Error initiating calls:', error.message);
        res.status(500).send({ error: 'Failed to initiate calls.' });
    }
});

// Handle Twilio status callback
router.post('/status', (req, res) => {
    console.log('Call status update:', req.body);
    res.sendStatus(200);  // Acknowledge the callback from Twilio
});

module.exports = router;
