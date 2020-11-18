describe('example-4', () => {
    beforeEach(() => {
        cy.visit('/example-4');
    });

    it('Double-click should set header text to item name', () => {
        cy.get('[data-cy="box-1-items-list"] > :nth-child(2').dblclick();
        cy.get('[data-cy="box-1-selected-name"]').invoke('text').should('equal', 'Option Two');
    });
});