// Implement the following tests in Cypress:

// - [ ] test that you can add text to the box
// - [ ] test that you can select multiple toppings
// - [ ] test that you can submit the form

describe("testing pizza text", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/pizza");
    })
    it ("testing inputs and submit", function() {
        cy
        .get('input[name="name"]')
        .type('Rohith')
        .should('have.value', 'Rohith')
        cy
        .get('input[name="special"')
        .type('leave it on the doorstep')
        .should('have.value', 'leave it on the doorstep')
        cy
        .get('[type=checkbox]')
        .check()
        .should('be.checked')
        cy.get('button[name="order"')
        .click()
    })
})