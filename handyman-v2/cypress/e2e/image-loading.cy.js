// Image loading tests
describe('Image Loading', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('http://localhost:3000')
    
    // Wait for images to load
    cy.wait(2000)
  })

  it('should load all images without errors', () => {
    // Check for network errors
    cy.window().then((win) => {
      cy.spy(win.console, 'error').as('consoleError')
    })
    
    // Get all images on the page
    cy.get('img').each(($img) => {
      // Check if the image has a valid src attribute
      cy.wrap($img).should('have.attr', 'src')
      
      // Check if the image is visible
      cy.wrap($img).should('be.visible')
      
      // Check if the image has loaded successfully
      cy.wrap($img).should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    })
    
    // Check if there were any console errors
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('should load city images correctly', () => {
    // Check if city images are loaded
    cy.get('.city-img img').each(($img) => {
      // Check if the image has a valid src attribute
      cy.wrap($img).should('have.attr', 'src')
      
      // Check if the image is visible
      cy.wrap($img).should('be.visible')
      
      // Check if the image has loaded successfully
      cy.wrap($img).should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    })
  })

  it('should load service images correctly', () => {
    // Check if service images are loaded
    cy.get('.feature-img img').each(($img) => {
      // Check if the image has a valid src attribute
      cy.wrap($img).should('have.attr', 'src')
      
      // Check if the image is visible
      cy.wrap($img).should('be.visible')
      
      // Check if the image has loaded successfully
      cy.wrap($img).should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    })
  })

  it('should load blog images correctly', () => {
    // Check if blog images are loaded
    cy.get('.blog-img img').each(($img) => {
      // Check if the image has a valid src attribute
      cy.wrap($img).should('have.attr', 'src')
      
      // Check if the image is visible
      cy.wrap($img).should('be.visible')
      
      // Check if the image has loaded successfully
      cy.wrap($img).should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    })
  })

  it('should load partner images correctly', () => {
    // Check if partner images are loaded
    cy.get('.partners-logo img').each(($img) => {
      // Check if the image has a valid src attribute
      cy.wrap($img).should('have.attr', 'src')
      
      // Check if the image is visible
      cy.wrap($img).should('be.visible')
      
      // Check if the image has loaded successfully
      cy.wrap($img).should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
    })
  })
})
