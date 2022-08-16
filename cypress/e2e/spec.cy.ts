describe('Application', () => {
  it('starts with Cocktails page', () => {
    cy.visit('http://localhost:1234');
    cy.contains('Cocktails');
    cy.contains('B-52');
  });

  it('adds log to the Logs page', () => {
    cy.contains('Logs').click();
    cy.contains('Application initialized');
  });
});

describe('Add cocktail', () => {
  it('add Lemonade to the page', () => {
    cy.visit('http://localhost:1234');
    cy.contains('Cocktails');
    cy.get('[aria-label="Add cocktail"]').click();
    cy.get('#name').type('Lemonade');
    cy.get('form').submit();
    cy.contains('Lemonade');
  });
});

describe('Add bottle', () => {
  it('add Lemon juice to the page', () => {
    cy.visit('http://localhost:1234');
    cy.contains('Bottles').click();
    cy.get('[aria-label="Add bottle"]').click();
    cy.get('#name').type('Lemon juice');
    cy.get('form').submit();
    cy.contains('Lemon juice');
  });
});
