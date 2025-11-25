import Database from 'better-sqlite3';
import { ipcMain } from 'electron';

export interface FlightLog {
  id?: string;
  Summary: string;
  GalaxyIndex: number;
  PortalCode: string;
  Created?: string;
  GalaxyName: string | null;
}

export function registerFlightLogIpc (db: Database.Database) {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS flightlog (
      ID TEXT PRIMARY KEY,
      Summary TEXT,
      GalaxyIndex INTEGER,
      PortalCode TEXT,
      Created TEXT
    )
  `).run();

  ipcMain.handle('db.flightlog.add', (_ev, data: FlightLog) => {
    const now = new Date().toISOString();
    const id = `${data.GalaxyIndex}:${data.PortalCode}`;

    const stmt = db.prepare(`
    INSERT INTO flightlog (ID, Summary, GalaxyIndex, PortalCode, Created)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(ID)
    DO UPDATE SET Created = excluded.Created
  `);

    const result = stmt.run(id, data.Summary, data.GalaxyIndex, data.PortalCode, now);

    const inserted = result.changes === 1 && result.lastInsertRowid !== undefined;

    return {
      id,
      inserted,
      updated: !inserted
    };
  });

  ipcMain.handle('db.flightlog.truncate', () => {
    db.prepare('DELETE FROM flightlog').run();
    db.prepare('DELETE FROM sqlite_sequence WHERE name = \'flightlog\'').run();
    return true;
  });

  ipcMain.handle('db.flightlog.getAll', () => {
    const sql = `
    SELECT 
      f.ID,
      f.Summary,
      f.GalaxyIndex,
      f.PortalCode,
      f.Created,
      d.GalaxyName
    FROM flightlog f
    LEFT JOIN discoveries d
      ON f.GalaxyIndex = d.GalaxyIndex
    ORDER BY f.Created DESC LIMIT 300
  `;
    return db.prepare(sql).all();
  });
}
