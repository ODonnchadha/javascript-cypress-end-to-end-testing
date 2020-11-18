describe('example-3', () => {
    beforeEach(() => {
        cy.visit('/example-3');
        cy.get('[data-cy="last-name-chars-left-count"]').as('charsLeftSpan');
        cy.get('[data-cy="input-last-name"]').as('charInput');
    });

    it('Input should display the appropriate remaining character count via Cypress.io attributes', () => {
        cy.get('@charsLeftSpan').invoke('text').should('equal', '15');
        cy.get('@charInput').type('abcde');

        cy.get('@charsLeftSpan').invoke('text').should('equal', '10');
        cy.get('@charInput').type('fghijklmno');

        cy.get('@charsLeftSpan').invoke('text').should('equal', '0');
    });

    it('Input shoud return remaining text of a given length', () => {
        // $charsLeftSpan: This is the DOM element that Cypress returned to us.
        // Note: This is not a promise.
        cy.get('@charsLeftSpan').then($charsLeftSpan => {
            expect($charsLeftSpan.text()).to.equal('15');
        });
    });
});