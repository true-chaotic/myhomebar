import Dexie from 'dexie';

beforeEach(() => { Dexie.delete('bar'); });

it('starts with Cocktails page', () => {
  cy.visit('/');
  cy.contains('Cocktails');
  cy.contains('B-52');
  cy.contains('Logs').click();
  cy.contains('Application initialized');
});

it('add Lemonade to the page', () => {
  const cocktailName = 'Lemonade';

  cy.visit('/');
  cy.contains('Cocktails')
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');

  cy.get('[data-cy="add-cocktail-button"]').click();
  cy.get('[data-cy="cocktail-name"]').type(cocktailName);
  cy.get('form').submit();
  cy.contains(cocktailName);
  cy.contains('Logs').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.contains(`User added a cocktail named ${cocktailName}`);
});

it('add Lemon juice to the page', () => {
  const bottleName = 'Lemon juice';

  cy.visit('/');
  cy.contains('Bottles').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');

  cy.get('[data-cy="add-bottle-button"]').click();
  cy.contains('Add new bottle');
  cy.contains('Bottle name');
  cy.contains('Type');
  cy.contains('Total volume');
  cy.contains('Current volume');

  cy.get('[data-cy="bottle-name"]').type(bottleName);
  cy.get('form').submit();

  cy.contains('Add new bottle').should('not.exist');
  cy.contains(bottleName);

  cy.contains('Logs').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.contains(`User added a bottle named ${bottleName}`);
});

it('changing the volume of the bottle', () => {
  cy.visit('/');

  cy.contains('Bottles').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');

  cy.get('[data-cy="add-bottle-button"]').click();

  cy.get('[data-cy="total-volume"]').as('total');
  cy.get('[data-cy="current-volume"]').as('current');

  // value synchronization
  cy.get('@total').select('1000').should('have.value', '1000');
  cy.get('@current').should('have.value', '1000');

  cy.get('@total').select('750').should('have.value', '750');
  cy.get('@current').should('have.value', '750');

  cy.get('@total').select('500').should('have.value', '500');
  cy.get('@current').should('have.value', '500');

  cy.get('@total').select('750').should('have.value', '750');
  cy.get('@current').should('have.value', '750');

  cy.get('@total').select('1000').should('have.value', '1000');
  cy.get('@current').should('have.value', '1000');

  // value asynchronization
  cy.get('@total').select('500').should('have.value', '500');
  cy.get('@current').should('have.value', '500');

  cy.get('@current').type('{backspace}{backspace}{backspace}');
  cy.get('@current').should('have.value', '0');
  cy.get('@current').type('400');
  cy.get('@current').should('have.value', '400');

  cy.get('@total').select('750').should('have.value', '750');
  cy.get('@current').should('have.value', '400');
  cy.get('@current').type('4000');
  cy.get('@current').should('have.value', '750');
});

it('close the form', () => {
  cy.visit('/');
  cy.contains('Cocktails')
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.get('[data-cy="add-cocktail-button"]').click();
  cy.get('[data-cy="cocktail-name"]').type('Lemonade');
  cy.get('[data-cy="cancel-button-cocktail"]').click();
  cy.get('[data-cy="add-cocktail-button"]').click();
  cy.get('[data-cy="cocktail-name"]').should('have.value', 'Lemonade');

  cy.visit('/');
  cy.contains('Bottles').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.get('[data-cy="add-bottle-button"]').click();
  cy.contains('Add new bottle');
  cy.contains('Bottle name');
  cy.contains('Type');
  cy.contains('Total volume');
  cy.contains('Current volume');
  cy.get('[data-cy="bottle-name"]').type('Lemon juice');
  cy.get('[data-cy="total-volume"]').select('500').should('have.value', '500');
  cy.get('[data-cy="current-volume"]').should('have.value', '500');
  cy.get('[data-cy="cancel-button-bottle"]').click();
  cy.get('[data-cy="add-bottle-button"]').click();
  cy.get('[data-cy="bottle-name"]').should('have.value', 'Lemon juice');
  cy.get('[data-cy="total-volume"]').should('have.value', '500');
  cy.get('[data-cy="current-volume"]').should('have.value', '500');

  // form submission
  cy.visit('/');
  cy.contains('Cocktails')
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.get('[data-cy="add-cocktail-button"]').click();
  cy.get('[data-cy="cocktail-name"]').type('Lemonade');
  cy.get('form').submit();
  cy.contains('Lemonade');
  cy.get('[data-cy="add-cocktail-button"]').click();
  cy.get('[data-cy="cocktail-name"]').should('have.value', '');

  cy.visit('/');
  cy.contains('Bottles').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.get('[data-cy="add-bottle-button"]').click();
  cy.contains('Add new bottle');
  cy.contains('Bottle name');
  cy.contains('Type');
  cy.contains('Total volume');
  cy.contains('Current volume');
  cy.get('[data-cy="bottle-name"]').type('Lemon juice');
  cy.get('[data-cy="total-volume"]').select('500').should('have.value', '500');
  cy.get('[data-cy="current-volume"]').should('have.value', '500');
  cy.get('form').submit();
  cy.get('[data-cy="add-bottle-button"]').click();
  cy.get('[data-cy="bottle-name"]').should('have.value', '');
  cy.get('[data-cy="total-volume"]').should('have.value', '750');
  cy.get('[data-cy="current-volume"]').should('have.value', '750');
});
