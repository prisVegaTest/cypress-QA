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
  
    it('deberia iniciar sesión exitoso del usuario registrado sin la API', () => {
      cy.visit(baseUrl);

      cy.get('#login2').contains('Log in').click({force: true});
      cy.get('#logInModal > .modal-dialog > .modal-content').should('be.visible');

      cy.get('#loginusername').type(username);
      cy.get('#loginpassword').type(password);
      cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({ force: true });
    });

    it('deberia iniciar sesión del usuario con clave incorrecta registrado sin la API', () => {
      cy.visit(baseUrl);

      cy.get('#login2').contains('Log in').click({force: true});
      cy.get('#logInModal > .modal-dialog > .modal-content').should('be.visible');

      cy.get('#loginusername').type(username);
      cy.get('#loginpassword').type('pasword1234');
      cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click({ force: true });

      cy.window().then((win) => {
        cy.stub(win, 'alert').callsFake((text) => {
          expect(text).to.eq('Wrong password.');
        });
    });

    it('deberia registrar un nuevo usuario sin la API', () => {
      cy.visit(baseUrl);

      cy.get('#signin2').contains('Sign up').click({force: true});
      cy.get('#signInModal').should('be.visible');

      cy.get('#sign-username').type(username);
      cy.get('#sign-password').type(password);
      cy.get('#signInModal .btn-primary').click({ force: true });

      cy.window().then((win) => {
        cy.stub(win, 'alert').callsFake((text) => {
          if (text === 'Sign up successful.') {
            expect(text).to.eq('Sign up successful.');
          } else if (text === 'This user already exist.') {
            expect(text).to.eq('This user already exist.');
          }
        });
      });
  
      cy.wait(1000);
      cy.get('#signInModal > .modal-dialog > .modal-content > .modal-header > .close > span').click();
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
});