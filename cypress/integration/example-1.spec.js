describe('example-1', () => {
    beforeEach(() => {
        cy.visit('/example-1');
    });

    it('Heading text should contain the correct title', () => {
        cy.get('h1').invoke('text').should('equal', 'My Awesome Web Application');
    });
});