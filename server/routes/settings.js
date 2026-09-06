const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');

// Default fallback settings
const DEFAULT_SETTINGS = {
  monthlyPrice: '55',
  lifetimePrice: '399',
  whatsappNumber: '+393481134181',
  whatsappAlerts: true,
  emailAlerts: true,
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripePaymentLink: process.env.STRIPE_PAYMENT_LINK || '',
  stripeLifetimePaymentLink: process.env.STRIPE_LIFETIME_PAYMENT_LINK || ''
};

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    const settingsDocs = await Setting.find({});
    const settingsMap = { ...DEFAULT_SETTINGS };
    
    settingsDocs.forEach(doc => {
      settingsMap[doc.key] = doc.value;
    });

    res.json(settingsMap);
  } catch (err) {
    console.error('[Settings API Error]:', err);
    res.json(DEFAULT_SETTINGS);
  }
});

// POST or PUT /api/settings (Update settings)
router.post('/', async (req, res) => {
  try {
    const updates = req.body;
    
    const updatePromises = Object.entries(updates).map(([key, value]) => {
      return Setting.findOneAndUpdate(
        { key },
        { key, value },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    });

    await Promise.all(updatePromises);
    
    // Return all updated settings
    const settingsDocs = await Setting.find({});
    const settingsMap = { ...DEFAULT_SETTINGS };
    settingsDocs.forEach(doc => {
      settingsMap[doc.key] = doc.value;
    });

    res.json({ message: 'Settings saved successfully', settings: settingsMap });
  } catch (err) {
    console.error('[Settings Save Error]:', err);
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

module.exports = router;

