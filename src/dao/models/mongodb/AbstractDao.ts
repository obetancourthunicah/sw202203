import { IDaoObject } from '@server/dao/daoBase';
import {
  ObjectId,
  Db,
  Collection,
  WithId,
  Filter,
  Document,
  InsertOneResult,
  OptionalUnlessRequiredId,
  UpdateFilter,
  UpdateResult,
  DeleteResult,
  FindOptions,
  AggregateOptions,
} from 'mongodb';

export abstract class AbstractDao<T> implements IDaoObject {
  public persistanceName: string;
  private connection: Db;
  private collection: Collection<T>;
  constructor(persistanceName: string, connection?: Db) {
    this.persistanceName = persistanceName;
    if (connection) {
      this.connection = connection;
      this.collection = this.connection.collection(persistanceName);
    } else {
      throw new Error("No DB Connection");
    }
  }

  public async findAll(): Promise<WithId<T>[]> {
    return await this.collection.find({}).toArray();
  }
  public async findByID(identifier: string): Promise<WithId<T>> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return await this.collection.findOne({ _id });
  }
  public async createOne(
    data: OptionalUnlessRequiredId<T>,
  ): Promise<InsertOneResult<T>> {
    return await this.collection.insertOne(data);
  }
  public async update(
    identifier: string,
    data: Partial<T>,
  ): Promise<UpdateResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.updateOne({ _id }, {
      $set: data,
    } as UpdateFilter<T>);
  }
  public async updateRaw(
    identifier: string,
    data: UpdateFilter<T>,
  ): Promise<UpdateResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.updateOne({ _id }, data);
  }

  public async delete(identifier: string): Promise<DeleteResult> {
    const _id = new ObjectId(identifier) as Filter<T>;
    return this.collection.deleteOne({ _id });
  }
  public findByFilter(
    filter: Filter<T>,
    options: FindOptions<T> = {},
  ): Promise<WithId<T>[]> {
    return this.collection.find(filter, options).toArray();
  }
  public aggregate(
    stages: Document[],
    options: AggregateOptions,
  ): Promise<Document[]> {
    return this.collection.aggregate(stages, options).toArray();
  }
  public getCollection(): Collection<T> {
    return this.collection;
  }
}
