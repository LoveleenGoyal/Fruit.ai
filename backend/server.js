// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/faqdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Faq = mongoose.model('Faq', faqSchema);

// CRUD Operations

// Create
app.post('/faqs', async (req, res) => {
  const { question, answer } = req.body;
  const newFaq = new Faq({ question, answer });
  await newFaq.save();
  res.status(201).json(newFaq);
});

// Read
app.get('/faqs', async (req, res) => {
  const faqs = await Faq.find();
  res.status(200).json(faqs);
});

// Update
app.put('/faqs/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const updatedFaq = await Faq.findByIdAndUpdate(id, { question, answer }, { new: true });
  res.status(200).json(updatedFaq);
});

// Delete
app.delete('/faqs/:id', async (req, res) => {
  const { id } = req.params;
  await Faq.findByIdAndDelete(id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
