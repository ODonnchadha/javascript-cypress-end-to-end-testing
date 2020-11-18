describe('example-2', () => {
    beforeEach(() => {
        cy.visit('/example-2');
    });

    it('Input should display the appropriate remaining character count', () => {
        cy.get('span').invoke('text').should('equal', '15');
        cy.get('input').type('abcde');

        cy.get('span').invoke('text').should('equal', '10');
        cy.get('input').type('fghijklmno');

        cy.get('span').invoke('text').should('equal', '0');
    });

    it('Input should prevent the user from typing additional characters once the MAX is exceeded', () => {
        cy.get('input').type('abcdefghijklmnopqrstuvwxyz');
        cy.get('input').should('have.attr', 'value', 'abcdefghijklmno');
    });
});