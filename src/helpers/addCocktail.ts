import { Initiator, UserAction } from '../consts';
import { db } from '../db';
import { NewCocktailRecord } from '../types';

export default async function addCocktail(cocktail: NewCocktailRecord) {
  return db.transaction('rw', db.cocktails, db.logs, async () => {
    const id = (Date.now()).toString();

    await db.cocktails.add({
      ...cocktail,
      id,
    });

    await db.logs.add({
      timestamp: Date.now(),
      initiator: Initiator.User,
      action: UserAction.AddedCocktail,
      object: id,
    });
  });
}
