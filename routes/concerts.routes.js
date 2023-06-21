const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
  const { id } = req.params;
  const concert = db.concerts.find(item => item.id == id);
  concert ? res.json(concert) : res.status(404).json({ message: 'Concert not found' });
});

router.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  db.concerts.push({ id, performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

router.put('/concerts/:id', (req, res) => {
  const { id } = req.params;
  const { performer, genre, price, day, image } = req.body;
  const index = db.concerts.findIndex(item => item.id == id);
  if (index !== -1) {
    db.concerts[index] = { id, performer, genre, price, day, image };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

router.delete('/concerts/:id', (req, res) => {
  const { id } = req.params;
  const index = db.concerts.findIndex(item => item.id == id);
  if (index !== -1) {
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

module.exports = router;