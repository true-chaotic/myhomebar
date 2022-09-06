import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { UserAction } from '../consts';
import { db } from '../db';
import {
  LogEntry,
  UserBottleLogEntryPopulated,
  UserCocktailLogEntryPopulated,
} from '../types';
import getMapById from './getMapById';

const getLogsIds = (logs: LogEntry[]) => {
  const bottleLogsIds = new Set<string>();
  const cocktailsLogsIds = new Set<string>();

  logs.forEach((entry) => {
    switch (entry.action) {
      case UserAction.AddedBottle:
      case UserAction.RemovedBottle: {
        bottleLogsIds.add(entry.object);
        break;
      }
      case UserAction.AddedCocktail:
      case UserAction.RemovedCocktail: {
        cocktailsLogsIds.add(entry.object);
        break;
      }
      default:
    }
  });

  return { bottleLogsIds, cocktailsLogsIds };
};

export default function useLogsQuery(): LogEntry[] {
  const queryResult = useLiveQuery(
    async () => {
      const logs = await db.logs.toArray();

      const { bottleLogsIds, cocktailsLogsIds } = getLogsIds(logs);

      const bottles = await db.bottles
        .where('id').anyOf(Array.from(bottleLogsIds))
        .toArray();

      const bottlesMap = getMapById(bottles);

      const cocktails = await db.cocktails
        .where('id').anyOf(Array.from(cocktailsLogsIds))
        .toArray();

      const cocktailsMap = getMapById(cocktails);

      return logs.map<LogEntry>((entry) => {
        switch (entry.action) {
          case UserAction.AddedBottle:
          case UserAction.RemovedBottle: {
            const bottle = bottlesMap.get(entry.object);

            if (!bottle) {
              return entry;
            }

            const populatedEntry: UserBottleLogEntryPopulated = {
              ...entry,
              bottle,
            };

            return populatedEntry;
          }
          case UserAction.AddedCocktail:
          case UserAction.RemovedCocktail: {
            const cocktail = cocktailsMap.get(entry.object);

            if (!cocktail) {
              return entry;
            }

            const populatedEntry: UserCocktailLogEntryPopulated = {
              ...entry,
              cocktail,
            };

            return populatedEntry;
          }
          default:
            return entry;
        }
      });
    },
  );

  return useMemo(() => queryResult || [], [queryResult]);
}
