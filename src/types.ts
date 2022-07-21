import { Initiator, AppAction, UserAction } from './consts';

export interface Type {
  id: string;
  name: string;
}

export interface BottleRecord {
  id: string;
  name: string;
  typeId: Type['id'];
  volume: {
    total: number;
    left: number;
  };
}

export type NewBottleRecord = Omit<BottleRecord, 'id'>;

interface BaseLogEntry {
  id?: number,
  timestamp: number,
}

interface AppLogEntry extends BaseLogEntry {
  initiator: Initiator.Application,
}

interface UserLogEntry extends BaseLogEntry {
  initiator: Initiator.User,
}

export interface AppInitLogEntry extends AppLogEntry {
  action: AppAction.Initialized,
}

export interface UserBottleLogEntry extends UserLogEntry {
  action: UserAction.AddedBottle | UserAction.RemovedBottle,
  object: BottleRecord['id']
}

export interface Bottle extends BottleRecord {
  type: Type['name'];
}

export interface IngredientRecord {
  typeId: Type['id'],
  amount: number,
}

export interface Ingredient {
  type: Type['name'],
  amount: number;
}

type NonEmptyArray<T> = [T, ...T[]];

export interface CocktailRecord {
  id: string;
  name: string;
  description?: string;
  ingredients: NonEmptyArray<IngredientRecord>
}

export type NewCocktailRecord = Omit<CocktailRecord, 'id'>;

export interface Cocktail {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[]
}

export interface UserCocktailLogEntry extends UserLogEntry {
  action: UserAction.AddedCocktail | UserAction.RemovedCocktail,
  object: CocktailRecord['id']
}

export type LogEntry = AppInitLogEntry | UserBottleLogEntry | UserCocktailLogEntry;
