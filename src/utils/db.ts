import { MongoClient } from 'mongodb';
import get from 'lodash/get';
import redis from 'redis';
import env from './env';
import { CollectionEnum } from '../models';

const url = get(env.parsed, 'DB_URL', '');

export const mongoClient = new MongoClient(url, { useNewUrlParser: true });
export const redisClient = redis.createClient();
export const initializeIndexes = async () => {
  mongoClient.db().collection(CollectionEnum.Alert)
    .createIndex({ sendTo: 1, passphrase: 1 }, { unique: true });
};
