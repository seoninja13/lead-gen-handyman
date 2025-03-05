# Handyman Lead Generation - Issues Tracker

This document tracks known issues in the Handyman Lead Generation application.

## Active Issues

| ID | Issue | Component | Priority | Status | Created | Updated |
|----|-------|-----------|----------|--------|---------|---------|
| 001 | Bootstrap import causing 404 errors | CSS | High | ✅ RESOLVED | 2025-03-04 | 2025-03-04 |
| 002 | Next.js Image components causing 400 errors | Images | High | ✅ RESOLVED | 2025-03-04 | 2025-03-04 |
| 003 | Missing image directories for city and service images | Assets | Medium | ✅ RESOLVED | 2025-03-04 | 2025-03-04 |
| 004 | Search functionality not connected to backend | Search | Medium | 🔄 IN PROGRESS | 2025-03-04 | - |
| 005 | Mobile responsiveness needs improvement | UI | Medium | 🔄 IN PROGRESS | 2025-03-04 | - |
| 006 | Google Places API integration not implemented | Integration | Medium | 🔄 IN PROGRESS | 2025-03-04 | - |
| 007 | Unit tests implementation | Testing | Medium | 🔄 IN PROGRESS | 2025-03-04 | 2025-03-04 |

## Resolved Issues

### 001: Bootstrap import causing 404 errors
- **Description**: The Bootstrap SCSS import in main.scss was using tilde syntax which was causing 404 errors.
- **Root Cause**: The tilde syntax (~bootstrap) is not properly resolved in the Next.js context.
- **Solution**: Removed the tilde syntax and updated the webpack configuration in next.config.js to properly resolve the path.
- **Verification**: No more 404 errors for Bootstrap in the browser console.
- **Resolved By**: [Developer] on 2025-03-04

### 002: Next.js Image components causing 400 errors
- **Description**: Using Next.js Image components was causing 400 Bad Request errors.
- **Root Cause**: The Next.js image configuration was not properly set up to handle the template's image paths.
- **Solution**: Replaced Next.js Image components with standard HTML img tags and updated next.config.js to allow unoptimized images.
- **Verification**: No more 400 errors for images in the browser console.
- **Resolved By**: [Developer] on 2025-03-04

### 003: Missing image directories for city and service images
- **Description**: The application was looking for images in directories that didn't exist.
- **Root Cause**: The template structure expected certain directories that weren't created.
- **Solution**: Created the missing directories and added placeholder images.
- **Verification**: Images now load correctly in the city and service sections.
- **Resolved By**: [Developer] on 2025-03-04

### 007: Unit tests implementation
- **Description**: The application needs comprehensive unit tests to ensure components render correctly and functionality works as expected.
- **Root Cause**: Unit tests were not initially prioritized during development.
- **Solution**: Implement Jest and React Testing Library tests for all components, starting with the most critical ones.
- **Verification**: Run tests with `yarn test` and ensure all tests pass with good coverage.
- **Status**: Initial setup complete, two component tests created (Blogs.test.jsx and Partners.test.jsx). More tests needed.

## Issue Template

When adding a new issue, use the following template:

```
### [ID]: [Brief Title]
- **Description**: [Detailed description of the issue]
- **Root Cause**: [What caused this issue]
- **Solution**: [How the issue was fixed or plan to fix]
- **Verification**: [How to verify the fix]
- **Resolved By**: [Developer name] on [Date]
