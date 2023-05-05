// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Item, CategoryItem } = initSchema(schema);

export {
  Category,
  Item,
  CategoryItem
};