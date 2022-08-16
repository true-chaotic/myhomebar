export enum TabName {
  Cocktails = 'Cocktails',
  Bottles = 'Bottles',
  Logs = 'Log',
}

export enum Initiator {
  Application = 'APP',
  User = 'USER',
}

export enum AppAction {
  Initialized = 'INIT',
}

export enum UserAction {
  AddedBottle = 'ADD_BOTTLE',
  RemovedBottle = 'REMOVE_BOTTLE',
  AddedCocktail = 'ADD_COCKTAIL',
  RemovedCocktail = 'REMOVE_COCKTAIL',
}
