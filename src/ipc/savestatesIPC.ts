import { createWriteStream, createReadStream, promises as fs, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { createGzip, createGunzip } from 'zlib';

import { OptionManagerType } from '@/app/lib/OptionManager';

import { ipcMain } from 'electron';
import tar from 'tar';

async function packDirectory (srcDir: string, outFile: string) {
  await pipeline(
    tar.c({ cwd: srcDir, prefix: '', gzip: false }, ['.']),
    createGzip(),
    createWriteStream(outFile)
  );
}

async function unpackDirectory (tarGzFile: string, destDir: string) {
  await pipeline(
    createReadStream(tarGzFile),
    createGunzip(),
    tar.x({ cwd: destDir })
  );
}

function formatSize (bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function listArchives (dir: string) {
  const files = await fs.readdir(dir);

  return (
    await Promise.all(files
      .filter((f) => f.endsWith('.tar.gz'))
      .map(async (filename) => {
        const full = path.join(dir, filename);
        const stat = await fs.stat(full);

        const match = filename.match(/(\d{13})/);
        const ts = match ? Number(match[1]) : null;

        return {
          filename,
          created: ts ? new Date(ts).toISOString() : null,
          size: formatSize(stat.size)
        };
      }))
  ).sort((a, b) => {
    const ta = a.created ? new Date(a.created).getTime() : 0;
    const tb = b.created ? new Date(b.created).getTime() : 0;
    return tb - ta;
  });
}

export function registerSavestatesIPC (opt: OptionManagerType) {
  const BASE_DIR = path.resolve(opt.savestateDir);

  if (!existsSync(BASE_DIR)) {
    mkdirSync(BASE_DIR, { recursive: true });
  }

  ipcMain.handle('SAVESTATES_ZIP', async () => {
    const packDir = path.join(path.dirname(opt.savePath));
    try {
      const timestamp = Date.now();
      const filename = `savestate-${timestamp}.tar.gz`;
      const outPath = path.join(BASE_DIR, filename);

      await packDirectory(packDir, outPath);

      return { success: true, file: filename, timestamp };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('SAVESTATES_UNZIP', async (_ev, archiveFilename: string) => {
    const saveDirectory = path.join(path.dirname(opt.savePath));

    await fs.rm(saveDirectory, { recursive: true, force: true });
    await fs.mkdir(saveDirectory);
    try {
      const archivePath = path.join(BASE_DIR, archiveFilename);
      await unpackDirectory(archivePath, saveDirectory);

      return { success: true };
    } catch (err: any) {
      console.log(err);
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('SAVESTATES_LIST', async () => {
    try {
      const list = await listArchives(BASE_DIR);
      return { success: true, list };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('SAVESTATES_DELETE', async (_ev, archiveFilename: string) => {
    try {
      await fs.rm(path.join(BASE_DIR, archiveFilename));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  });

  ipcMain.handle('SAVESTATES_TEST', async () => {
    console.log(path.basename(path.join(path.dirname(opt.savePath))));
  });
}
