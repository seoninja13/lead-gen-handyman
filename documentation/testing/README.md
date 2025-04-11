# Testing Guidelines

This document outlines the testing strategy, tools, and best practices for the Handyman Lead Generation Project.

## 📋 Table of Contents

- [Testing Strategy](#testing-strategy)
- [Testing Tools](#testing-tools)
- [Types of Tests](#types-of-tests)
- [Test Directory Structure](#test-directory-structure)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)
- [Mocking](#mocking)
- [Testing Specific Features](#testing-specific-features)
- [Debugging Tests](#debugging-tests)

## Testing Strategy

Our testing strategy follows the testing pyramid approach:

1. **Unit Tests**: The foundation of our testing strategy, focusing on testing individual functions and components in isolation.
2. **Integration Tests**: Testing how components and services work together.
3. **End-to-End Tests**: Testing complete user flows and scenarios.

We aim for:
- High test coverage for critical components and business logic
- Fast and reliable tests that can run in CI/CD pipelines
- Tests that serve as documentation for how components should behave

## Testing Tools

We use the following tools for testing:

- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **Cypress**: For end-to-end testing
- **MSW (Mock Service Worker)**: For mocking API requests
- **Jest Coverage**: For tracking test coverage

## Types of Tests

### Unit Tests

Unit tests focus on testing individual functions, components, or modules in isolation. They should:

- Be fast and deterministic
- Mock external dependencies
- Test both success and failure cases
- Focus on a single unit of functionality

Example unit test for a utility function:

```javascript
// utils/formatCurrency.js
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// utils/__tests__/formatCurrency.test.js
import { formatCurrency } from '../formatCurrency';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(1000.5)).toBe('$1,000.50');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats other currencies correctly', () => {
    expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
    expect(formatCurrency(1000, 'GBP')).toBe('£1,000.00');
  });

  it('handles negative values', () => {
    expect(formatCurrency(-1000)).toBe('-$1,000.00');
  });
});
```

Example unit test for a React component:

```javascript
// components/Button.js
export function Button({ children, onClick, disabled }) {
  return (
    <button 
      className="btn" 
      onClick={onClick} 
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// components/__tests__/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Integration Tests

Integration tests focus on how components and services work together. They should:

- Test interactions between components
- Test data flow between components
- Mock external services (API, database)
- Test more complex scenarios

Example integration test:

```javascript
// integration/__tests__/SearchForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SearchPage } from '../../pages/search';

// Mock API response
const server = setupServer(
  rest.get('/api/providers', (req, res, ctx) => {
    const location = req.url.searchParams.get('location');
    const serviceType = req.url.searchParams.get('serviceType');
    
    return res(
      ctx.json({
        providers: [
          {
            id: '1',
            businessName: 'ABC Plumbing',
            services: ['Plumbing'],
            city: location,
          },
          {
            id: '2',
            businessName: 'XYZ Plumbing',
            services: ['Plumbing'],
            city: location,
          },
        ],
        total: 2,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('SearchPage', () => {
  it('searches for providers and displays results', async () => {
    render(<SearchPage />);
    
    // Fill out search form
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New York' },
    });
    
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'Plumbing' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    // Wait for results to load
    await waitFor(() => {
      expect(screen.getByText('ABC Plumbing')).toBeInTheDocument();
      expect(screen.getByText('XYZ Plumbing')).toBeInTheDocument();
      expect(screen.getByText('2 providers found')).toBeInTheDocument();
    });
  });
  
  it('displays error message when API fails', async () => {
    // Override the default handler to return an error
    server.use(
      rest.get('/api/providers', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );
    
    render(<SearchPage />);
    
    // Fill out search form
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New York' },
    });
    
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'Plumbing' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/error loading providers/i)).toBeInTheDocument();
    });
  });
});
```

### End-to-End Tests

End-to-end tests focus on testing complete user flows and scenarios. They should:

- Test critical user journeys
- Run in a browser-like environment
- Interact with the application as a user would
- Test across multiple pages and components

Example Cypress test:

```javascript
// cypress/integration/search.spec.js
describe('Provider Search', () => {
  beforeEach(() => {
    // Visit the home page
    cy.visit('/');
  });

  it('allows users to search for providers and view details', () => {
    // Fill out the search form on the home page
    cy.get('[data-testid="location-input"]').type('New York');
    cy.get('[data-testid="service-select"]').select('Plumbing');
    cy.get('[data-testid="search-button"]').click();

    // Verify search results page
    cy.url().should('include', '/search');
    cy.get('[data-testid="search-results"]').should('be.visible');
    cy.get('[data-testid="provider-card"]').should('have.length.at.least', 1);

    // Click on the first provider
    cy.get('[data-testid="provider-card"]').first().click();

    // Verify provider details page
    cy.url().should('include', '/providers/');
    cy.get('[data-testid="provider-name"]').should('be.visible');
    cy.get('[data-testid="provider-services"]').should('be.visible');
    cy.get('[data-testid="contact-form"]').should('be.visible');

    // Fill out contact form
    cy.get('[data-testid="contact-name"]').type('John Doe');
    cy.get('[data-testid="contact-email"]').type('john@example.com');
    cy.get('[data-testid="contact-message"]').type('I need help with my plumbing');
    cy.get('[data-testid="contact-submit"]').click();

    // Verify success message
    cy.get('[data-testid="success-message"]').should('be.visible');
  });
});
```

## Test Directory Structure

We organize our tests as follows:

```
project/
├── components/
│   ├── Button.js
│   └── __tests__/
│       └── Button.test.js
├── utils/
│   ├── formatCurrency.js
│   └── __tests__/
│       └── formatCurrency.test.js
├── pages/
│   ├── index.js
│   └── __tests__/
│       └── index.test.js
├── integration/
│   └── __tests__/
│       └── SearchForm.test.js
└── cypress/
    ├── integration/
    │   └── search.spec.js
    ├── fixtures/
    │   └── providers.json
    └── support/
        └── commands.js
```

- Unit tests are placed in `__tests__` directories next to the files they test
- Integration tests are placed in a separate `integration/__tests__` directory
- End-to-end tests are placed in the `cypress/integration` directory

## Writing Tests

### Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not how it does it.
2. **Use descriptive test names**: Test names should clearly describe what is being tested.
3. **Follow the AAA pattern**: Arrange, Act, Assert.
4. **Keep tests independent**: Tests should not depend on each other.
5. **Mock external dependencies**: Use mocks for API calls, databases, etc.
6. **Test edge cases**: Test boundary conditions and error cases.
7. **Keep tests simple**: Each test should test one thing.
8. **Use data-testid attributes**: Use data-testid for selecting elements in tests.

### Testing React Components

When testing React components, follow these guidelines:

1. Use React Testing Library's queries in this order of preference:
   - getByRole
   - getByLabelText
   - getByPlaceholderText
   - getByText
   - getByDisplayValue
   - getByAltText
   - getByTitle
   - getByTestId

2. Test user interactions using fireEvent or userEvent.

3. Test accessibility by ensuring elements have proper roles and labels.

4. Test both success and error states.

Example:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../SearchForm';

describe('SearchForm', () => {
  it('submits the form with input values', () => {
    const handleSearch = jest.fn();
    render(<SearchForm onSearch={handleSearch} />);
    
    // Fill out form
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New York' },
    });
    
    fireEvent.change(screen.getByLabelText(/service type/i), {
      target: { value: 'Plumbing' },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    // Assert
    expect(handleSearch).toHaveBeenCalledWith({
      location: 'New York',
      serviceType: 'Plumbing',
    });
  });
  
  it('displays validation errors for empty fields', () => {
    const handleSearch = jest.fn();
    render(<SearchForm onSearch={handleSearch} />);
    
    // Submit form without filling it out
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    
    // Assert validation errors
    expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    expect(screen.getByText(/service type is required/i)).toBeInTheDocument();
    
    // Assert that onSearch was not called
    expect(handleSearch).not.toHaveBeenCalled();
  });
});
```

## Running Tests

### Running Unit and Integration Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests for a specific file
npm test -- Button.test.js

# Run tests with coverage
npm test -- --coverage
```

### Running End-to-End Tests

```bash
# Open Cypress test runner
npm run cypress:open

# Run Cypress tests headlessly
npm run cypress:run
```

## Test Coverage

We aim for high test coverage, especially for critical components and business logic. We use Jest's coverage reports to track our progress.

Coverage targets:
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

To generate a coverage report:

```bash
npm test -- --coverage
```

The coverage report will be available in the `coverage` directory.

## Continuous Integration

We run tests in our CI/CD pipeline to ensure code quality. The pipeline:

1. Runs linting checks
2. Runs unit and integration tests
3. Generates coverage reports
4. Runs end-to-end tests
5. Fails the build if any tests fail or if coverage is below the target

## Mocking

### Mocking API Requests

We use Mock Service Worker (MSW) to mock API requests:

```javascript
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/providers', (req, res, ctx) => {
    return res(
      ctx.json({
        providers: [
          { id: '1', name: 'Provider 1' },
          { id: '2', name: 'Provider 2' },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Mocking Components

For complex components, we can mock them using Jest's mock functions:

```javascript
// Mock a component
jest.mock('../ComplexComponent', () => {
  return {
    ComplexComponent: ({ onAction }) => (
      <div data-testid="mocked-complex-component" onClick={onAction}>
        Mocked Component
      </div>
    ),
  };
});
```

### Mocking Hooks

For custom hooks, we can mock them using Jest's mock functions:

```javascript
// Mock a hook
jest.mock('../useAuth', () => {
  return {
    useAuth: () => ({
      user: { id: '1', name: 'Test User' },
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    }),
  };
});
```

## Testing Specific Features

### Testing Forms

When testing forms, focus on:
- Input validation
- Form submission
- Error handling
- Success states

Example:

```javascript
it('validates form inputs correctly', () => {
  render(<ContactForm onSubmit={jest.fn()} />);
  
  // Submit empty form
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  // Check validation errors
  expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  
  // Fill out name field
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: 'John Doe' },
  });
  
  // Submit again
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  
  // Name error should be gone, but email error should remain
  expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
  expect(screen.getByText(/email is required/i)).toBeInTheDocument();
});
```

### Testing Authentication

When testing authentication, focus on:
- Login/logout functionality
- Protected routes
- Authenticated/unauthenticated states

Example:

```javascript
it('redirects to login page for protected routes when not authenticated', () => {
  // Mock useAuth to return not authenticated
  jest.mock('../useAuth', () => {
    return {
      useAuth: () => ({
        user: null,
        isAuthenticated: false,
        login: jest.fn(),
        logout: jest.fn(),
      }),
    };
  });
  
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <div>Profile Page</div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </MemoryRouter>
  );
  
  // Should redirect to login page
  expect(screen.getByText(/login page/i)).toBeInTheDocument();
  expect(screen.queryByText(/profile page/i)).not.toBeInTheDocument();
});
```

### Testing API Calls

When testing API calls, focus on:
- Success responses
- Error handling
- Loading states
- Data transformation

Example:

```javascript
it('fetches and displays provider data', async () => {
  // Mock API response
  server.use(
    rest.get('/api/providers/1', (req, res, ctx) => {
      return res(
        ctx.json({
          id: '1',
          name: 'ABC Plumbing',
          services: ['Plumbing', 'Water Heater Installation'],
          rating: 4.5,
        })
      );
    })
  );
  
  render(<ProviderDetail id="1" />);
  
  // Should show loading state initially
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('ABC Plumbing')).toBeInTheDocument();
    expect(screen.getByText('Plumbing')).toBeInTheDocument();
    expect(screen.getByText('Water Heater Installation')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });
});
```

## Debugging Tests

When tests fail, use these techniques to debug:

1. **Use console.log**: Add console.log statements to see what's happening.
2. **Use screen.debug()**: React Testing Library's screen.debug() shows the current state of the DOM.
3. **Use the --verbose flag**: Run tests with the --verbose flag to see more details.
4. **Use the --watch flag**: Run tests in watch mode to quickly iterate.
5. **Check test isolation**: Make sure tests are not affecting each other.

Example:

```javascript
it('debugging example', () => {
  render(<MyComponent />);
  
  // Log the current state of the DOM
  console.log(screen.debug());
  
  // Log specific elements
  console.log(screen.getByRole('button'));
  
  // Perform actions
  fireEvent.click(screen.getByRole('button'));
  
  // Log the updated state
  console.log(screen.debug());
});
```

---

By following these testing guidelines, we ensure that our application is reliable, maintainable, and functions as expected. Testing is an integral part of our development process, and all new features should include appropriate tests.
