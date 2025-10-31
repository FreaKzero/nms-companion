import Database from 'better-sqlite3';
import { ipcMain } from 'electron';

export interface Discoveries {
  id?: number;
  GalaxyIndex: number;
  GalaxyName: string;
  DiscoveryDate?: string;
  PortalCount?: number;
}

export function registerDiscoveriesIpc (db: Database.Database) {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS discoveries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      GalaxyIndex INTEGER,
      GalaxyName TEXT,
      DiscoveryDate TEXT
    )
  `).run();

  ipcMain.handle('db.discoveries.create', (_ev, data: Discoveries) => {
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO discoveries (GalaxyIndex, GalaxyName, DiscoveryDate)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(data.GalaxyIndex, data.GalaxyName, now);
    return info.lastInsertRowid;
  });

  ipcMain.handle('db.discoveries.getAll', (_ev, search: string = '') => {
    let rows;

    if (search && search.trim() !== '') {
      const sql = `
      SELECT d.*, COUNT(l.id) AS PortalCount
      FROM discoveries d
      LEFT JOIN locations l ON d.GalaxyIndex = l.GalaxyIndex
      WHERE d.GalaxyName LIKE ?
      GROUP BY d.id
      ORDER BY d.GalaxyIndex ASC
    `;
      rows = db.prepare(sql).all(`%${search}%`);
    } else {
      const sql = `
      SELECT d.*, COUNT(l.id) AS PortalCount
      FROM discoveries d
      LEFT JOIN locations l ON d.GalaxyIndex = l.GalaxyIndex
      GROUP BY d.id
      ORDER BY d.GalaxyIndex ASC
    `;
      rows = db.prepare(sql).all();
    }

    return rows;
  });

  ipcMain.handle('db.discoveries.check', (_ev, data: Discoveries) => {
    const existing = db.prepare(`
    SELECT * FROM discoveries WHERE GalaxyIndex = ?
  `).get(data.GalaxyIndex);

    if (existing) {
      return null;
    }

    const now = new Date().toISOString();
    const insert = db.prepare(`
    INSERT INTO discoveries (GalaxyIndex, GalaxyName, DiscoveryDate)
    VALUES (?, ?, ?)
  `);
    const info = insert.run(data.GalaxyIndex, data.GalaxyName, now);

    return db.prepare(`
    SELECT * FROM discoveries WHERE id = ?
  `).get(info.lastInsertRowid);
  });
}
