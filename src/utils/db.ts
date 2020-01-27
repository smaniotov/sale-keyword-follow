import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { CollectionEnum } from '../enums';

dotenv.config();

const { MONGO_URL = '', TEST = '' } = process.env;

const url = `${MONGO_URL}/${TEST ? 'test' : 'alert'}`;

export const mongoClient = new MongoClient(url, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

export const initializeIndexes = async () => {
  mongoClient.db().collection(CollectionEnum.Alert)
    .createIndex({ sendTo: 1, keyword: 1 }, { unique: true });
};
