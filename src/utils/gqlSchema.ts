import { buildSchemaSync } from 'type-graphql';
import { Container } from 'typedi';
import { AlertResolver } from '../resolvers';

const schema = buildSchemaSync({
  resolvers: [AlertResolver],
  container: ({ context }) => Container.of(context.requestId),
});

export default schema;
