import sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

let connection = null;
export const getConnection = async (url?: string)=>{
  if (!connection) {
    const dbUrl = (!url)? url: process.env.DB_URI || 'sample.db';
    connection =  await sqlite.open({
      filename: dbUrl,
      driver: sqlite3.Database
    }
    );
  }
  return connection;
}
