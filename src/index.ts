import fastify from 'fastify';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { mongoClient, initializeIndexes } from './utils/db';
import { TaskManager, TaskScheduler } from './jobs';
import initializeApolloServer from './utils/initializeApolloServer';

dotenv.config();
const app = fastify();

const server = initializeApolloServer();
const { EMAIL_ADDRESS = '', EMAIL_PASSWORD = '' } = process.env;

(async () => {
  const port = 8080;

  try {
    await mongoClient.connect();
    await initializeIndexes();
    TaskScheduler.start();
    TaskManager.start({
      service: 'gmail',
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });
    app.register(server.createHandler());
    await app.listen(port);
    app.log.info(`Server is listening in port ${port}`);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
})();
