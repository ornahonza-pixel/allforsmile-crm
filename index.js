const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

// --- IN-MEMORY DATA ---
let kontakty = [];
let hovory = [];

// ==================
// KONTAKT ENDPOINTS
// ==================

app.post('/contacts', (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) return res.status(400).json({ error: 'invalidDtoIn', message: 'name and phone are required' });
  const kontakt = { id: uuidv4(), name, phone };
  kontakty.push(kontakt);
  res.status(201).json(kontakt);
});

app.get('/contacts/:id', (req, res) => {
  const kontakt = kontakty.find(k => k.id === req.params.id);
  if (!kontakt) return res.status(404).json({ error: 'notFound' });
  res.json(kontakt);
});

app.get('/contacts', (req, res) => {
  res.json({ itemList: kontakty, pageInfo: { total: kontakty.length } });
});

app.put('/contacts/:id', (req, res) => {
  const kontakt = kontakty.find(k => k.id === req.params.id);
  if (!kontakt) return res.status(404).json({ error: 'notFound' });
  const { name, phone } = req.body;
  if (name) kontakt.name = name;
  if (phone) kontakt.phone = phone;
  res.json(kontakt);
});

// ==================
// HOVOR ENDPOINTS
// ==================

app.post('/calls', (req, res) => {
  const { kontaktId, datum, delka, poznamka } = req.body;
  if (!kontaktId || !datum) return res.status(400).json({ error: 'invalidDtoIn', message: 'kontaktId and datum are required' });
  const hovor = { id: uuidv4(), kontaktId, datum, delka, poznamka };
  hovory.push(hovor);
  res.status(201).json(hovor);
});

app.get('/calls/:id', (req, res) => {
  const hovor = hovory.find(h => h.id === req.params.id);
  if (!hovor) return res.status(404).json({ error: 'notFound' });
  res.json(hovor);
});

app.get('/calls', (req, res) => {
  res.json({ itemList: hovory, pageInfo: { total: hovory.length } });
});

app.put('/calls/:id', (req, res) => {
  const hovor = hovory.find(h => h.id === req.params.id);
  if (!hovor) return res.status(404).json({ error: 'notFound' });
  const { datum, delka, poznamka } = req.body;
  if (datum) hovor.datum = datum;
  if (delka) hovor.delka = delka;
  if (poznamka) hovor.poznamka = poznamka;
  res.json(hovor);
});

app.listen(3000, () => console.log('Server running on port 3000'));
