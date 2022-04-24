import Dexie, { Table } from 'dexie';
import COCKTAILS from './presets/cocktails';
import TYPES from './presets/types';
import { AppAction, Initiator } from './consts';
import {
  BottleRecord, CocktailRecord, LogEntry, Type,
} from './types';

export class Bar extends Dexie {
  bottles!: Table<BottleRecord>;

  types!: Table<Type>;

  cocktails!: Table<CocktailRecord>;

  logs!: Table<LogEntry>;

  constructor() {
    super('bar');

    this.version(1).stores({
      bottles: 'id, name, typeId',
      types: 'id, name',
      cocktails: 'id, name',
      logs: '++id',
    });

    this.on('populate', () => {
      this.types.bulkAdd(TYPES);
      this.cocktails.bulkAdd(COCKTAILS);
      this.logs.bulkAdd([{
        timestamp: Date.now(),
        initiator: Initiator.Application,
        action: AppAction.Initialized,
      }]);
    });
  }
}

export const db = new Bar();
