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
  cy.contains('Cocktails');
  cy.get('[aria-label="Add cocktail"]').click();
  cy.get('#name').type('Lemonade');
  cy.get('form').submit();
  cy.contains('Lemonade');
});

it('add Lemon juice to the page', () => {
  cy.visit('/');
  cy.contains('Bottles').click();
  cy.get('[aria-label="Add bottle"]').click();
  cy.get('#name').type('Lemon juice');
  cy.get('form').submit();
  cy.contains('Lemon juice');
});
