import Dexie, { Table } from 'dexie';
import COCKTAILS from './presets/cocktails';
import TYPES from './presets/types';
import { BottleRecord, CocktailRecord, Type } from './types';

export class Bar extends Dexie {
  bottles!: Table<BottleRecord>;

  types!: Table<Type>;

  cocktails!: Table<CocktailRecord>;

  constructor() {
    super('bar');

    this.version(1).stores({
      bottles: 'id, name, typeId',
      types: 'id, name',
      cocktails: 'id, name',
    });

    this.on('populate', () => {
      this.types.bulkAdd(TYPES);
      this.cocktails.bulkAdd(COCKTAILS);
    });
  }
}

export const db = new Bar();
