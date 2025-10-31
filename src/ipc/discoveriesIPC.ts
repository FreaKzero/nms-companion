import Database from 'better-sqlite3';
import { ipcMain } from 'electron';

export interface Discoveries {
  id?: number;
  GalaxyIndex: number;
  GalaxyName: string;
  DiscoveryDate: string;
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
      ORDER BY d.id DESC
    `;
      rows = db.prepare(sql).all(`%${search}%`);
    } else {
      const sql = `
      SELECT d.*, COUNT(l.id) AS PortalCount
      FROM discoveries d
      LEFT JOIN locations l ON d.GalaxyIndex = l.GalaxyIndex
      GROUP BY d.id
      ORDER BY d.id DESC
    `;
      rows = db.prepare(sql).all();
    }

    return rows;
  });

  ipcMain.handle('db.discoveries.getId', (_ev, id: number) => {
    const sql = `
      SELECT d.*, COUNT(l.id) AS PortalCount
      FROM discoveries d
      LEFT JOIN locations l ON d.GalaxyIndex = l.GalaxyIndex
      WHERE d.id = ?
      GROUP BY d.id
    `;
    return db.prepare(sql).get(id);
  });

  ipcMain.handle('db.discoveries.update', (_ev, id: number, data: Discoveries) => {
    const stmt = db.prepare(`
      UPDATE discoveries SET
        GalaxyIndex = ?,
        GalaxyName = ?,
        DiscoveryDate = ?
      WHERE id = ?
    `);
    const info = stmt.run(
      data.GalaxyIndex,
      data.GalaxyName,
      data.DiscoveryDate || new Date().toISOString(),
      id
    );
    return info.changes;
  });

  ipcMain.handle('db.discoveries.delete', (_ev, id: number) => {
    return db.prepare('DELETE FROM discoveries WHERE id = ?').run(id).changes;
  });
}
