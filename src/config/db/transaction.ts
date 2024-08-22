import mysql from 'mysql2/promise';
import pool from './database';

type Queries = (connection: mysql.PoolConnection) => Promise<void>;

const transaction = async (queries: Queries) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await queries(conn);

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

export { transaction };
