require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@test-pro-db.2sv1c.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB3'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
