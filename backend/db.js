import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'bloomgram.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS bouquets (
    id TEXT PRIMARY KEY,
    flowers TEXT NOT NULL,
    greenery TEXT NOT NULL,
    flower_positions TEXT NOT NULL,
    theme TEXT NOT NULL,
    to_name TEXT NOT NULL,
    from_name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;
