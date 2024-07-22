describe('Purchase flow on Demoblaze', () => {
  const addProductToCart = (productName) => {
    cy.contains(productName).click();
    cy.contains('Add to cart').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product added');
    });
    cy.go('back');
    cy.contains('Home').click();
  };

  const fillPurchaseForm = (name, country, city, card, month, year) => {
    cy.get('#name').type(name);
    cy.get('#country').type(country);
    cy.get('#city').type(city);
    cy.get('#card').type(card);
    cy.get('#month').type(month);
    cy.get('#year').type(year);
    cy.contains('Purchase').click();
  };

  it('should complete a purchase flow successfully', () => {
    cy.visit('https://www.demoblaze.com/');

    // Add products to the cart
    addProductToCart('Samsung galaxy s6');
    addProductToCart('Nokia lumia 1520');

    // View the cart
    cy.contains('Cart').click();

    // Complete the purchase form
    cy.contains('Place Order').click();
    fillPurchaseForm('Priscila Vega', 'Ecuador', 'Quito', '5556 4433 1111 0012', '02', '2029');

    // Verify the purchase was successful
    cy.contains('Thank you for your purchase!').should('be.visible');
    cy.contains('OK').click();
  });
});
