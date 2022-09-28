import { IDaoObject } from "@server/dao/daoBase";
import sqlite from 'sqlite';

export abstract class AbstractDao<T> implements IDaoObject {
  public persistanceName: string;
  private connection: sqlite.Database;

  constructor(persistanceName: string, connection?: sqlite.Database){
    this.persistanceName = persistanceName;
    if (connection) {
      this.connection = connection;
    }
  }

  public findAll() : Promise<T[]>{
    throw new Error("Not Implemented");
  }
  public findByID(): Promise<T>{
    throw new Error("Not Implemented");
  }
  private getColValParmArr ( data: Partial<T>): {columns:string[], values:unknown[], params:string[]} {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const params = columns.map(()=>'?');
    return {columns, values, params};
  }
  public async createOne( data: T): Promise<T>{
    // const sqlStr = "INSERT INTO (...columns) values (...valores)";
    const {columns, values, params} = this.getColValParmArr(data);
    const sqlInsert = `INSERT INTO ${this.persistanceName} (${columns.join(', ')}) VALUES (${params.join(', ')});`;
    await this.connection.exec(sqlInsert, values);
    return data;
  }
  public async update(identifier: Partial<T>, data: Partial<T>):Promise<boolean> {
    // UPDATE TABLE_NAME SET ...COLUMNS=?, WHERE ..IDENTIFIERS=?;
    const {columns, values, params:_params} = this.getColValParmArr(data);
    const {columns:columnsId, values:valuesId, params:_paramsId} = this.getColValParmArr(identifier);
    const finalValues = [...values, ...valuesId];
    const sqlUpdate = `UPDATE ${this.persistanceName} SET ${columns.map((o)=>`${o}=?`).join(' ')} WHERE ${columnsId.map((o)=>`${o}=?`).join(' ')};`;
    await this.connection.exec(sqlUpdate, finalValues);
    return true;
  }
  public delete(){
    throw new Error("Not Implemented");
  }
  public findByFilter(){
    throw new Error("Not Implemented");
  }
  public aggregate(){
    throw new Error("Not Implemented");
  }
}
