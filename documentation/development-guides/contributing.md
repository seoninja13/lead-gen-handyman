# Contributing Guide

Thank you for your interest in contributing to the Handyman Lead Generation Project! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing Guidelines](#testing-guidelines)
- [Documentation Guidelines](#documentation-guidelines)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

Before you begin contributing, please:

1. Ensure you have read the [README.md](../../README.md) file
2. Review the [ONBOARDING.md](../ONBOARDING.md) guide
3. Check the [project-requirements.md](../project-requirements.md) to understand the project goals
4. Set up your development environment as described in the [Getting Started Guide](../getting-started/README.md)

## Development Workflow

We follow a feature branch workflow:

1. **Fork the repository** (if you're an external contributor)
2. **Create a branch** from the `main` branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```
3. **Make your changes** following the coding standards
4. **Write or update tests** as necessary
5. **Update documentation** to reflect your changes
6. **Commit your changes** following the commit message guidelines
7. **Push your branch** to your fork or the main repository
8. **Create a pull request** to the `main` branch

## Pull Request Process

1. **Fill out the pull request template** with all required information
2. **Link any related issues** using GitHub keywords (e.g., "Fixes #123")
3. **Ensure all tests pass** and code quality checks succeed
4. **Request a review** from at least one maintainer
5. **Address any feedback** from reviewers
6. **Update the documentation** if necessary
7. **Wait for approval** before merging

Pull requests will be merged by a maintainer after approval.

## Coding Standards

We follow these coding standards:

### JavaScript/TypeScript

- Use ES6+ features
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use functional components with hooks for React
- Use TypeScript types/interfaces for props and state
- Use async/await for asynchronous operations

### CSS/Styling

- Use TailwindCSS for styling
- Follow the utility-first approach
- Use custom CSS only when necessary
- Follow the BEM naming convention for custom CSS classes

### File Organization

- Group files by feature or module
- Use consistent naming conventions
- Keep components focused and small
- Separate business logic from UI components

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools

Examples:
```
feat(search): add location-based filtering
fix(auth): resolve login redirect issue
docs(api): update provider endpoint documentation
```

## Testing Guidelines

- Write tests for all new features and bug fixes
- Maintain or improve test coverage
- Follow the testing patterns established in the project
- Test both success and failure cases
- Mock external dependencies

### Types of Tests

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user flows

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Documentation Guidelines

- Update documentation for any changes to APIs, components, or workflows
- Follow the established documentation templates
- Use clear, concise language
- Include code examples where appropriate
- Keep documentation up-to-date with code changes

### Documentation Templates

- [Component Documentation Template](./component-template.md)
- [API Endpoint Documentation Template](../api/api-endpoint-template.md)

## Issue Reporting

When reporting issues, please use the appropriate issue template and include:

1. **Issue Type**: Bug, feature request, documentation, etc.
2. **Description**: Clear description of the issue or request
3. **Steps to Reproduce**: For bugs, detailed steps to reproduce
4. **Expected Behavior**: What you expected to happen
5. **Actual Behavior**: What actually happened
6. **Screenshots**: If applicable
7. **Environment**: Browser, OS, device, etc.
8. **Additional Context**: Any other relevant information

---

Thank you for contributing to the Handyman Lead Generation Project! Your efforts help make this project better for everyone.
