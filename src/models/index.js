// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Category, Item, Example, CategoryItem } = initSchema(schema);

export {
  Category,
  Item,
  Example,
  CategoryItem
};