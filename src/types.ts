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

export interface Cocktail {
  id: string;
  name: string;
  description?: string;
  ingredients: Ingredient[]
}
