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
    arrangement TEXT NOT NULL DEFAULT 'round',
    wrapper_color TEXT NOT NULL DEFAULT 'cream',
    ribbon_color TEXT NOT NULL DEFAULT 'rose',
    theme TEXT NOT NULL,
    to_name TEXT NOT NULL,
    from_name TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add columns if upgrading from old schema
const cols = db.prepare("PRAGMA table_info(bouquets)").all().map((c) => c.name);
if (!cols.includes('arrangement')) {
  db.exec("ALTER TABLE bouquets ADD COLUMN arrangement TEXT NOT NULL DEFAULT 'round'");
}
if (!cols.includes('wrapper_color')) {
  db.exec("ALTER TABLE bouquets ADD COLUMN wrapper_color TEXT NOT NULL DEFAULT 'cream'");
}
if (!cols.includes('ribbon_color')) {
  db.exec("ALTER TABLE bouquets ADD COLUMN ribbon_color TEXT NOT NULL DEFAULT 'rose'");
}

export default db;
