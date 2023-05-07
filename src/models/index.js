// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Item, ItemCategory } = initSchema(schema);

export {
  Category,
  Item,
  ItemCategory
};