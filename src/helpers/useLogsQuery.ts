import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { db } from '../db';
import { LogEntry } from '../types';

export default function useLogsQuery(): LogEntry[] {
  const queryResult = useLiveQuery(
    async () => db.logs.toArray(),
  );

  // Dexie's useLiveQuery type is wrong, it should include undefined
  return useMemo(() => queryResult || [], [queryResult]);
}
