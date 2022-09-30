import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

let connection = null;
export const getConnection = async (url?: string)=>{
  console.log(open);
  if (!connection) {
    const dbUrl = (url)? url: (process.env.DB_URI || 'sample.db');
    connection =  await open({
      filename: dbUrl,
      driver: sqlite3.Database
    }
    );
  }
  return connection;
}
