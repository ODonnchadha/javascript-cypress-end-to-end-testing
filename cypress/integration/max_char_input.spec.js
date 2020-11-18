describe('Textbox with max characters', () => {
    it('Should display the appropriate remaining character count', () => {
        cy.visit('http://localhost:3000/example-2');

        cy.get('span').invoke('text').should('equal', '15');
        cy.get('input').type('abcde');

        cy.get('span').invoke('text').should('equal', '10');
        cy.get('input').type('fghijklmno');

        cy.get('span').invoke('text').should('equal', '0');
    });

    it('Should prevent the user from typing additional characters once the MAX is exceeded', () => {
        cy.visit('http://localhost:3000/example-2');

        cy.get('input').type('abcdefghijklmnopqrstuvwxyz');
        cy.get('input').should('have.attr', 'value', 'abcdefghijklmno');
    });
});