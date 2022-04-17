import { Type, Bottle } from './db';

export interface BottleDisplay extends Bottle {
  type: Type['name'];
}
