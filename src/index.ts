import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import 'reflect-metadata';
import { Container } from 'typedi';
import gqlSchema from './utils/gqlSchema';
import mountContext from './utils/mountContext';
import { mongoClient, initializeIndexes } from './utils/db';
import { TaskManager, TaskScheduler } from './jobs';

const app = fastify({ logger: true });

const server = new ApolloServer({
  schema: gqlSchema,
  context: mountContext,
  formatResponse: (response: any, { context }: any) => {
    Container.reset(context.requestId);
    return response;
  },
  playground: { version: '1.7.25' },
  introspection: true,
});

const start = async () => {
  try {
    await mongoClient.connect();
    await initializeIndexes();
    TaskScheduler.start();
    TaskManager.start();
    const port = 8080;
    app.register(server.createHandler());
    await app.listen(port);
    app.log.info(`Server is listening in port ${port}`);
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
