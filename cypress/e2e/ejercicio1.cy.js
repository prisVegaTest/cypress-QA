describe('Purchase flow on Demoblaze', () => {
    it('should complete a purchase flow successfully', () => {
      cy.visit('https://www.demoblaze.com/');
  
      // Add the first product to the cart
      cy.contains('Samsung galaxy s6').click();
      cy.contains('Add to cart').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Product added');
      });
      cy.go('back');
  
      // Esperar a que el botón de home sea visible
      cy.contains('Home').click();
  
      // Add the second product to the cart
      cy.contains('Nokia lumia 1520').should('be.visible').click();
      cy.contains('Add to cart').click();
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Product added');
      });
      cy.go('back');
  
      // View the cart
      cy.contains('Cart').click();
  
      // Complete the purchase form
      cy.contains('Place Order').click();
      cy.get('#name').type('Priscila Vega');
      cy.get('#country').type('Ecuador');
      cy.get('#city').type('Quito');
      cy.get('#card').type('5556 4433 1111 0012');
      cy.get('#month').type('02');
      cy.get('#year').type('2029');
      cy.contains('Purchase').click();
  
      // Verify the purchase was successful
      cy.contains('Thank you for your purchase!').should('be.visible');
      cy.contains('OK').click();
    });
  });  