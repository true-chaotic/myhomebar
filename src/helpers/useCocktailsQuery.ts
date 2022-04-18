import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { db } from '../db';
import { Cocktail } from '../types';

export default function useCocktailsQuery(): Cocktail[] {
  const queryResult = useLiveQuery(
    async () => {
      const bottleTypes = await db.types.toArray();
      const bottleTypesMap: Record<string, string> = {};

      bottleTypes.forEach(({ id, name }) => {
        bottleTypesMap[id] = name;
      });

      const cocktailsRecords = await db.cocktails.toArray();

      return cocktailsRecords.map(({
        id, name, description, ingredients,
      }) => ({
        id,
        name,
        description,
        ingredients: ingredients.map(({ amount, typeId }) => ({
          amount,
          type: bottleTypesMap[typeId] || `unknown type ${typeId}`,
        })),
      }));
    },
  );

  // Dexie's useLiveQuery type is wrong, it should include undefined
  return useMemo(() => queryResult || [], [queryResult]);
}
