const express = require('express');
const twilio = require('twilio');
const { generateWhatsAppResponse } = require('../services/aiAgent');

const router = express.Router();
const MessagingResponse = twilio.twiml.MessagingResponse;

// Webhook for Twilio WhatsApp
router.post('/whatsapp', async (req, res) => {
  try {
    const incomingMsg = req.body.Body || '';
    const sender = req.body.From || 'Unknown';
    
    console.log(`[WhatsApp] Received message from ${sender}: ${incomingMsg}`);
    
    // Generate AI response
    const aiResponse = await generateWhatsAppResponse(incomingMsg, sender);
    console.log(`[WhatsApp] AI Response: ${aiResponse}`);
    
    // Twilio uses TwiML to auto-respond to webhooks
    const twiml = new MessagingResponse();
    twiml.message(aiResponse);
    
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  } catch (err) {
    console.error('[WhatsApp Webhook Error]:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

