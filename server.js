const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

app.get('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const testimonial = db.testimonials.find(item => item.id == id);
  res.json(testimonial);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  db.testimonials.push({ id, author, text });
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const index = db.testimonials.findIndex(item => item.id == id);
  if (index !== -1) {
    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  const { id } = req.params;
  const concert = db.concerts.find(item => item.id == id);
  concert ? res.json(concert) : res.status(404).json({ message: 'Concert not found' });
});

app.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  db.concerts.push({ id, performer, genre, price, day, image });
  res.json({ message: 'OK' });
});

app.put('/concerts/:id', (req, res) => {
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

app.delete('/concerts/:id', (req, res) => {
  const { id } = req.params;
  const index = db.concerts.findIndex(item => item.id == id);
  if (index !== -1) {
    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Concert not found' });
  }
});

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  const { id } = req.params;
  const seat = db.seats.find(item => item.id == id);
  seat ? res.json(seat) : res.status(404).json({ message: 'Seat not found' });
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  db.seats.push({ id, day, seat, client, email });
  res.json({ message: 'OK' });
});

app.put('/seats/:id', (req, res) => {
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

app.delete('/seats/:id', (req, res) => {
  const { id } = req.params;
  const index = db.seats.findIndex(item => item.id == id);
  if (index !== -1) {
    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Seat not found' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});