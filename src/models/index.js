// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Item, Example } = initSchema(schema);

export {
  Category,
  Item,
  Example
};