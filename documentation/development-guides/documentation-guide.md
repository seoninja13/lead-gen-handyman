# Documentation Guide

This guide explains how to document code and where to place documentation in the Handyman Lead Generation Project. Following these guidelines ensures consistency and makes it easier for all team members to understand the codebase.

## 📋 Table of Contents

- [Documentation Principles](#documentation-principles)
- [Where to Document](#where-to-document)
- [How to Document Code](#how-to-document-code)
- [Documentation Templates](#documentation-templates)
- [Documentation Process](#documentation-process)
- [Documentation Review](#documentation-review)
- [Documentation Examples](#documentation-examples)

## Documentation Principles

Our documentation follows these core principles:

1. **Clarity**: Documentation should be clear and easy to understand
2. **Completeness**: Documentation should cover all necessary aspects
3. **Consistency**: Documentation should follow consistent formats and standards
4. **Currency**: Documentation should be kept up-to-date with code changes
5. **Accessibility**: Documentation should be easy to find and navigate

## Where to Document

### 1. Code Documentation

Document code directly in the source files using comments:

- **JavaScript/TypeScript Files**: Use JSDoc comments
- **React Components**: Use JSDoc comments above component definitions
- **CSS/SCSS Files**: Use block comments for sections and inline comments for specific rules
- **Configuration Files**: Use comments to explain configuration options

### 2. Component Documentation

For React components, create separate documentation files:

- **Location**: Create a `README.md` file in the component's directory or document in the component file itself
- **Alternative**: For complex component libraries, document in `/documentation/components/[ComponentName].md`

### 3. API Documentation

Document API endpoints in dedicated files:

- **Location**: `/documentation/api/` directory
- **Format**: Follow the [API Endpoint Template](../api/api-endpoint-template.md)

### 4. Database Documentation

Document database schema, queries, and procedures:

- **Location**: `/documentation/database/` directory
- **Tables**: Document in `/documentation/database/schema.md`
- **Queries**: Document in `/documentation/database/queries.md`

### 5. Architecture Documentation

Document system architecture and design decisions:

- **Location**: `/documentation/architecture/` directory
- **Diagrams**: Store in `/documentation/assets/diagrams/`

### 6. Process Documentation

Document development processes and workflows:

- **Location**: `/documentation/development-guides/` directory

## How to Document Code

### JavaScript/TypeScript Files

Use JSDoc comments for functions, classes, and variables:

```javascript
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

### React Components

Document React components with JSDoc comments:

```jsx
/**
 * Button component for user interactions.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {('primary'|'secondary'|'danger')} [props.variant='primary'] - Button style variant
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Button size
 * @param {Function} [props.onClick] - Click handler function
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.className] - Additional CSS classes
 *
 * @example
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Submit
 * </Button>
 */
export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className,
  ...props
}) {
  // Component implementation
}
```

For complex components, create a separate README.md file in the component's directory:

```markdown
# Button Component

A versatile button component for user interactions.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | Button content |
| variant | 'primary' \| 'secondary' \| 'danger' | 'primary' | Button style variant |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Button size |
| onClick | Function | - | Click handler function |
| disabled | boolean | false | Whether the button is disabled |
| className | string | - | Additional CSS classes |

## Examples

```jsx
<Button variant="primary" size="large" onClick={handleClick}>
  Submit
</Button>

<Button variant="secondary" disabled>
  Cancel
</Button>
```

### CSS/SCSS Files

Document CSS with comments:

```css
/* ==========================================================================
   Button Component Styles
   ========================================================================== */

/* Primary button styles */
.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

/* Secondary button styles */
.btn-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text);
}

/* Button sizes */
.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}
```

### API Routes

Document API routes with comments:

```javascript
/**
 * API endpoint for retrieving service providers.
 *
 * @route GET /api/providers
 * @query {string} location - City or zip code to search in
 * @query {string} [serviceType] - Type of service to filter by
 * @query {number} [radius=10] - Search radius in miles
 * @query {number} [limit=20] - Number of results to return
 * @query {number} [offset=0] - Number of results to skip
 * @query {string} [sort='rating'] - Sort by: 'rating', 'distance', or 'price'
 * @returns {Object} JSON response with providers array and metadata
 */
export default async function handler(req, res) {
  // Implementation
}
```

## Documentation Templates

Use the following templates for different types of documentation:

1. **Component Documentation**: [Component Template](./component-template.md)
2. **API Endpoint Documentation**: [API Endpoint Template](../api/api-endpoint-template.md)
3. **Database Documentation**: [Database Schema Template](../database/schema-template.md)

## Code Change Tracking

The project maintains several mechanisms to track code changes, progress, and issues:

### 1. Daily Development Log

The daily development log tracks progress, documents issues, and shares knowledge among team members.

### Location

The daily log is located at:
```
handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md
```

### When to Update the Daily Log

Update the daily log in the following situations:

1. **At the start of your workday**: Document what you plan to work on
2. **When completing significant tasks**: Record completed work and any important findings
3. **When encountering issues**: Document problems, attempted solutions, and workarounds
4. **At the end of your workday**: Summarize progress and note any pending items for the next day

### Daily Log Format

Each daily entry should follow this format:

```markdown
## [Date in Month Day, Year format]

### [Main Focus or Task Category]

[Brief description of the day's focus]

#### Completed Tasks

1. **[Task Name]**
   - [Details about the task]
   - [Any important findings or decisions]

2. **[Another Task]**
   - [Details about the task]

#### Current Issues

- [Description of any ongoing issues]
- [Possible causes or solutions being explored]

#### Next Steps

1. **[Next Step]**
   - [Details about the next step]

2. **[Another Next Step]**
   - [Details about the next step]

#### Notes for Tomorrow

- [Important information for the next day]
- [Environment details, URLs, or other context]
```

### 2. Code Change Log

The Code Change Log specifically tracks all significant code changes in the project.

#### Location

The Code Change Log is located at:
```
documentation/code-change-log.md
```

#### When to Update the Code Change Log

Update the Code Change Log in the following situations:

1. **When making significant code changes**: Document what files were changed and why
2. **When completing a feature or task**: Record all the changes made to implement the feature
3. **When fixing bugs**: Document the bug fix and affected files
4. **When refactoring code**: Explain what was refactored and why

#### Code Change Log Format

Each entry in the Code Change Log should include:

1. **Date**: When the changes were made
2. **Developer**: Who made the changes
3. **Related Task(s)**: Task IDs from the task tracking system
4. **Pull Request**: Reference to the PR (if applicable)
5. **Changes**: Table of files changed, description of changes, and reasons
6. **Description**: Detailed explanation of the changes
7. **Testing**: How the changes were tested

#### Automated Change Logging

You can use the `log-changes.js` script to help log your changes:

```bash
node scripts/log-changes.js
```

This script will:
1. Detect changed files in your working directory
2. Prompt you for information about each change
3. Generate entries for both the Daily Log and Code Change Log
4. Update both logs with your entries

### Example Daily Log Entry

```markdown
## April 11, 2025

### Documentation Structure Implementation

Today's focus was on creating a comprehensive documentation structure for the project.

#### Completed Tasks

1. **Created Documentation Directory Structure**
   - Set up main documentation categories (getting-started, architecture, etc.)
   - Created README files for each section

2. **Implemented Documentation Templates**
   - Created component documentation template
   - Created API endpoint documentation template
   - Created documentation guide

#### Current Issues

- Need to consolidate existing documentation from various files
- Some sections still need more detailed content

#### Next Steps

1. **Content Migration**
   - Move existing documentation into the new structure
   - Update references to documentation in code

2. **Documentation Review**
   - Have team members review the documentation
   - Gather feedback and make improvements

#### Notes for Tomorrow

- Documentation structure is in place at /documentation
- Focus on content migration and filling gaps in documentation
```

## Documentation Process

Follow this process when documenting code:

### 1. Document as You Code

- Write documentation alongside your code
- Update documentation when you change code
- Include documentation in your pull requests

### 2. Documentation for New Features

For new features, follow these steps:

1. **Plan Documentation**: Identify what needs to be documented
2. **Write Documentation**: Create documentation files and add inline documentation
3. **Review Documentation**: Have team members review your documentation
4. **Update Documentation**: Make changes based on feedback
5. **Submit Documentation**: Include documentation in your pull request

### 3. Updating Existing Documentation

When updating existing code:

1. **Review Existing Documentation**: Understand the current documentation
2. **Identify Changes**: Determine what documentation needs to be updated
3. **Update Documentation**: Make necessary changes to documentation
4. **Review Changes**: Have team members review your changes
5. **Submit Updates**: Include documentation updates in your pull request

## Documentation Review

All documentation should be reviewed as part of the code review process:

### Review Checklist

- [ ] Documentation is clear and easy to understand
- [ ] Documentation is complete and covers all necessary aspects
- [ ] Documentation follows the established templates and standards
- [ ] Documentation is up-to-date with the code
- [ ] Examples are provided where appropriate
- [ ] Links to related documentation are included

## Documentation Examples

### Example 1: Component Documentation

```jsx
/**
 * SearchForm component for searching service providers.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function called when search is submitted
 * @param {string} [props.initialLocation=''] - Initial value for the location input
 * @param {string} [props.initialServiceType=''] - Initial value for the service type input
 * @param {boolean} [props.isLoading=false] - Whether the search is currently being processed
 * @param {string[]} [props.serviceTypes=[]] - List of available service types for dropdown
 *
 * @example
 * <SearchForm
 *   onSearch={(location, serviceType) => console.log(location, serviceType)}
 *   initialLocation="New York"
 *   serviceTypes={['Plumbing', 'Electrical', 'Carpentry']}
 * />
 */
export function SearchForm({
  onSearch,
  initialLocation = '',
  initialServiceType = '',
  isLoading = false,
  serviceTypes = [],
}) {
  const [location, setLocation] = useState(initialLocation);
  const [serviceType, setServiceType] = useState(initialServiceType);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(location, serviceType);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* Form implementation */}
    </form>
  );
}
```

### Example 2: API Endpoint Documentation

```javascript
/**
 * API endpoint for retrieving service providers.
 *
 * @route GET /api/providers
 * @query {string} location - City or zip code to search in
 * @query {string} [serviceType] - Type of service to filter by
 * @query {number} [radius=10] - Search radius in miles
 * @query {number} [limit=20] - Number of results to return
 * @query {number} [offset=0] - Number of results to skip
 * @query {string} [sort='rating'] - Sort by: 'rating', 'distance', or 'price'
 * @returns {Object} JSON response with providers array and metadata
 *
 * @example
 * // Request
 * GET /api/providers?location=New%20York&serviceType=Plumbing&radius=5
 *
 * // Response
 * {
 *   "providers": [
 *     {
 *       "id": "123",
 *       "businessName": "ABC Plumbing",
 *       "description": "Professional plumbing services",
 *       "rating": 4.8,
 *       "distance": 2.4
 *     },
 *     // More providers...
 *   ],
 *   "total": 42,
 *   "limit": 20,
 *   "offset": 0
 * }
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    location,
    serviceType,
    radius = 10,
    limit = 20,
    offset = 0,
    sort = 'rating',
  } = req.query;

  // Implementation
}
```

### Example 3: Utility Function Documentation

```javascript
/**
 * Calculates the distance between two geographic coordinates.
 *
 * @param {Object} point1 - First coordinate point
 * @param {number} point1.latitude - Latitude of the first point
 * @param {number} point1.longitude - Longitude of the first point
 * @param {Object} point2 - Second coordinate point
 * @param {number} point2.latitude - Latitude of the second point
 * @param {number} point2.longitude - Longitude of the second point
 * @param {string} [unit='miles'] - Unit of distance ('miles' or 'km')
 * @returns {number} Distance between the points in the specified unit
 *
 * @example
 * const distance = calculateDistance(
 *   { latitude: 40.7128, longitude: -74.0060 }, // New York
 *   { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
 *   'miles'
 * );
 * console.log(distance); // 2451.8
 */
export function calculateDistance(point1, point2, unit = 'miles') {
  // Implementation using Haversine formula
}
```

---

By following this documentation guide, you'll help maintain a well-documented codebase that is easier for all team members to understand and contribute to. Remember that good documentation is an ongoing process that requires regular updates and improvements.

## ⏭️ Next Steps

You've completed our [Official Documentation Path](../documentation-path.md)! You're now ready to start contributing to the project:

1. **Select your first task**
   - Go to the [Task Tracking System](../task-tracking.md)
   - Choose a task appropriate for your skill level
   - Update the task status to "In Progress"

2. **Start documenting your work**
   - Add an entry to the [Daily Log](../../handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md)
   - Document your progress as you work
   - Follow the documentation standards outlined in this guide

Congratulations! You've completed the onboarding documentation path and are now ready to start contributing to the project.

Refer to the [Documentation Path](../documentation-path.md) file if you need to revisit any part of the documentation.
