import { CocktailRecord } from '../types';

import {
  IRISH_CREAM,
  COFFEE_LIQUOR,
  ORANGE_LIQUOR,
} from './types';

const COCKTAILS: CocktailRecord[] = [{
  id: 'b-52',
  name: 'B-52',
  description: 'Can be set aflame',
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
}];

export default COCKTAILS;
