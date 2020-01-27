import { DeleteWriteOpResultObject, InsertOneWriteOpResult, UpdateWriteOpResult } from 'mongodb';
import { IPage } from './Page';

export default interface IRepository<T> {
  insertOne: (payload: Partial<T>) => Promise<InsertOneWriteOpResult<any>>
  deleteOne: (deleteQuery: Partial<T>) => Promise<DeleteWriteOpResultObject>
  updateOne: (updateQuery: Partial<T>, updatePayload: Partial<T>) => Promise<UpdateWriteOpResult>
  findOne: (selectQuery: Partial<T>) => Promise<T | null>
  findAll: (selectQuery: Partial<T>) => Promise<T[]>
  findPage: (selectQuery: any, page: number, size: number) =>(
    Promise<IPage<T> | object | null>
  );
}
