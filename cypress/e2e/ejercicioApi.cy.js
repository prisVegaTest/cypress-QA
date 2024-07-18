describe('Pruebas End-to-End para Demoblaze', () => {
    const baseUrl = 'https://www.demoblaze.com';
    const username = `testuser_${new Date().getTime()}`;
    const password = 'testpassword';
  
    it('debería registrar un nuevo usuario a través de la API', () => {
        const username = `testuser_${new Date().getTime()}`;
        const password = 'testpassword';
      
        cy.request({
          method: 'POST',
          url: 'https://api.demoblaze.com/signup',
          body: {
            username: username,
            password: password,
          },
          failOnStatusCode: false
        }).then((response) => {
          console.log(response); // Imprime toda la respuesta
          expect(response.status).to.eq(200); // Verifica el código de estado
          
          // Verifica que el cuerpo tenga contenido si no está vacío
          if (response.body) {
            expect(response.body).to.not.be.empty;
          } else {
            cy.log('La respuesta está vacía');
          }
        });
      });
  
    it('debería iniciar sesión a través de la API', () => {
      cy.request({
        method: 'POST',
        url: 'https://api.demoblaze.com/login',
        body: {
          username: username,
          password: password,
        },
        failOnStatusCode: false
      }).then((loginResponse) => {
        console.log(loginResponse);
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body).to.not.be.empty;
      });
    });
  
    it('debería iniciar sesión a través de la API', () => {
        const username = `testuser_${new Date().getTime()}`;
        const password = 'testpassword';
      
        // Primero, registra al usuario
        cy.request({
          method: 'POST',
          url: 'https://api.demoblaze.com/signup',
          body: {
            username: username,
            password: password,
          },
          failOnStatusCode: false
        }).then((signupResponse) => {
          expect(signupResponse.status).to.eq(200);
      
          // Luego, inicia sesión
          cy.request({
            method: 'POST',
            url: 'https://api.demoblaze.com/login',
            body: {
              username: username,
              password: password,
            },
            failOnStatusCode: false
          }).then((loginResponse) => {
            console.log(loginResponse); // Imprime toda la respuesta
            expect(loginResponse.status).to.eq(200); // Verifica el código de estado
      
            // Verifica que el cuerpo tenga contenido
            if (loginResponse.body) {
              expect(loginResponse.body).to.not.be.empty;
            } else {
              cy.log('La respuesta está vacía');
            }
          });
        });
      });
  
    it('debería manejar el registro de un usuario existente', () => {
      cy.visit(baseUrl);
  
      cy.get('#signin2').contains('Sign up').click({ force: true });
      cy.get('#signInModal').should('be.visible');
  
      cy.get('#sign-username').type(username);
      cy.get('#sign-password').type(password);
      
      cy.get('#signInModal .btn-primary').click({ force: true });
  
      cy.window().then((win) => {
        cy.stub(win, 'alert').callsFake((text) => {
          expect(text).to.eq('This user already exist.');
        });
      });
  
      cy.wait(1000);
      cy.get('#signInModal > .modal-dialog > .modal-content > .modal-header > .close > span').click();
    });
  });
  