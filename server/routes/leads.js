const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// POST /api/leads - Create a new lead
router.post('/', async (req, res) => {
    console.log("Received POST request at /api/leads");
    console.log("Request body:", req.body);
    try {
        const { restaurantName, name, email, phone } = req.body;
        
        if (!restaurantName || !name || !email || !phone) {
            console.log("Validation failed. Missing fields.");
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newLead = new Lead({
            restaurantName,
            name,
            email,
            phone
        });

        await newLead.save();

        res.status(201).json({ message: 'Lead captured successfully!', lead: newLead });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// GET /api/leads - Read all leads
router.get('/', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); // Get all leads, newest first
        res.status(200).json(leads);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Server error while fetching leads.' });
    }
});

// DELETE /api/leads/:id - Delete a lead by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLead = await Lead.findByIdAndDelete(id);
        if (!deletedLead) {
            return res.status(404).json({ error: 'Lead not found.' });
        }
        res.status(200).json({ message: 'Lead deleted successfully.', id });
    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ error: 'Server error while deleting lead.' });
    }
});

module.exports = router;

