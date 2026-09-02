const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST /api/leads - Create a new lead
router.post('/', async (req, res) => {
    console.log("Received POST request at /api/leads");
    console.log("Request body:", req.body);
    try {
        const { restaurantName, name, email } = req.body;
        
        if (!restaurantName || !name || !email) {
            console.log("Validation failed. Missing fields.");
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newLead = new Lead({
            restaurantName,
            name,
            email
        });

        await newLead.save();

        res.status(201).json({ message: 'Lead captured successfully!', lead: newLead });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

module.exports = router;

