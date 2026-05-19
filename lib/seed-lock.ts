import "server-only";

import { execute } from "@/lib/db";

export async function ensureSeedLocksTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS app_seed_locks (
      seed_key VARCHAR(64) PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

/** Returns true only for the first caller that acquires this seed key. */
export async function acquireSeedLock(seedKey: string): Promise<boolean> {
  await ensureSeedLocksTable();
  const result = await execute(`INSERT IGNORE INTO app_seed_locks (seed_key) VALUES (?)`, [seedKey]);
  return result.affectedRows === 1;
}

export function parseCount(rows: Array<{ count: number | string }>): number {
  return Number(rows[0]?.count ?? 0);
}
