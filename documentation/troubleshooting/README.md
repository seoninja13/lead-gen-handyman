# Troubleshooting Guide

This guide provides solutions for common issues you might encounter while developing, testing, or deploying the Handyman Lead Generation Project.

## 📋 Table of Contents

- [Development Environment Issues](#development-environment-issues)
- [Next.js Issues](#nextjs-issues)
- [React Component Issues](#react-component-issues)
- [API and Data Fetching Issues](#api-and-data-fetching-issues)
- [Supabase Issues](#supabase-issues)
- [MCP Server Issues](#mcp-server-issues)
- [Styling and UI Issues](#styling-and-ui-issues)
- [Testing Issues](#testing-issues)
- [Deployment Issues](#deployment-issues)
- [Performance Issues](#performance-issues)
- [Getting Help](#getting-help)

## Development Environment Issues

### Port 3000 is already in use

**Symptoms:**
- Error message: `Error: listen EADDRINUSE: address already in use :::3000`
- The development server fails to start

**Solutions:**

1. **Find and kill the process using port 3000:**

   On Windows:
   ```bash
   # Find the process
   netstat -ano | findstr :3000
   
   # Kill the process (replace PID with the actual process ID)
   taskkill /PID <PID> /F
   ```

   On macOS/Linux:
   ```bash
   # Find the process
   lsof -i :3000
   
   # Kill the process (replace PID with the actual process ID)
   kill -9 <PID>
   ```

2. **Use a different port:**
   ```bash
   npm run dev -- -p 3001
   # or
   yarn dev -p 3001
   ```

### Node.js version issues

**Symptoms:**
- Error messages about unsupported syntax
- Unexpected behavior in development server

**Solutions:**

1. **Check your Node.js version:**
   ```bash
   node -v
   ```

2. **Install the recommended Node.js version (v18+):**
   
   Using nvm (Node Version Manager):
   ```bash
   nvm install 18
   nvm use 18
   ```

   Or download from [Node.js website](https://nodejs.org/)

3. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

### Package installation issues

**Symptoms:**
- Error messages during `npm install` or `yarn install`
- Missing dependencies errors

**Solutions:**

1. **Clear npm or yarn cache:**
   ```bash
   # For npm
   npm cache clean --force
   
   # For yarn
   yarn cache clean
   ```

2. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules
   rm package-lock.json # or yarn.lock
   npm install # or yarn install
   ```

3. **Check for conflicting dependencies:**
   ```bash
   npm ls <package-name>
   ```

4. **Try using a different package manager:**
   If npm is failing, try yarn or vice versa.

## Next.js Issues

### Pages not updating after changes

**Symptoms:**
- Changes to code are not reflected in the browser
- Development server is running but updates aren't showing

**Solutions:**

1. **Restart the development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Start it again
   npm run dev
   ```

2. **Clear browser cache:**
   - Use Ctrl+Shift+R or Cmd+Shift+R to hard refresh
   - Or clear browser cache through developer tools

3. **Check for syntax errors:**
   - Look for errors in the terminal or browser console
   - Fix any syntax errors that might be preventing updates

### Build errors

**Symptoms:**
- Error messages during `npm run build` or `yarn build`
- Build process fails to complete

**Solutions:**

1. **Check for TypeScript or ESLint errors:**
   ```bash
   npm run lint
   # or
   yarn lint
   ```

2. **Check for missing dependencies:**
   Make sure all required packages are in package.json and installed.

3. **Check for environment variables:**
   Ensure all required environment variables are set.

4. **Debug specific build errors:**
   Look for specific error messages and search for solutions online or in Next.js documentation.

### API routes not working

**Symptoms:**
- 404 errors when accessing API routes
- API routes return unexpected responses

**Solutions:**

1. **Check the API route file location:**
   Make sure it's in the correct location (`pages/api/`).

2. **Check for syntax errors in the API route:**
   Look for errors in the handler function.

3. **Verify the HTTP method:**
   Make sure you're using the correct HTTP method (GET, POST, etc.).

4. **Check request and response handling:**
   Ensure proper error handling and response formatting.

## React Component Issues

### Component rendering issues

**Symptoms:**
- Components not rendering as expected
- Missing elements or incorrect styling

**Solutions:**

1. **Check component props:**
   Make sure all required props are being passed correctly.

2. **Check conditional rendering logic:**
   Verify that conditional rendering expressions are correct.

3. **Check for React key warnings:**
   Ensure list items have unique keys.

4. **Use React Developer Tools:**
   Inspect component props and state using React Developer Tools browser extension.

### State management issues

**Symptoms:**
- State updates not reflecting in the UI
- Unexpected component behavior

**Solutions:**

1. **Check useState and useEffect usage:**
   Ensure you're using hooks correctly and following the rules of hooks.

2. **Verify state update logic:**
   Make sure you're updating state correctly, especially for objects and arrays.

3. **Check dependency arrays in useEffect:**
   Ensure all dependencies are properly listed.

4. **Debug with console.log:**
   Add console.log statements to track state changes.

```jsx
const [count, setCount] = useState(0);

// Debug state updates
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);
```

### Component performance issues

**Symptoms:**
- Slow rendering or interactions
- Excessive re-renders

**Solutions:**

1. **Use React.memo for pure components:**
   ```jsx
   const MyComponent = React.memo(function MyComponent(props) {
     // Component code
   });
   ```

2. **Use useMemo for expensive calculations:**
   ```jsx
   const expensiveResult = useMemo(() => {
     return expensiveCalculation(a, b);
   }, [a, b]);
   ```

3. **Use useCallback for event handlers:**
   ```jsx
   const handleClick = useCallback(() => {
     // Handler code
   }, [dependency]);
   ```

4. **Use the React Profiler:**
   Use the Profiler in React Developer Tools to identify performance bottlenecks.

## API and Data Fetching Issues

### API request failures

**Symptoms:**
- Network errors in the console
- Data not loading in components

**Solutions:**

1. **Check API endpoint URLs:**
   Ensure the URLs are correct and accessible.

2. **Verify authentication:**
   Check if authentication tokens or headers are required and correctly set.

3. **Check for CORS issues:**
   Look for CORS errors in the console and ensure the API allows requests from your domain.

4. **Implement proper error handling:**
   ```jsx
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
       // Handle error appropriately
       return null;
     }
   }
   ```

### Data not updating

**Symptoms:**
- Stale data displayed in the UI
- Updates not reflecting immediately

**Solutions:**

1. **Implement proper cache invalidation:**
   Update cache or refetch data after mutations.

2. **Use SWR or React Query for data fetching:**
   These libraries provide automatic revalidation and caching.

   ```jsx
   import useSWR from 'swr';

   function Profile() {
     const { data, error, mutate } = useSWR('/api/user', fetcher);

     if (error) return <div>Error loading user</div>;
     if (!data) return <div>Loading...</div>;

     return (
       <div>
         <h1>{data.name}</h1>
         <button onClick={() => mutate()}>Refresh</button>
       </div>
     );
   }
   ```

3. **Check for race conditions:**
   Ensure that responses are handled in the correct order, especially for multiple requests.

## Supabase Issues

### Connection issues

**Symptoms:**
- Error messages about connection failures
- Unable to fetch or update data

**Solutions:**

1. **Check Supabase URL and API key:**
   Verify that the URL and API key in your environment variables are correct.

2. **Check Supabase service status:**
   Visit the Supabase status page to check if there are any ongoing issues.

3. **Test the connection:**
   Use the `/test/supabase` page to test the connection.

4. **Check for network restrictions:**
   Ensure your network allows connections to Supabase.

### Query errors

**Symptoms:**
- Error messages when executing queries
- Unexpected query results

**Solutions:**

1. **Check SQL syntax:**
   Verify that your SQL queries are correctly formatted.

2. **Use double quotes for table names with hyphens:**
   ```sql
   SELECT * FROM "test-delete" WHERE id = '123';
   ```

3. **Check table and column names:**
   Ensure that table and column names are correct and exist in the database.

4. **Use parameterized queries:**
   Use parameterized queries to prevent SQL injection and handle data types correctly.

   ```javascript
   const { data, error } = await supabase
     .from('users')
     .select('*')
     .eq('id', userId);
   ```

### Authentication issues

**Symptoms:**
- Unable to sign in or sign up
- Authentication errors

**Solutions:**

1. **Check authentication configuration:**
   Verify that authentication is properly configured in the Supabase dashboard.

2. **Check email confirmation settings:**
   If email confirmation is required, ensure it's properly set up.

3. **Check for password requirements:**
   Ensure passwords meet the minimum requirements.

4. **Implement proper error handling:**
   ```javascript
   const { user, error } = await supabase.auth.signIn({
     email,
     password,
   });

   if (error) {
     console.error('Authentication error:', error.message);
     // Handle error appropriately
   }
   ```

## MCP Server Issues

### MCP servers not starting

**Symptoms:**
- Error messages when starting MCP servers
- MCP functionality not working

**Solutions:**

1. **Check if the MCP servers are running:**
   Look for terminal windows or processes running the MCP servers.

2. **Start the MCP servers manually:**
   ```bash
   # Start all MCP servers
   ./start-all-mcp-servers.bat

   # Or start individual servers
   ./start-perplexity-mcp.bat
   ./start-google-maps-mcp.bat
   ./start-supabase-mcp.bat
   ```

3. **Check for port conflicts:**
   Ensure that the ports used by the MCP servers are not in use by other applications.

4. **Check API keys:**
   Verify that the API keys for the MCP services are correctly set in your environment variables.

### Google Maps integration issues

**Symptoms:**
- Maps not displaying
- Location services not working

**Solutions:**

1. **Check Google Maps API key:**
   Verify that the API key is correctly set and has the necessary permissions.

2. **Check for JavaScript errors:**
   Look for errors in the browser console related to Google Maps.

3. **Verify the Google Maps MCP server is running:**
   Restart the server if necessary.

4. **Check for billing issues:**
   Ensure that the Google Maps API key is associated with a billing account if required.

### Perplexity or Gemini integration issues

**Symptoms:**
- AI-enhanced content not generating
- Error messages related to AI services

**Solutions:**

1. **Check API keys:**
   Verify that the API keys for Perplexity or Gemini are correctly set.

2. **Check for rate limiting:**
   AI services often have rate limits. Check if you've exceeded them.

3. **Verify the MCP servers are running:**
   Restart the servers if necessary.

4. **Implement fallback mechanisms:**
   Have fallback content or services in case the primary AI service is unavailable.

## Styling and UI Issues

### CSS not applying correctly

**Symptoms:**
- Styles not appearing as expected
- Layout issues

**Solutions:**

1. **Check class names:**
   Ensure that class names in your components match those in your CSS files.

2. **Check for CSS specificity issues:**
   More specific selectors can override less specific ones.

3. **Check for CSS ordering:**
   Later styles can override earlier ones.

4. **Use browser developer tools:**
   Inspect elements to see which styles are being applied and which are being overridden.

### Responsive design issues

**Symptoms:**
- Layout breaks on certain screen sizes
- Elements overflow or misalign on mobile

**Solutions:**

1. **Use responsive design utilities:**
   Utilize Tailwind's responsive prefixes (sm:, md:, lg:, etc.).

2. **Test on multiple devices:**
   Use browser developer tools to simulate different screen sizes.

3. **Implement mobile-first design:**
   Start with mobile layouts and add complexity for larger screens.

4. **Check for fixed widths:**
   Replace fixed widths with percentage-based or responsive units.

### UI inconsistencies

**Symptoms:**
- Different styling between similar components
- Inconsistent spacing or alignment

**Solutions:**

1. **Use design tokens:**
   Define and use consistent spacing, colors, and typography.

2. **Create reusable components:**
   Extract common UI patterns into reusable components.

3. **Use a component library:**
   Consider using a UI component library for consistent design.

4. **Implement a design system:**
   Document and enforce design guidelines across the application.

## Testing Issues

### Tests failing

**Symptoms:**
- Test failures in the console
- CI/CD pipeline failures

**Solutions:**

1. **Check for recent code changes:**
   Review recent changes that might have broken tests.

2. **Run tests in watch mode:**
   ```bash
   npm test -- --watch
   ```

3. **Debug with console.log:**
   Add console.log statements to understand what's happening during tests.

4. **Check for environment-specific issues:**
   Ensure tests are not dependent on specific environments.

### Test coverage issues

**Symptoms:**
- Low test coverage
- Critical code paths not tested

**Solutions:**

1. **Generate a coverage report:**
   ```bash
   npm test -- --coverage
   ```

2. **Identify untested code:**
   Review the coverage report to find untested code.

3. **Write additional tests:**
   Focus on critical business logic and edge cases.

4. **Set up coverage thresholds:**
   Configure Jest to fail if coverage drops below certain thresholds.

### Flaky tests

**Symptoms:**
- Tests that sometimes pass and sometimes fail
- Inconsistent test results

**Solutions:**

1. **Identify flaky tests:**
   Run tests multiple times to identify inconsistent ones.

2. **Check for race conditions:**
   Look for asynchronous code that might cause race conditions.

3. **Add proper waiting and assertions:**
   Ensure tests wait for operations to complete before making assertions.

4. **Isolate tests:**
   Make sure tests don't depend on each other or shared state.

## Deployment Issues

### Build failures during deployment

**Symptoms:**
- Deployment process fails during the build step
- Error messages in deployment logs

**Solutions:**

1. **Check build logs:**
   Review the build logs for specific error messages.

2. **Verify that the build works locally:**
   ```bash
   npm run build
   ```

3. **Check for environment variables:**
   Ensure all required environment variables are set in the deployment environment.

4. **Check for dependency issues:**
   Ensure all dependencies are correctly specified in package.json.

### Post-deployment issues

**Symptoms:**
- Application doesn't work correctly after deployment
- Features working locally but not in production

**Solutions:**

1. **Check for environment differences:**
   Verify that the production environment is correctly configured.

2. **Check for API URL issues:**
   Ensure API URLs are correctly set for the production environment.

3. **Check for browser compatibility issues:**
   Test the application in different browsers.

4. **Implement proper error logging:**
   Use tools like Sentry to capture and report errors in production.

### Rollback issues

**Symptoms:**
- Unable to roll back to a previous version
- Rollback doesn't resolve the issue

**Solutions:**

1. **Identify the last stable version:**
   Review deployment history to find the last known good version.

2. **Use Netlify's rollback feature:**
   Use the Netlify dashboard to roll back to a previous deploy.

3. **Create a rollback branch:**
   Create a new branch from the last stable commit and deploy it.

4. **Implement a blue-green deployment strategy:**
   Maintain two production environments to facilitate quick rollbacks.

## Performance Issues

### Slow page loads

**Symptoms:**
- Pages take a long time to load
- Poor Lighthouse performance scores

**Solutions:**

1. **Optimize images:**
   Use Next.js Image component and proper image formats.

2. **Implement code splitting:**
   Use dynamic imports to split code into smaller chunks.

   ```jsx
   import dynamic from 'next/dynamic';

   const DynamicComponent = dynamic(() => import('../components/HeavyComponent'));
   ```

3. **Minimize JavaScript:**
   Reduce bundle size by removing unused dependencies.

4. **Implement caching:**
   Use caching headers for static assets.

### Runtime performance issues

**Symptoms:**
- UI feels sluggish or unresponsive
- High CPU usage

**Solutions:**

1. **Optimize rendering:**
   Reduce unnecessary re-renders using React.memo, useMemo, and useCallback.

2. **Implement virtualization for long lists:**
   Use libraries like react-window or react-virtualized for long lists.

3. **Debounce or throttle expensive operations:**
   ```jsx
   import { debounce } from 'lodash';

   const debouncedHandleSearch = debounce((value) => {
     // Expensive search operation
     performSearch(value);
   }, 300);
   ```

4. **Use the React Profiler:**
   Identify and optimize components that render too often or take too long to render.

### Network performance issues

**Symptoms:**
- Slow API responses
- Multiple or redundant network requests

**Solutions:**

1. **Implement data caching:**
   Cache API responses to reduce network requests.

2. **Use SWR or React Query:**
   These libraries provide efficient data fetching with caching.

3. **Optimize API responses:**
   Return only the data that's needed by the client.

4. **Implement pagination or infinite scrolling:**
   Load data in smaller chunks as needed.

## Getting Help

If you're still experiencing issues after trying the solutions in this guide:

1. **Check the documentation:**
   Review the project documentation for specific guidance.

2. **Search for similar issues:**
   Check if others have encountered and solved similar problems.

3. **Ask for help:**
   Reach out to the development team or post in the project's communication channels.

4. **Provide detailed information:**
   When asking for help, include:
   - Detailed description of the issue
   - Steps to reproduce
   - Error messages
   - Environment information (browser, OS, Node.js version, etc.)
   - Code snippets or screenshots

---

This troubleshooting guide covers common issues you might encounter while working on the Handyman Lead Generation Project. If you encounter an issue not covered here, please contribute to this guide by adding the issue and its solution.
