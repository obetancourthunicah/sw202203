import { MongoClient } from 'mongodb';

let connection:MongoClient = null;
let mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
let mongoDBName = process.env.MONGO_DB_NAME || 'sw202203';

export const getConnection = async ()=> {
  if( !connection){
    connection = await MongoClient.connect(mongoURI);
  }
  return connection.db(mongoDBName);
}
