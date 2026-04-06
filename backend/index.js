import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const VALID_FLOWERS = [
  'rose', 'peony', 'tulip', 'daisy', 'lily', 'lotus',
  'sunflower', 'hibiscus', 'orchid', 'camellia', 'lavender', 'cherry',
];
const VALID_THEMES = ['blush', 'botanical', 'vintage', 'elegant', 'midnight', 'sunrise'];
const VALID_ARRANGEMENTS = ['round', 'cascade', 'heart', 'crescent'];
const VALID_WRAPPERS = ['cream', 'pink', 'sage', 'lavender', 'white', 'kraft'];
const VALID_RIBBONS = ['rose', 'gold', 'sage', 'lavender', 'peach', 'navy'];

app.post('/api/bouquets', (req, res) => {
  const { flowers, arrangement, wrapperColor, ribbonColor, theme, toName, fromName, message } = req.body;

  if (!Array.isArray(flowers) || flowers.length === 0 || flowers.length > 12) {
    return res.status(400).json({ error: 'Please select between 1 and 12 flowers.' });
  }
  if (!flowers.every((f) => VALID_FLOWERS.includes(f))) {
    return res.status(400).json({ error: 'Invalid flower selection.' });
  }
  if (!VALID_THEMES.includes(theme)) {
    return res.status(400).json({ error: 'Invalid card theme.' });
  }
  if (!toName || typeof toName !== 'string' || toName.trim().length === 0) {
    return res.status(400).json({ error: '"To" name is required.' });
  }
  if (!fromName || typeof fromName !== 'string' || fromName.trim().length === 0) {
    return res.status(400).json({ error: '"From" name is required.' });
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (message.length > 400) {
    return res.status(400).json({ error: 'Message must be 400 characters or fewer.' });
  }

  const safeArrangement = VALID_ARRANGEMENTS.includes(arrangement) ? arrangement : 'round';
  const safeWrapper = VALID_WRAPPERS.includes(wrapperColor) ? wrapperColor : 'cream';
  const safeRibbon = VALID_RIBBONS.includes(ribbonColor) ? ribbonColor : 'rose';

  const id = nanoid(8);

  db.prepare(
    `INSERT INTO bouquets (id, flowers, arrangement, wrapper_color, ribbon_color, theme, to_name, from_name, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, JSON.stringify(flowers), safeArrangement, safeWrapper, safeRibbon, theme.trim(), toName.trim(), fromName.trim(), message.trim());

  res.status(201).json({ id, url: `/bouquet/${id}` });
});

app.get('/api/bouquets/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM bouquets WHERE id = ?').get(req.params.id);

  if (!row) {
    return res.status(404).json({ error: 'Bouquet not found.' });
  }

  res.json({
    id: row.id,
    flowers: JSON.parse(row.flowers),
    arrangement: row.arrangement || 'round',
    wrapperColor: row.wrapper_color || 'cream',
    ribbonColor: row.ribbon_color || 'rose',
    theme: row.theme,
    toName: row.to_name,
    fromName: row.from_name,
    message: row.message,
    createdAt: row.created_at,
  });
});

app.listen(PORT, () => {
  console.log(`BloomGram backend running on http://localhost:${PORT}`);
});
