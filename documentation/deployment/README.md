# Deployment Guide

This document outlines the deployment process for the Handyman Lead Generation Project, including environment setup, build procedures, and deployment strategies.

## 📋 Table of Contents

- [Deployment Overview](#deployment-overview)
- [Environment Setup](#environment-setup)
- [Build Process](#build-process)
- [Deployment Environments](#deployment-environments)
- [Deployment Procedures](#deployment-procedures)
- [Continuous Integration/Continuous Deployment](#continuous-integrationcontinuous-deployment)
- [Rollback Procedures](#rollback-procedures)
- [Monitoring and Logging](#monitoring-and-logging)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Deployment Overview

The Handyman Lead Generation Project is deployed using a modern CI/CD pipeline with the following components:

- **Version Control**: GitHub
- **CI/CD Platform**: GitHub Actions
- **Hosting Platform**: Netlify
- **Database**: Supabase
- **Environment Variables**: Managed through Netlify and GitHub Secrets
- **Domain Management**: Managed through Netlify

The deployment process follows these high-level steps:

1. Code is pushed to GitHub
2. GitHub Actions runs tests and builds the application
3. If tests pass, the application is deployed to the appropriate environment
4. Post-deployment tests verify the deployment

## Environment Setup

### Environment Variables

The application requires the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
NEXT_PUBLIC_SITE_URL=your_site_url
```

These variables should be set in:

1. `.env.local` for local development
2. Netlify environment variables for deployment
3. GitHub Secrets for CI/CD

### Environment Configuration Files

The application uses different configuration files for different environments:

- `.env.development` - Development environment
- `.env.test` - Testing environment
- `.env.production` - Production environment

Example `.env.production`:

```
NEXT_PUBLIC_API_URL=https://api.handymanleadgen.com
NEXT_PUBLIC_SITE_URL=https://handymanleadgen.com
NODE_ENV=production
```

## Build Process

### Prerequisites

- Node.js (v18+)
- npm (v8+) or yarn (v1.22+)
- Access to Supabase project
- Access to Netlify project

### Building the Application

To build the application for production:

```bash
# Navigate to the application directory
cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices

# Install dependencies
npm install
# or
yarn install

# Build the application
npm run build
# or
yarn build
```

The build output will be in the `.next` directory.

### Build Optimization

The build process includes several optimizations:

1. **Code Splitting**: Next.js automatically splits code into smaller chunks
2. **Image Optimization**: Next.js Image component optimizes images
3. **CSS Minification**: CSS is minified during the build process
4. **JavaScript Minification**: JavaScript is minified and tree-shaken
5. **Static Generation**: Pages are pre-rendered at build time where possible

## Deployment Environments

We maintain three deployment environments:

### Development Environment

- **URL**: https://dev.handymanleadgen.com
- **Purpose**: Testing new features and changes
- **Deployment Trigger**: Push to `develop` branch
- **Database**: Development Supabase instance

### Staging Environment

- **URL**: https://staging.handymanleadgen.com
- **Purpose**: Pre-production testing and validation
- **Deployment Trigger**: Push to `staging` branch
- **Database**: Staging Supabase instance

### Production Environment

- **URL**: https://handymanleadgen.com
- **Purpose**: Live application for end users
- **Deployment Trigger**: Push to `main` branch or manual promotion from staging
- **Database**: Production Supabase instance

## Deployment Procedures

### Manual Deployment

To deploy the application manually:

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Export the static site (if using static export):
   ```bash
   npm run export
   # or
   yarn export
   ```

3. Deploy to Netlify using the Netlify CLI:
   ```bash
   netlify deploy --prod
   ```

### Automated Deployment via GitHub

1. Push your changes to the appropriate branch:
   ```bash
   git push origin develop  # For development environment
   git push origin staging  # For staging environment
   git push origin main     # For production environment
   ```

2. GitHub Actions will automatically:
   - Run tests
   - Build the application
   - Deploy to the appropriate Netlify environment

### Deployment Workflow

The deployment workflow follows these steps:

1. **Pre-deployment Checks**:
   - Linting
   - Unit tests
   - Integration tests
   - Build verification

2. **Deployment**:
   - Build the application
   - Upload build artifacts to Netlify
   - Configure environment variables
   - Update DNS if needed

3. **Post-deployment Verification**:
   - Smoke tests
   - Accessibility tests
   - Performance tests

## Continuous Integration/Continuous Deployment

We use GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/main.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ develop, staging, main ]
  pull_request:
    branches: [ develop, staging, main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - name: Install dependencies
        run: |
          cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
          npm ci
      - name: Run linting
        run: |
          cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
          npm run lint
      - name: Run tests
        run: |
          cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
          npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18.x'
      - name: Install dependencies
        run: |
          cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
          npm ci
      - name: Build
        run: |
          cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
          npm run build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/.next

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push'
    steps:
      - uses: actions/checkout@v3
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-output
          path: handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/.next
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --dir=handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/.next --prod
```

## Rollback Procedures

In case of deployment issues, we have the following rollback procedures:

### Immediate Rollback via Netlify

1. Go to the Netlify dashboard
2. Navigate to the "Deploys" section
3. Find the last successful deploy
4. Click "Publish deploy" to roll back to that version

### Rollback via Git

1. Identify the last stable commit:
   ```bash
   git log --oneline
   ```

2. Create a new branch from that commit:
   ```bash
   git checkout -b rollback-branch <commit-hash>
   ```

3. Push the branch and create a pull request:
   ```bash
   git push origin rollback-branch
   ```

4. Merge the pull request to trigger a new deployment

## Monitoring and Logging

### Application Monitoring

We use the following tools for monitoring:

- **Netlify Analytics**: For traffic and performance monitoring
- **Sentry**: For error tracking and monitoring
- **Google Analytics**: For user behavior tracking

### Log Management

Logs are collected and managed through:

- **Netlify Functions Logs**: For serverless function logs
- **Supabase Logs**: For database logs
- **Sentry**: For error logs

### Alerts

We have set up alerts for:

- Deployment failures
- Error rate spikes
- Performance degradation
- Security issues

## Performance Optimization

### CDN Configuration

The application uses Netlify's global CDN for content delivery, with the following configuration:

- **Cache Control Headers**: Set appropriate cache headers for static assets
- **Edge Caching**: Enable edge caching for improved performance
- **Compression**: Enable Brotli and Gzip compression

### Performance Monitoring

We monitor performance using:

- **Lighthouse**: For overall performance scoring
- **Web Vitals**: For core web vitals monitoring
- **Netlify Analytics**: For real-user performance data

## Security Considerations

### SSL/TLS Configuration

All environments use SSL/TLS encryption with:

- TLS 1.3 support
- Automatic certificate renewal
- HSTS headers

### Security Headers

The application includes the following security headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.googleapis.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(self)
```

### Environment Variable Security

- Production secrets are never stored in the repository
- Different API keys are used for different environments
- Least privilege principle is applied to all API keys

## Troubleshooting

### Common Deployment Issues

#### Build Failures

If the build fails:

1. Check the build logs for errors
2. Verify that all dependencies are installed
3. Check for environment variable issues
4. Ensure that the build command is correct

#### Runtime Errors

If the application has runtime errors:

1. Check the browser console for errors
2. Check Sentry for error reports
3. Verify that all environment variables are set correctly
4. Check for API or database connectivity issues

#### Performance Issues

If the application is slow:

1. Run Lighthouse to identify performance bottlenecks
2. Check for large bundle sizes
3. Verify that images are optimized
4. Check for slow API responses

### Support Resources

- **Netlify Support**: https://www.netlify.com/support/
- **Supabase Support**: https://supabase.io/support
- **Next.js Documentation**: https://nextjs.org/docs
- **Internal Documentation**: See the [Troubleshooting Guide](../troubleshooting/README.md)

---

This deployment guide provides a comprehensive overview of the deployment process for the Handyman Lead Generation Project. By following these procedures, we ensure consistent, reliable, and secure deployments across all environments.
