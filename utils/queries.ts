import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const db: DB.connect = {
  user: process.env.PGUSER || 'localhost',
  host: process.env.PGHOST || 'postgres',
  database: process.env.PGDATABASE || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  port: Number(process.env.PGPORT) || 5432,
};

export const connectPGDB = async () => {
  const pool = new Pool(db);
  const client = await pool.connect();
  if (client) {
    return client;
  } else {
    throw new Error('Could not connect to DB');
  }
};
