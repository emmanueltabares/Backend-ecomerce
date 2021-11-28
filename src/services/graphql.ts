import { SchemaComposer } from 'graphql-compose';
import { ProductQuery, ProductMutation } from '../controller/productsGraphQl';

const schemaComposer = new SchemaComposer();

schemaComposer.Query.addFields({
    ...ProductQuery,
});

schemaComposer.Mutation.addFields({
    ...ProductMutation,
});

export const graphQLSchema = schemaComposer.buildSchema();
