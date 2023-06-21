const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  res.json(db[randomIndex]);
});

app.get('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const testimonial = db.find(item => item.id == id);
  res.json(testimonial);
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  db.push({ id, author, text });
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;
  const index = db.findIndex(item => item.id == id);
  if (index !== -1) {
    db[index] = { id, author, text };
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.delete('/testimonials/:id', (req, res) => {
  const { id } = req.params;
  const index = db.findIndex(item => item.id == id);
  if (index !== -1) {
    db.splice(index, 1);
    res.json({ message: 'OK' });
  } else {
    res.status(404).json({ message: 'Testimonial not found' });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});