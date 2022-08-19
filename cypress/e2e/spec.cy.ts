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
  cy.visit('/');

  cy.contains('Cocktails')
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');

  cy.get('[aria-label="Add cocktail"]').click();
  cy.get('#name').type('Lemonade');
  cy.get('form').submit();
  cy.contains('Lemonade');
});

it('add Lemon juice to the page', () => {
  const bottleName = 'Lemon juice';

  cy.visit('/');

  cy.contains('Bottles').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');

  cy.get('[aria-label="Add bottle"]').click();

  cy.contains('Add new bottle');
  cy.contains('Bottle name');
  cy.contains('Type');
  cy.contains('Total volume');
  cy.contains('Current volume');

  cy.get('#name').type(bottleName);
  cy.get('form').submit();

  cy.contains('Add new bottle').should('not.exist');
  cy.contains(bottleName);

  cy.contains('Logs').click()
    .invoke('attr', 'aria-selected')
    .should('eq', 'true');
  cy.contains('User added a bottle');

  cy.visit('/');

  cy.contains('Bottles').click();
  cy.contains(bottleName);
});
