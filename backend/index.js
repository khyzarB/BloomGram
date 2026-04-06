import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const VALID_FLOWERS = [
  'rose','peony','tulip','daisy','sunflower','lily','lotus','orchid','lavender','cherry'
];
const VALID_GREENERY = ['fern','eucalyptus','ivy','babybreath','leafspray'];
const VALID_THEMES = ['vintage','blush','botanical','elegant','midnight','sunrise'];

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/bouquets', (req, res) => {
  const { flowers, greenery, flowerPositions, theme, toName, fromName, message } = req.body;

  if (!Array.isArray(flowers) || flowers.length === 0 || flowers.length > 12)
    return res.status(400).json({ error: 'Select 1–12 flowers.' });
  if (!flowers.every(f => VALID_FLOWERS.includes(f.id || f)))
    return res.status(400).json({ error: 'Invalid flower.' });
  if (!Array.isArray(greenery) || !greenery.every(g => VALID_GREENERY.includes(g)))
    return res.status(400).json({ error: 'Invalid greenery.' });
  if (!VALID_THEMES.includes(theme))
    return res.status(400).json({ error: 'Invalid theme.' });
  if (!toName?.trim())
    return res.status(400).json({ error: '"To" name required.' });
  if (!fromName?.trim())
    return res.status(400).json({ error: '"From" name required.' });
  if (!message?.trim() || message.length > 400)
    return res.status(400).json({ error: 'Message required (max 400 chars).' });

  const id = nanoid(8);
  db.prepare(
    `INSERT INTO bouquets (id, flowers, greenery, flower_positions, theme, to_name, from_name, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    JSON.stringify(flowers),
    JSON.stringify(greenery),
    JSON.stringify(flowerPositions || []),
    theme,
    toName.trim(),
    fromName.trim(),
    message.trim()
  );

  res.status(201).json({ id, url: `/bouquet/${id}` });
});

app.get('/api/bouquets/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM bouquets WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Bouquet not found.' });

  res.json({
    id: row.id,
    flowers: JSON.parse(row.flowers),
    greenery: JSON.parse(row.greenery),
    flowerPositions: JSON.parse(row.flower_positions),
    theme: row.theme,
    toName: row.to_name,
    fromName: row.from_name,
    message: row.message,
    createdAt: row.created_at,
  });
});

app.listen(PORT, () => console.log(`BloomGram API → http://localhost:${PORT}`));
