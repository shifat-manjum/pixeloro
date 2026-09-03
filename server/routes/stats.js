const express = require('express');
const router = express.Router();
const Stat = require('../models/Stat');

// POST /api/stats/visit - Increment visitor count
router.post('/visit', async (req, res) => {
    try {
        let stat = await Stat.findOne({ id: 'global' });
        if (!stat) {
            stat = new Stat({ id: 'global', totalVisitors: 0 });
        }
        stat.totalVisitors += 1;
        await stat.save();
        res.status(200).json({ message: 'Visit recorded', totalVisitors: stat.totalVisitors });
    } catch (error) {
        console.error('Error recording visit:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/stats - Get current stats
router.get('/', async (req, res) => {
    try {
        const stat = await Stat.findOne({ id: 'global' });
        res.status(200).json(stat || { totalVisitors: 0 });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

