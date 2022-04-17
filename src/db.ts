import Dexie, { Table } from 'dexie';

export interface Type {
  id: string;
  name: string;
}

export interface Bottle {
  id: string;
  name: string;
  typeId: Type['id'];
  volume: {
    total: number;
    left: number;
  };
}

export interface Ingredient {
  typeId: Type['id'],
  amount: number,
}

type NonEmptyArray<T> = [T, ...T[]];

export interface Cocktail {
  id: string;
  name: string;
  description?: string;
  ingredients: NonEmptyArray<Ingredient>
}

export class Bar extends Dexie {
  bottles!: Table<Bottle>;

  types!: Table<Type>;

  cocktails!: Table<Cocktail>;

  constructor() {
    super('bar');

    this.version(1).stores({
      bottles: 'id, name, typeId',
      types: 'id, name',
      cocktails: 'id, name',
    });

    this.on('populate', () => {
      this.types.bulkAdd([{
        id: 'orange-liquor',
        name: 'Orange liquor',
      }, {
        id: 'coffee-liquor',
        name: 'Coffee liquor',
      }, {
        id: 'irish-cream',
        name: 'Irish cream',
      }]);

      this.bottles.bulkAdd([{
        id: '1',
        name: 'Cointreau',
        typeId: 'orange-liquor',
        volume: {
          total: 700,
          left: 350,
        },
      }, {
        id: '2',
        name: 'Kahlua',
        typeId: 'coffee-liquor',
        volume: {
          total: 700,
          left: 500,
        },
      }, {
        id: '3',
        name: 'Feeney\'s',
        typeId: 'irish-cream',
        volume: {
          total: 1000,
          left: 600,
        },
      }]);

      this.cocktails.bulkAdd([{
        id: 'b-52',
        name: 'B-52',
        description: 'Can be set aflame',
        ingredients: [{
          typeId: 'coffee-liquor',
          amount: 30,
        }, {
          typeId: 'irish-cream',
          amount: 30,
        }, {
          typeId: 'orange-liquor',
          amount: 30,
        }],
      }]);
    });
  }
}

export const db = new Bar();
