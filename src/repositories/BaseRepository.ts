import {
  Collection, DeleteWriteOpResultObject, InsertOneWriteOpResult, UpdateWriteOpResult,
} from 'mongodb';
import { mongoClient } from '../utils/db';
import { IRepository } from '../models';

export default class BaseRepository<T> implements IRepository<T> {
  private readonly collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected getCollection = (): Collection => mongoClient.db().collection(this.collectionName);

  public insertOne = async (payload: Partial<T>): Promise<InsertOneWriteOpResult<any>> => (
    this.getCollection().insertOne(payload)
  );

  public deleteOne = async (deleteQuery): Promise<DeleteWriteOpResultObject> => this.getCollection()
    .deleteOne(deleteQuery);

  public updateOne = async (updateQuery: Partial<T>, updatePayload: Partial<T>)
    : Promise<UpdateWriteOpResult> => (
    this.getCollection().updateOne(updateQuery, updatePayload)
  );

  public findOne = async (selectQuery: Partial<T>): Promise<T | null> => this.getCollection()
    .findOne(selectQuery);

  public findAll = async (findQuery: Partial<T>): Promise<T[]> => this.getCollection()
    .find(findQuery).toArray();
}
