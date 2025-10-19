import OptionManager from '@/app/lib/OptionManager';

import Database from 'better-sqlite3';
import { app, ipcMain } from 'electron';

export interface ListState {
  id?: number;
  GalaxyName: string;
  PortalCode: string;
  ShareCode: string;
  Description: string;
  Screenshot: string;
  GalaxyIndex: number;
  Tag: string;
  Biome?: string | null;
}

let db: Database.Database;

export function registerDbIpc () {
  const OPTIONS = OptionManager.load();
  db = new Database(OPTIONS.databasePath);

  app.on('before-quit', () => {
    if (db) {
      db.close();
      console.log('SQLite database closed.');
    }
  });

  // db.prepare('DROP TABLE locations').run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      GalaxyName TEXT,
      PortalCode TEXT,
      ShareCode TEXT,
      Description TEXT,
      Screenshot TEXT,
      GalaxyIndex INTEGER,
      Tag TEXT,
      Biome TEXT NULL
    )
  `).run();

  ipcMain.handle('DB-CREATE', (_ev, data: ListState) => {
    const stmt = db.prepare(`
      INSERT INTO locations 
      (GalaxyName, PortalCode, ShareCode, Description, Screenshot, GalaxyIndex, Tag, Biome)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      data.GalaxyName,
      data.PortalCode,
      data.ShareCode,
      data.Description,
      data.Screenshot,
      data.GalaxyIndex,
      data.Tag,
      data.Biome ?? null
    );
    return info.lastInsertRowid;
  });

  ipcMain.handle('DB-READ-ALL', () => {
    return db.prepare('SELECT * FROM locations ORDER BY ID DESC').all();
  });

  ipcMain.handle('DB-GETID', (_ev, id: number) => {
    return db.prepare('SELECT * FROM locations WHERE id = ?').get(id);
  });

  ipcMain.handle('DB-UPDATE', (_ev, id: number, data: ListState) => {
    const stmt = db.prepare(`
      UPDATE locations SET
        GalaxyName = ?,
        PortalCode = ?,
        ShareCode = ?,
        Description = ?,
        Screenshot = ?,
        GalaxyIndex = ?,
        Tag = ?,
        Biome = ?
        WHERE id = ?
    `);
    const info = stmt.run(
      data.GalaxyName,
      data.PortalCode,
      data.ShareCode,
      data.Description,
      data.Screenshot,
      data.GalaxyIndex,
      data.Tag,
      data.Biome.trim().length ? data.Biome.trim() : null,
      id
    );
    return info.changes;
  });

  ipcMain.handle('DB-DELETE', (_ev, id: number) => {
    return db.prepare('DELETE FROM locations WHERE id = ?').run(id).changes;
  });

  ipcMain.handle('DB-GET-PAGE', (_ev, page: number = 1, pageSize: number = 20, search: string = '') => {
    const offset = (page - 1) * pageSize;
    let rows, totalRow;

    if (search && search.trim() !== '') {
      const terms = search.split(/\s+/).filter(Boolean);

      const whereClauses = terms
        .map((_, i) => `(Description LIKE @term${i} OR Tag LIKE @term${i} OR GalaxyName LIKE @term${i} OR Biome LIKE @term${i})`)
        .join(' AND ');

      const params: Record<string, string | number> = { limit: pageSize, offset };
      terms.forEach((t, i) => {
        params[`term${i}`] = `%${t}%`;
      });

      const sql = `
        SELECT * FROM locations
        WHERE ${whereClauses}
        ORDER BY ID DESC
        LIMIT @limit OFFSET @offset
      `;

      const sqlCount = `
        SELECT COUNT(*) as count FROM locations
        WHERE ${whereClauses}
      `;

      rows = db.prepare(sql).all(params);
      totalRow = db.prepare(sqlCount).get(params);
    } else {
      rows = db.prepare(`
        SELECT * FROM locations
        ORDER BY ID DESC
        LIMIT ? OFFSET ?
      `).all(pageSize, offset);

      totalRow = db.prepare('SELECT COUNT(*) as count FROM locations').get();
    }

    // @ts-expect-error lazy
    const total = totalRow.count;
    return { rows, total, page, pageSize };
  });

  ipcMain.handle('DB-SEARCH', (_ev, term: string, page: number = 1, pageSize: number = 20) => {
    const offset = (page - 1) * pageSize;
    const likeTerm = `%${term}%`;

    const rows = db.prepare(`
      SELECT * FROM locations
      WHERE Description LIKE ? OR Tag LIKE ? OR Biome LIKE ? OR GalaxyName LIKE ?
      ORDER BY ID DESC
      LIMIT ? OFFSET ?
    `).all(likeTerm, likeTerm, likeTerm, likeTerm, pageSize, offset);

    const totalRow = db.prepare(`
      SELECT COUNT(*) as count FROM locations
      WHERE Description LIKE ? OR Tag LIKE ? OR Biome LIKE ? OR GalaxyName LIKE ?
    `).get(likeTerm, likeTerm, likeTerm, likeTerm) as { count: number };
    const total = totalRow.count;

    return { rows, total, page, pageSize };
  });

  ipcMain.handle('DB-GALAXIES', () => {
    const rows = db.prepare(`
      SELECT DISTINCT GalaxyName
      FROM locations
      ORDER BY GalaxyName ASC
    `).all();

    return rows;
  });

  ipcMain.handle('DB-TAGS', () => {
    const rows = db.prepare(`
      SELECT DISTINCT Tag
      FROM locations
      ORDER BY Tag ASC
    `).all();

    return rows;
  });

  ipcMain.handle('DB-BIOMES', () => {
    const rows = db.prepare(`
      SELECT DISTINCT Biome
      FROM locations
      WHERE Biome IS NOT NULL
      ORDER BY Biome ASC
    `).all();

    return rows;
  });
}
