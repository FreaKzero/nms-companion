import Database from 'better-sqlite3';
import { ipcMain } from 'electron';

export interface SupplyState {
  id?: number;
  BaseName: string;
  ExtractionPerHour: number;
  Storage: number;
  Material: string;
  LastPickup?: string;
}

export function registerSupplyIpc (db: Database.Database) {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS supply (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      BaseName TEXT NOT NULL,
      ExtractionPerHour REAL NOT NULL,
      Storage REAL NOT NULL,
      Material TEXT NOT NULL,
      LastPickup TEXT NULL
    )
  `).run();

  ipcMain.handle('db.supply.create', (_ev, data: SupplyState) => {
    const stmt = db.prepare(`
      INSERT INTO supply
      (BaseName, ExtractionPerHour, Storage, Material, LastPickup)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      data.BaseName,
      data.ExtractionPerHour,
      data.Storage,
      data.Material,
      data.LastPickup ? new Date(data.LastPickup).toISOString() : null
    );
    return info.lastInsertRowid;
  });

  ipcMain.handle('db.supply.getAll', (_ev, search: string = '') => {
    if (search && search.trim() !== '') {
      const terms = search.split(/\s+/).filter(Boolean);
      const whereClauses = terms
        .map((_, i) => `(BaseName LIKE @term${i} OR Material LIKE @term${i})`)
        .join(' AND ');

      const params: Record<string, string> = {};
      terms.forEach((t, i) => {
        params[`term${i}`] = `%${t}%`;
      });

      const sql = `
        SELECT * FROM supply
        WHERE ${whereClauses}
        ORDER BY id DESC
      `;
      return db.prepare(sql).all(params);
    }

    const entries = db.prepare('SELECT * FROM supply ORDER BY id DESC').all() as unknown as SupplyState[];
    return entries.sort((a, b) => new Date(a.LastPickup).getTime() - new Date(b.LastPickup).getTime());
  });

  ipcMain.handle('db.supply.getId', (_ev, id: number) => {
    return db.prepare('SELECT * FROM supply WHERE id = ?').get(id);
  });

  ipcMain.handle('db.supply.update', (_ev, id: number, data: SupplyState) => {
    try {
      const date = new Date().toISOString();
      const stmt = db.prepare(`
      UPDATE supply SET
        BaseName = ?,
        ExtractionPerHour = ?,
        Storage = ?,
        Material = ?,
        LastPickup = ?
      WHERE id = ?
    `);
      stmt.run(
        data.BaseName,
        data.ExtractionPerHour,
        data.Storage,
        data.Material,
        date,
        id
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  });

  ipcMain.handle('db.supply.delete', (_ev, id: number) => {
    return db.prepare('DELETE FROM supply WHERE id = ?').run(id).changes;
  });

  ipcMain.handle('db.supply.getMaterials', () => {
    const rows = db.prepare(`
      SELECT DISTINCT Material
      FROM supply
      ORDER BY Material ASC
    `).all();

    return rows;
  });

  ipcMain.handle('db.supply.pickup', (_ev, id: number) => {
    const date = new Date().toISOString();

    const stmt = db.prepare(`
      UPDATE supply SET
        LastPickup = ?
      WHERE id = ?
    `);

    stmt.run(
      date,
      id
    );
    return date;
  });

  ipcMain.handle('db.supply.getBases', () => {
    const rows = db.prepare(`
      SELECT DISTINCT BaseName
      FROM supply
      ORDER BY BaseName ASC
    `).all();

    return rows;
  });
}
