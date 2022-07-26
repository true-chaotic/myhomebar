describe('Application', () => {
  it('starts with Cocktails page', () => {
    cy.visit('http://localhost:1234')
    cy.contains('Cocktails') 
    cy.contains('B-52')
  })

  it('adds log to the Logs page', () => {
    cy.contains('Logs').click()
    cy.contains('Application initialized')
  })
})