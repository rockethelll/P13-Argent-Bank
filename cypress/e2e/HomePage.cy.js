/* eslint-disable no-undef */
describe('Check home page ', () => {
  it('should contain a signin button', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="signin-btn"]').should('exist');
  });

  it('should redirect to the login page when clicking on the signin button', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="signin-btn"]').click();

    cy.url().should('include', '/user/login');
  });
});

describe('Check login and profile page', () => {
  // Perform login before each test in this describe block
  beforeEach(() => {
    cy.visit('http://localhost:5173/user/login');

    cy.get('[data-testid="email"]').type('tony@stark.com');
    cy.get('[data-testid="password"]').type('password123');
    cy.get('[data-testid="login-btn"]').click();

    cy.url().should('include', '/user/profile');
    cy.get('[data-testid="signin-btn"]').should('not.exist');
  });

  it('should login with valid credentials', () => {
    cy.url().should('include', '/user/profile');
  });
  it('should contain an edit button', () => {
    cy.get('.edit-button').should('exist');
    // cy.wait(1000);
    cy.get('.edit-button').click();
    // cy.wait(1000);
    cy.get('.cancel-button').should('exist');
    cy.get('.cancel-button').click();
  });
  it('should redirect on home page when clicking on the logo', () => {
    cy.get('.main-nav-logo').should('exist');
    cy.get('.main-nav-logo').click();
    cy.url().should('include', '/');
  });
  it('should contain a sign out button and disconnect uses', () => {
    cy.get('[data-testid="logout-btn"]').should('exist');
    cy.get('[data-testid="logout-btn"]').click();
    cy.get('[data-testid="signin-btn"]').should('exist');
  });
});
