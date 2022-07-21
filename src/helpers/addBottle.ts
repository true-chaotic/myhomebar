import { Initiator, UserAction } from '../consts';
import { db } from '../db';
import { NewBottleRecord } from '../types';

export default async function addBottle(bottle: NewBottleRecord) {
  return db.transaction('rw', db.bottles, db.logs, async () => {
    const id = (Date.now()).toString();

    await db.bottles.add({
      ...bottle,
      id,
    });

    await db.logs.add({
      timestamp: Date.now(),
      initiator: Initiator.User,
      action: UserAction.AddedBottle,
      object: id,
    });
  });
}
