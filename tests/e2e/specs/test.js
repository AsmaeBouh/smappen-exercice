// https://docs.cypress.io/api/table-of-contents

describe('Test', () => {
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080')
    cy.contains('Filtres').click()

    cy.get('#selectBar').trigger("click");
     cy.wait(150)
    cy.contains('LIVERDUN, MEURTHE-ET-MOSELLE, 54460').click()
    cy.get(".q-slider__focus-ring").click({ multiple: true, force: true });
    cy.get(".q-slider__focus-ring").type(
      "{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}");
    cy.contains('Search').click()
    cy.wait(3000)

    cy.contains('Filtres').click()
    cy.wait(2000)
    cy.contains('Graphs').click()




  })
})
