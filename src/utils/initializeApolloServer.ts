import { ApolloServer } from 'apollo-server-fastify';
import { Container } from 'typedi';
import gqlSchema from './gqlSchema';
import mountContext from './mountContext';
import ErrorParser from './ErrorParser';

export default (externalRequest?: any) => (
  new ApolloServer({
    schema: gqlSchema,
    context: ({ req }) => {
      if (externalRequest) return mountContext(externalRequest);
      return mountContext(req);
    },
    formatResponse: (response: any, { context }: any) => {
      Container.reset(context.requestId);
      return response;
    },
    playground: { version: '1.7.25' },
    introspection: true,
    formatError: ErrorParser,
  })
);
