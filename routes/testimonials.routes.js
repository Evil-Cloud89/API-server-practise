const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

router.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.get('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const testimonial = db.testimonials.find(item => item.id == id);
  res.json(testimonial);
});

router.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  db.testimonials.push({ id, author, text });
  res.json({ message: 'OK' });
});

router.put('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const index = db.testimonials.findIndex(item => item.id == id);
  if (index !== -1) {
    db.testimonials[index] = { id, author, text };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

router.delete('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const index = db.testimonials.findIndex(item => item.id == id);
  if (index !== -1) {
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

module.exports = router;