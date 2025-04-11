# Coding Standards

This document outlines the coding standards and best practices for the Handyman Lead Generation Project. Following these standards ensures consistency, maintainability, and quality across the codebase.

## 📋 Table of Contents

- [General Guidelines](#general-guidelines)
- [JavaScript/TypeScript](#javascripttypescript)
- [React Components](#react-components)
- [CSS and Styling](#css-and-styling)
- [File Organization](#file-organization)
- [Error Handling](#error-handling)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [Security](#security)
- [Testing](#testing)
- [Documentation](#documentation)

## General Guidelines

- Write clean, readable, and self-documenting code
- Follow the DRY (Don't Repeat Yourself) principle
- Keep functions and components small and focused
- Use meaningful variable and function names
- Prioritize readability over cleverness
- Comment complex logic, but prefer self-documenting code
- Use consistent formatting (enforced by ESLint and Prettier)

## JavaScript/TypeScript

### Syntax and Features

- Use ES6+ features and syntax
- Use `const` for variables that don't change, `let` for variables that do
- Avoid `var` completely
- Use arrow functions for anonymous functions
- Use template literals for string interpolation
- Use destructuring for objects and arrays
- Use spread/rest operators when appropriate
- Use optional chaining and nullish coalescing operators

```javascript
// Good
const { name, age } = person;
const newArray = [...oldArray, newItem];
const value = data?.user?.profile?.settings ?? defaultSettings;

// Avoid
const name = person.name;
const age = person.age;
const newArray = oldArray.concat([newItem]);
const value = data && data.user && data.user.profile && data.user.profile.settings ? data.user.profile.settings : defaultSettings;
```

### TypeScript

- Use TypeScript for type safety
- Define interfaces for component props
- Use type annotations for function parameters and return types
- Use enums for sets of related constants
- Use union types for variables that can have multiple types
- Avoid using `any` type unless absolutely necessary

```typescript
// Good
interface UserProps {
  id: string;
  name: string;
  age?: number;
  role: 'admin' | 'user' | 'guest';
}

function formatUser(user: UserProps): string {
  return `${user.name} (${user.role})`;
}

// Avoid
function formatUser(user): string {
  return `${user.name} (${user.role})`;
}
```

### Asynchronous Code

- Use async/await for asynchronous operations
- Handle errors with try/catch blocks
- Avoid nested promises and callback chains

```javascript
// Good
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Avoid
function fetchData() {
  return fetch('/api/data')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}
```

## React Components

### Component Structure

- Use functional components with hooks
- Keep components small and focused on a single responsibility
- Extract reusable logic into custom hooks
- Use named exports for components
- Place each component in its own file
- Follow the component documentation template

```jsx
// Good
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchData } from '../utils/api';

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        const userData = await fetchData(`/api/users/${userId}`);
        setUser(userData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired,
};
```

### Props

- Use prop destructuring in function parameters
- Define PropTypes for all components
- Provide default values for optional props
- Use the spread operator for passing props to child components

```jsx
// Good
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  ...props 
}) {
  // Component implementation
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
```

### Hooks

- Follow the Rules of Hooks
- Use the appropriate hooks for each use case
- Extract complex logic into custom hooks
- Keep hook dependencies accurate and minimal

```jsx
// Good - Custom hook
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchUser() {
      try {
        setLoading(true);
        const data = await fetchData(`/api/users/${userId}`);
        if (isMounted) {
          setUser(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUser();
    
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { user, loading, error };
}
```

## CSS and Styling

### TailwindCSS

- Use TailwindCSS utility classes for styling
- Follow the utility-first approach
- Use consistent spacing and sizing
- Use responsive design utilities
- Extract common patterns to components

```jsx
// Good
function Card({ title, content }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">{content}</p>
    </div>
  );
}
```

### Custom CSS

- Use CSS modules for component-specific styles
- Follow the BEM naming convention for custom CSS classes
- Keep selectors simple and specific
- Avoid using !important
- Use CSS variables for theming

```css
/* Good */
.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}

.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-text);
}
```

## File Organization

### Directory Structure

- Group files by feature or module
- Use consistent naming conventions
- Keep related files together
- Separate business logic from UI components

```
components/
├── common/
│   ├── Button.js
│   ├── Card.js
│   └── Input.js
├── layout/
│   ├── Header.js
│   ├── Footer.js
│   └── Layout.js
├── providers/
│   ├── ProviderCard.js
│   ├── ProviderList.js
│   └── ProviderDetail.js
└── search/
    ├── SearchForm.js
    ├── SearchResults.js
    └── SearchFilters.js
```

### Naming Conventions

- Use PascalCase for component files and component names
- Use camelCase for utility functions and hooks
- Use kebab-case for CSS files and class names
- Use descriptive, meaningful names

```
components/Button.js -> export function Button() {}
hooks/useAuth.js -> export function useAuth() {}
utils/formatDate.js -> export function formatDate() {}
styles/button.module.css -> .button-primary {}
```

## Error Handling

- Use try/catch blocks for error handling
- Provide meaningful error messages
- Log errors with appropriate context
- Display user-friendly error messages
- Implement error boundaries for React components

```jsx
// Good
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    // Rethrow or handle as appropriate
    throw new Error('Unable to fetch data. Please try again later.');
  }
}

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }
    return this.props.children;
  }
}
```

## Performance Considerations

- Use React.memo for pure components
- Use useMemo and useCallback for expensive calculations and callbacks
- Implement virtualization for long lists
- Optimize images and assets
- Use code splitting and lazy loading
- Minimize re-renders

```jsx
// Good
import React, { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onItemClick }) {
  // Memoize expensive calculation
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: expensiveOperation(item)
    }));
  }, [data]);

  // Memoize callback
  const handleItemClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {processedData.map(item => (
        <Item 
          key={item.id} 
          data={item} 
          onClick={() => handleItemClick(item.id)} 
        />
      ))}
    </div>
  );
}

// Prevent unnecessary re-renders
const Item = React.memo(function Item({ data, onClick }) {
  return (
    <div onClick={onClick}>
      {data.name}: {data.processed}
    </div>
  );
});
```

## Accessibility

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Provide text alternatives for non-text content
- Test with screen readers

```jsx
// Good
function SearchForm({ onSubmit }) {
  return (
    <form 
      role="search" 
      aria-label="Search for providers"
      onSubmit={onSubmit}
    >
      <label htmlFor="search-input">Search</label>
      <input 
        id="search-input"
        type="search"
        placeholder="Search providers..."
        aria-required="true"
      />
      <button 
        type="submit"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}
```

## Security

- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS for all requests
- Implement proper authentication and authorization
- Protect against common vulnerabilities (XSS, CSRF, etc.)
- Keep dependencies updated

```jsx
// Good - Sanitizing user input
import DOMPurify from 'dompurify';

function Comment({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
```

## Testing

- Write tests for all components and functions
- Maintain high test coverage
- Test both success and failure cases
- Mock external dependencies
- Use meaningful assertions

```jsx
// Good
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });

  it('calls onClick handler when clicked', () => {
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

## Documentation

- Document all components, functions, and APIs
- Follow the established documentation templates
- Keep documentation up-to-date with code changes
- Include examples and use cases
- Document edge cases and limitations

```jsx
/**
 * Button component for user interactions.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary'] - Button style variant
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Button size
 * @param {Function} [props.onClick] - Click handler function
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @returns {JSX.Element} Button component
 * 
 * @example
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Submit
 * </Button>
 */
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false 
}) {
  // Implementation
}
```

---

By following these coding standards, we ensure that our codebase remains consistent, maintainable, and of high quality. These standards should be applied to all new code and, when possible, existing code should be refactored to meet these standards.
