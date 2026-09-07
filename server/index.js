const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config(); // Fallback to process.cwd()

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
// IMPORTANT: Twilio sends webhooks as application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://khshifatmanjum_db_user:Dtmkv5WKtSMqpTEh@cluster0.h8ljzpx.mongodb.net/pixeloro?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const leadRoutes = require('./routes/leads');
const statRoutes = require('./routes/stats');
const settingRoutes = require('./routes/settings');
const paymentRoutes = require('./routes/payments');

app.use('/api/leads', leadRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/payments', paymentRoutes);


app.get('/', (req, res) => {
    res.send('Zentixx IT API is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



