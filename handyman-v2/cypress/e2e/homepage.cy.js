// Homepage tests
describe('Homepage', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('http://localhost:3000')
  })

  it('should load the homepage successfully', () => {
    // Check if the page title is correct
    cy.title().should('include', 'Handyman')
    
    // Check if the header is visible
    cy.get('header').should('be.visible')
    
    // Check if the hero section is visible
    cy.get('.hero-search-content').should('be.visible')
  })

  it('should display all main sections', () => {
    // Check if featured services section is visible
    cy.get('.featured-service-one').should('be.visible')
    
    // Check if find services section is visible
    cy.get('.why-chose-us').should('be.visible')
    
    // Check if blogs section is visible
    cy.get('.blog-section').should('be.visible')
    
    // Check if partners section is visible
    cy.get('.our-partners').should('be.visible')
    
    // Check if footer is visible
    cy.get('footer').should('be.visible')
  })

  it('should have working navigation links', () => {
    // Check if navigation links exist
    cy.get('nav a').should('have.length.at.least', 3)
    
    // Check if the logo link works
    cy.get('header .logo a').should('have.attr', 'href')
  })

  it('should not have console errors', () => {
    // Check for console errors
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
    
    // Reload the page
    cy.reload()
    
    // Check if there were any console errors
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('should display images correctly', () => {
    // Check if images in featured services section are loaded
    cy.get('.featured-service-one img').should('be.visible')
    
    // Check if images in find services section are loaded
    cy.get('.why-chose-us img').should('be.visible')
    
    // Check if images in blogs section are loaded
    cy.get('.blog-section img').should('be.visible')
    
    // Check if partner logos are loaded
    cy.get('.our-partners img').should('be.visible')
  })

  it('should have a working search form', () => {
    // Check if search form exists
    cy.get('.hero-search-form').should('be.visible')
    
    // Check if search input exists
    cy.get('.hero-search-form input').should('be.visible')
    
    // Check if search button exists
    cy.get('.hero-search-form button').should('be.visible')
  })
})
