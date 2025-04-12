# Handyman Services Website

Welcome to the Handyman Services website project! This README provides essential information for new developers to get started with the project.

## Project Overview

This project is a handyman services website built with Next.js, React, and Supabase. It's based on the FindHouse real estate template, which has been adapted for handyman services.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `pages/`: Next.js pages and API routes
- `components/`: React components
- `data/`: Static data files
- `features/`: Redux-related files
- `public/`: Static assets
- `services/`: Service layer for API calls
- `store/`: Redux store configuration
- `styles/`: CSS and styling files
- `utils/`: Utility functions
- `MCP-Servers/`: Model Context Protocol servers

## Key Features

- Home page with search functionality
- Service listings and details
- City-based service search
- Business profiles
- Testimonials and reviews
- Contact forms
- Supabase integration for database operations

## Documentation

For more detailed information about the project, refer to the following documentation:

- [Project Documentation](../../documentation/handyman-v2-documentation.md): Central hub for all project information
- [Home Page Implementation](../../documentation/home-page-implementation.md): Details about the home page implementation
- [New Design Implementation](../../documentation/new-design-implementation.md): Information about the new home page design
- [Daily Log](./daily-log.md): Daily development activities and progress

## Development Workflow

1. **Pick a task**: Choose a task from the project requirements or task list
2. **Create a branch**: Create a new branch for your feature or bug fix
3. **Implement changes**: Make your changes following the project's coding standards
4. **Test your changes**: Ensure your changes work as expected
5. **Document your changes**: Update the documentation and daily log
6. **Submit a pull request**: Create a pull request for review

## Testing

### Supabase Testing

To test Supabase CRUD operations:

1. Navigate to [http://localhost:3000/test/supabase](http://localhost:3000/test/supabase)
2. Use the test interface to execute SQL queries against the test-delete table
3. Verify that all operations (SELECT, INSERT, UPDATE, DELETE) work correctly

## Deployment

The project is configured for deployment on Netlify. The deployment process is automated through GitHub integration.

## Troubleshooting

### Common Issues

1. **Port 3000 is already in use**
   - The development server will automatically try to use port 3001 if 3000 is occupied
   - You can manually specify a port: `npm run dev -- -p 3002`

2. **Supabase connection issues**
   - Verify your Supabase URL and API key in the `.env` file
   - Check the Supabase dashboard to ensure your database is running

3. **Next.js build errors**
   - Run `npm run build` to identify build issues
   - Check for missing dependencies or syntax errors

## Contributing

1. Follow the project's coding standards
2. Document your changes in the daily log
3. Update the documentation as needed
4. Test your changes thoroughly before submitting

## Contact

For questions or assistance, please contact the project maintainer.

---

Happy coding!
