const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.get('/seats', (req, res) => {
  res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
  const { id } = req.params;
  const seat = db.seats.find(item => item.id == id);
  seat ? res.json(seat) : res.status(404).json({ message: 'Seat not found' });
});

router.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  
  const seatIsTaken = db.seats.some(seatItem => seatItem.day === day && seatItem.seat === seat);
  if (seatIsTaken) {
    return res.status(409).json({ message: 'The slot is already taken...' });
  }
  
  const id = uuidv4();
  db.seats.push({ id, day, seat, client, email });
  res.json({ message: 'OK' });
});

router.put('/seats/:id', (req, res) => {
  const { id } = req.params;
  const { day, seat, client, email } = req.body;
  const index = db.seats.findIndex(item => item.id == id);
  if (index !== -1) {
    db.seats[index] = { id, day, seat, client, email };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

router.delete('/seats/:id', (req, res) => {
  const { id } = req.params;
  const index = db.seats.findIndex(item => item.id == id);
  if (index !== -1) {
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

module.exports = router;