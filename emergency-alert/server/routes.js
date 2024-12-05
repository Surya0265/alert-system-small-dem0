const express = require('express');
const { makeCall } = require('./twilio');
const contacts = require('../data/contacts.json');

const router = express.Router();

// Trigger alert calls
router.post('/alert', async (req, res) => {
    const callPromises = contacts.map(contact => makeCall(contact));

    try {
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
    res.sendStatus(200);
});

module.exports = router;
