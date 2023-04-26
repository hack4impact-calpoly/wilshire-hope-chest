import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly Items?: (CategoryItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly Items: AsyncCollection<CategoryItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly dateAdded?: string | null;
  readonly value?: number | null;
  readonly image?: string | null;
  readonly categorys?: (CategoryItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly dateAdded?: string | null;
  readonly value?: number | null;
  readonly image?: string | null;
  readonly categorys: AsyncCollection<CategoryItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerExample = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Example, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExample = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Example, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Example = LazyLoading extends LazyLoadingDisabled ? EagerExample : LazyExample

export declare const Example: (new (init: ModelInit<Example>) => Example) & {
  copyOf(source: Example, mutator: (draft: MutableModel<Example>) => MutableModel<Example> | void): Example;
}

type EagerCategoryItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoryItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly categoryId?: string | null;
  readonly itemId?: string | null;
  readonly category: Category;
  readonly item: Item;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoryItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoryItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly categoryId?: string | null;
  readonly itemId?: string | null;
  readonly category: AsyncItem<Category>;
  readonly item: AsyncItem<Item>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CategoryItem = LazyLoading extends LazyLoadingDisabled ? EagerCategoryItem : LazyCategoryItem

export declare const CategoryItem: (new (init: ModelInit<CategoryItem>) => CategoryItem) & {
  copyOf(source: CategoryItem, mutator: (draft: MutableModel<CategoryItem>) => MutableModel<CategoryItem> | void): CategoryItem;
}