import { Collection, DeleteWriteOpResultObject, InsertOneWriteOpResult, UpdateWriteOpResult } from 'mongodb';

export enum CollectionEnum {
  Alert = 'Alert'
}

export interface IRepository<T> {
  insertOne: (payload: Partial<T>) => Promise<InsertOneWriteOpResult<any>>
  deleteOne: (deleteQuery: Partial<T>) => Promise<DeleteWriteOpResultObject>
  updateOne: (updateQuery: Partial<T>, updatePayload: Partial<T>) => Promise<UpdateWriteOpResult>
  findOne: (selectQuery: Partial<T>) => Promise<T | null>
  findAll: (selectQuery: Partial<T>) => Promise<T[]>
}