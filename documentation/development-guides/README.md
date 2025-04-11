# Development Guides

This section provides comprehensive guides and standards for developing the Handyman Lead Generation Project.

## 📋 Table of Contents

- [Coding Standards](#coding-standards)
- [Development Workflow](#development-workflow)
- [Component Development](#component-development)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing Guidelines](#testing-guidelines)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Documentation](#documentation)
- [Contributing](#contributing)

## Coding Standards

We follow strict coding standards to ensure code quality, maintainability, and consistency across the project.

[View Coding Standards](./coding-standards.md)

Key points:
- Use ES6+ features and TypeScript
- Follow functional programming principles
- Use React hooks for state management
- Follow TailwindCSS best practices
- Implement proper error handling
- Write self-documenting code

## Development Workflow

Our development workflow is designed to streamline the development process and ensure code quality.

### Git Workflow

1. **Create a branch** from the `main` branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. **Make your changes** following the coding standards

3. **Commit your changes** with descriptive messages:
   ```bash
   git add .
   git commit -m "feat: add search functionality"
   ```

4. **Push your branch** to the repository:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request** to the `main` branch

6. **Address review feedback** and make necessary changes

7. **Merge your pull request** once approved

### Development Environment

1. **Set up your environment** following the [Getting Started Guide](../getting-started/README.md)

2. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Start the MCP servers** if needed:
   ```bash
   ./start-all-mcp-servers.bat
   ```

4. **Access the application** at [http://localhost:3000](http://localhost:3000)

## Component Development

We follow a component-based architecture using React functional components and hooks.

### Component Structure

```jsx
// components/ui/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className,
  ...props
}) {
  const buttonClasses = classNames(
    'rounded font-medium focus:outline-none focus:ring-2',
    {
      'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
      'bg-gray-200 hover:bg-gray-300 text-gray-800': variant === 'secondary',
      'bg-red-600 hover:bg-red-700 text-white': variant === 'danger',
      'px-2 py-1 text-sm': size === 'small',
      'px-4 py-2': size === 'medium',
      'px-6 py-3 text-lg': size === 'large',
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
```

### Component Documentation

All components should be documented using the [Component Documentation Template](./component-template.md).

## State Management

We use React hooks for state management, with the following guidelines:

### Local State

Use `useState` for component-local state:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Complex State

Use `useReducer` for complex state logic:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```

### Shared State

Use React Context for shared state:

```jsx
// contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    setLoading(false);

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signIn: (email, password) => supabase.auth.signIn({ email, password }),
    signOut: () => supabase.auth.signOut(),
    // Other auth methods...
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
```

## API Integration

We use the following patterns for API integration:

### Data Fetching

Use custom hooks for data fetching:

```jsx
// hooks/useProviders.js
import { useState, useEffect } from 'react';

export function useProviders(location, serviceType) {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProviders() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/providers?location=${encodeURIComponent(location)}&serviceType=${encodeURIComponent(serviceType)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setProviders(data.providers);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    }

    if (location && serviceType) {
      fetchProviders();
    }
  }, [location, serviceType]);

  return { providers, loading, error };
}
```

### API Routes

Implement API routes in the `pages/api` directory:

```jsx
// pages/api/providers.js
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { location, serviceType } = req.query;

    try {
      const { data, error } = await supabase.rpc('search_providers', {
        p_location: location,
        p_service_type: serviceType
      });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ providers: data || [] });
    } catch (error) {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
```

## Testing Guidelines

We follow comprehensive testing practices to ensure code quality and reliability.

[View Testing Guidelines](../testing/README.md)

Key points:
- Write unit tests for all components and functions
- Write integration tests for complex interactions
- Write end-to-end tests for critical user flows
- Aim for high test coverage
- Test both success and failure cases

## Performance Optimization

We implement various performance optimizations to ensure a fast and responsive application.

### Code Splitting

Use dynamic imports for code splitting:

```jsx
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### Memoization

Use memoization to prevent unnecessary re-renders:

```jsx
import { useMemo, useCallback } from 'react';

// Memoize expensive calculations
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// Memoize callbacks
const handleClick = useCallback(() => {
  console.log('Clicked!');
}, []);
```

### Image Optimization

Use Next.js Image component for optimized images:

```jsx
import Image from 'next/image';

function ProfileImage({ src, alt }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      layout="responsive"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  );
}
```

## Accessibility

We prioritize accessibility to ensure the application is usable by everyone.

### Semantic HTML

Use semantic HTML elements:

```jsx
// Good
<button onClick={handleClick}>Click me</button>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// Avoid
<div onClick={handleClick}>Click me</div>
<div>
  <div>
    <div onClick={() => navigate('/')}>Home</div>
    <div onClick={() => navigate('/about')}>About</div>
  </div>
</div>
```

### ARIA Attributes

Use ARIA attributes when necessary:

```jsx
<button
  aria-label="Close modal"
  aria-expanded={isOpen}
  onClick={closeModal}
>
  <span className="sr-only">Close</span>
  <XIcon />
</button>
```

### Keyboard Navigation

Ensure keyboard navigation works:

```jsx
function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      onSelect(options[selectedIndex]);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Component implementation...
}
```

## Documentation

We maintain comprehensive documentation to ensure code maintainability and knowledge sharing. For detailed guidelines on how and where to document code, please refer to our [Documentation Guide](./documentation-guide.md).

### Code Documentation

Document your code with clear comments:

```jsx
/**
 * Formats a number as currency.
 *
 * @param {number} amount - The amount to format
 * @param {string} [currency='USD'] - The currency code
 * @returns {string} The formatted currency string
 *
 * @example
 * formatCurrency(1000); // '$1,000.00'
 * formatCurrency(1000, 'EUR'); // '€1,000.00'
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
```

### Component Documentation

Document components using the [Component Documentation Template](./component-template.md).

### API Documentation

Document API endpoints using the [API Endpoint Documentation Template](../api/api-endpoint-template.md).

## Contributing

We welcome contributions from all team members. Please follow our contributing guidelines to ensure a smooth collaboration process.

[View Contributing Guidelines](./contributing.md)

Key points:
- Follow the code of conduct
- Follow the development workflow
- Write tests for your code
- Update documentation
- Submit pull requests for review

---

These development guides provide a comprehensive reference for developing the Handyman Lead Generation Project. By following these guidelines, we ensure code quality, maintainability, and consistency across the project.
