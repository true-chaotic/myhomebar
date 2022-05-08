import { Initiator, UserAction } from '../consts';
import { db } from '../db';
import { COFFEE_LIQUOR, IRISH_CREAM, ORANGE_LIQUOR } from '../presets/types';

export default async function addCocktail(name: string) {
  return db.transaction('rw', db.cocktails, db.logs, async () => {
    const id = (Date.now()).toString();

    await db.cocktails.add({
      name,
      id,
      ingredients: [{
        typeId: COFFEE_LIQUOR,
        amount: 20,
      }, {
        typeId: IRISH_CREAM,
        amount: 20,
      }, {
        typeId: ORANGE_LIQUOR,
        amount: 20,
      }],
    });

    await db.logs.add({
      timestamp: Date.now(),
      initiator: Initiator.User,
      action: UserAction.AddedCocktail,
      object: id,
    });
  });
}
