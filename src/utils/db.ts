import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { CollectionEnum } from '../enums';

dotenv.config();

const { MONGO_URL = '' } = process.env;

export const mongoClient = new MongoClient(MONGO_URL, {
  useNewUrlParser: true, useUnifiedTopology: true,
});

export const initializeIndexes = async () => {
  mongoClient.db().collection(CollectionEnum.Alert)
    .createIndex({ sendTo: 1, passphrase: 1 }, { unique: true });
};
