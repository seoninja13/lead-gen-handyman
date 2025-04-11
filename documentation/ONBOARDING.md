# Developer Onboarding Guide

**This is the official entry point for all project documentation.**

Welcome to the Handyman Lead Generation Project! This guide will help you get up to speed and start contributing to the project as quickly as possible. Follow this guide step-by-step to ensure you have a complete understanding of the project and development process.

## 📋 Table of Contents

- [First Day Setup](#first-day-setup)
- [Project Overview](#project-overview)
- [Development Environment](#development-environment)
- [Codebase Navigation](#codebase-navigation)
- [Development Workflow](#development-workflow)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

## First Day Setup

Follow these steps to set up your development environment and get familiar with the project:

### 1. Access and Permissions

- [ ] Receive GitHub repository access
- [ ] Get access to the Supabase project
- [ ] Obtain necessary API keys for MCP servers
- [ ] Join the project communication channels

### 2. Environment Setup

- [ ] Clone the repository:
  ```bash
  git clone https://github.com/yourusername/lead-gen-handyman.git
  cd lead-gen-handyman
  ```

- [ ] Set up environment variables:
  - Create a `.env.local` file in the `handyman-v2/Envato-template-files/WorkDirectory/HandymanServices` directory
  - Add the following variables (get actual values from a team member):
    ```
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    PERPLEXITY_API_KEY=your_perplexity_api_key
    ```

- [ ] Install dependencies:
  ```bash
  cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
  npm install
  # or
  yarn install
  ```

### 3. Start the Application

- [ ] Start the MCP servers:
  ```bash
  # Start all MCP servers at once
  ./start-all-mcp-servers.bat

  # Or start individual servers
  ./start-perplexity-mcp.bat
  ./start-google-maps-mcp.bat
  ./start-supabase-mcp.bat
  ```

- [ ] Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```

- [ ] Access the application at [http://localhost:3000](http://localhost:3000)

### 4. Verify Setup

- [ ] Navigate through the application to ensure it's working correctly
- [ ] Test the Supabase connection at [http://localhost:3000/test/supabase](http://localhost:3000/test/supabase)
- [ ] Check that the Google Maps integration is working on the search page
- [ ] Verify that the Perplexity or Gemini integration is working for content enrichment

## Project Overview

The Handyman Lead Generation Project is a web application designed to connect homeowners with local handyman services. The platform allows users to:

- Search for handyman services by location and service type
- View detailed profiles of service providers
- Read reviews and ratings
- Request quotes and book services

### Key Features

- **Location-based search**: Find services near you using Google Maps integration
- **Service categories**: Browse services by category (plumbing, electrical, etc.)
- **Provider profiles**: Detailed information about service providers
- **Reviews and ratings**: User feedback on service quality
- **Booking system**: Request and schedule services
- **AI-enhanced content**: Service descriptions enriched by AI

### Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Netlify
- **AI Integration**: Google Gemini, Perplexity API

## Development Environment

### Project Structure

```
lead-gen-handyman/
├── handyman-v1/           # Original version (reference only)
├── handyman-v2/           # Current version
│   ├── Envato-template-files/
│   │   ├── WorkDirectory/
│   │   │   └── HandymanServices/  # Main application
│   │   │       ├── components/    # React components
│   │   │       ├── pages/         # Next.js pages and API routes
│   │   │       ├── public/        # Static assets
│   │   │       ├── styles/        # CSS and styling
│   │   │       ├── utils/         # Utility functions
│   │   │       └── MCP-Servers/   # Model Context Protocol servers
│   │   └── Original template files-do-not-edit/
│   └── documentation/     # Project documentation
├── documentation/         # Central documentation hub
└── README.md             # Project overview
```

### Key Directories

- **components/**: React components organized by feature
- **pages/**: Next.js pages and API routes
- **public/**: Static assets like images and fonts
- **styles/**: CSS and styling files
- **utils/**: Utility functions and helpers
- **MCP-Servers/**: Model Context Protocol servers for third-party integrations

### Development Tools

- **VS Code**: Recommended IDE with the following extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - GitHub Copilot (optional)

- **Chrome DevTools**: For debugging and performance monitoring

- **Supabase Dashboard**: For database management and monitoring

## Codebase Navigation

### Key Files

- **pages/index.js**: Home page
- **pages/_app.js**: Next.js application wrapper
- **pages/api/**: API routes
- **components/layout/Layout.js**: Main layout component
- **utils/supabaseClient.js**: Supabase client initialization
- **styles/globals.css**: Global styles

### Component Organization

Components are organized following atomic design principles:

- **atoms/**: Basic UI elements (buttons, inputs)
- **molecules/**: Groups of atoms (form fields, cards)
- **organisms/**: Complex UI sections (headers, search forms)
- **templates/**: Page layouts
- **pages/**: Complete pages

## Development Workflow

### Daily Development Log

We maintain a daily development log to track progress, document issues, and share knowledge among team members.

- **Location**: `handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md`
- **Purpose**: Document daily progress, issues, and next steps
- **When to update**: At the start of your day, when completing tasks, when encountering issues, and at the end of your day
- **Format**: Follow the format described in the [Documentation Guide](./development-guides/documentation-guide.md#daily-development-log)

Updating the daily log is an essential part of our development process. It helps team members stay informed about project progress and serves as a valuable reference for troubleshooting and knowledge sharing.

### Git Workflow

1. **Create a branch**: Create a new branch for your feature or bug fix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**: Implement your changes following the coding standards

3. **Commit changes**: Commit your changes with descriptive messages
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

4. **Push changes**: Push your branch to the remote repository
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a pull request**: Open a pull request on GitHub for review

### Coding Standards

- Follow the ESLint and Prettier configurations
- Use functional components with hooks
- Follow the component documentation template for new components
- Write unit tests for new components and functions
- Use TypeScript types/interfaces for props and state

### Testing

- Run tests with:
  ```bash
  npm test
  # or
  yarn test
  ```

- Test files should be located next to the files they test with a `.test.js` extension

## Common Tasks

### Adding a New Page

1. Create a new file in the `pages/` directory
2. Import necessary components and hooks
3. Create and export a page component
4. Add the page to navigation if needed

Example:
```jsx
// pages/services.js
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ServiceList from '../components/services/ServiceList';
import { getServices } from '../utils/api';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    }
    fetchServices();
  }, []);

  return (
    <Layout title="Services">
      <h1>Our Services</h1>
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <ServiceList services={services} />
      )}
    </Layout>
  );
}
```

### Adding a New Component

1. Create a new file in the appropriate `components/` subdirectory
2. Import necessary dependencies
3. Create and export the component
4. Document the component using the component template

Example:
```jsx
// components/ui/Button.js
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Button({
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

### Working with Supabase

1. Import the Supabase client
2. Use SQL queries for database operations
3. Handle errors appropriately

Example:
```javascript
// utils/providers.js
import { supabase } from './supabaseClient';

export async function getProviders(location, serviceType) {
  try {
    const { data, error } = await supabase.rpc('search_providers', {
      p_location: location,
      p_service_type: serviceType
    });

    if (error) {
      console.error('Error fetching providers:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }
}
```

### Adding a New API Route

1. Create a new file in the `pages/api/` directory
2. Import necessary dependencies
3. Export a handler function

Example:
```javascript
// pages/api/services.js
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name');

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
```

## Troubleshooting

### Common Issues

#### Port 3000 is already in use

If port 3000 is already in use, you can:

1. Kill the process using port 3000:
   ```bash
   # On Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # On macOS/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

2. Or specify a different port:
   ```bash
   npm run dev -- -p 3001
   # or
   yarn dev -p 3001
   ```

#### Supabase Connection Issues

If you're having trouble connecting to Supabase:

1. Verify your environment variables are correct
2. Check if the Supabase project is active
3. Test the connection using the `/test/supabase` page

#### MCP Server Issues

If MCP servers aren't working:

1. Check if the servers are running (look for terminal windows)
2. Verify API keys in your `.env.local` file
3. Check the logs in the `logs/` directory

### Getting Help

If you're stuck or have questions:

1. Check the documentation in the `documentation/` directory
2. Ask in the project communication channels
3. Reach out to the project lead or senior developers

## Resources

### Documentation Path

Follow our [Official Documentation Path](./documentation-path.md) in order:

1. **Complete this Onboarding Guide first**
2. **Project Understanding**
   - [Project Requirements](./project-requirements.md)
   - [Architecture Overview](./architecture/README.md)
3. **Development Process**
   - [Task Tracking System](./task-tracking.md)
   - [Documentation Guide](./development-guides/documentation-guide.md)
4. **Begin Contributing**
   - Select your first task
   - Start working and documenting

The complete documentation path is defined in the [Documentation Path](./documentation-path.md) file. This ensures you follow the correct sequence of documentation.

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Project Management

- [GitHub Repository](https://github.com/yourusername/lead-gen-handyman)
- [Issue Tracker](https://github.com/yourusername/lead-gen-handyman/issues)
- [Project Board](https://github.com/yourusername/lead-gen-handyman/projects)

---

## Next Steps for New Developers

### Day 1: Getting Started

1. **Complete the Environment Setup**
   - Follow the [Getting Started Guide](./getting-started/README.md)
   - Verify that you can run the application locally
   - Test the Supabase connection at http://localhost:3000/test/supabase

2. **Review Key Documentation**
   - Read the [Project Requirements](./project-requirements.md)
   - Review the [Architecture Overview](./architecture/README.md)
   - Familiarize yourself with the [Documentation Guide](./development-guides/documentation-guide.md)

3. **Start Your Daily Log**
   - Add your first entry to the daily log
   - Document your setup process and any issues encountered
   - Note your plans for the next day

### First Week Plan

#### Day 1: Orientation
- Set up your development environment
- Explore the codebase and documentation
- Start your daily log
- Join the project communication channels

#### Day 2: Basic Contribution
- Make a small change to an existing component
- Run tests to ensure your change doesn't break anything
- Submit your first pull request
- Update the daily log with your progress

#### Day 3: Component Development
- Add a new component or modify an existing one
- Document your component following the [Component Documentation Template](./development-guides/component-template.md)
- Update the daily log with your progress

#### Day 4: Database Integration
- Work with the Supabase database
- Practice CRUD operations using the test-delete table
- Update the daily log with your progress

#### Day 5: Feature Implementation
- Implement a small feature with MCP server integration
- Write tests for your feature
- Update the daily log with your progress
- Reflect on your first week and plan for the next

### Tracking Your Progress

As you complete tasks, track your progress in:

1. **Task Tracking**: Update the [task-tracking.md](./task-tracking.md) file with your task status
   - Update the status emoji (🔄 → ⏳ → ✅)
   - Add notes about your progress
   - Move completed tasks to the Completed Tasks section

2. **Daily Log**: Document your daily activities and findings in the [daily-log.md](../handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md) file
   - Add a new entry for each day you work on the project
   - Document what you worked on, issues encountered, and next steps
   - Follow the format described in the [Documentation Guide](./development-guides/documentation-guide.md#daily-development-log)

3. **Progress Tracking**: For major milestones, update the [tracking-progress.md](./tracking-progress.md) file
   - Update the status of completed features or components
   - Update the progress percentage for your area of work

4. **Pull Requests**: Submit pull requests for your changes with detailed descriptions
   - Reference task IDs in your PR descriptions
   - Link to relevant documentation updates

Remember, the goal of your first week is to get familiar with the codebase and development workflow. Don't hesitate to ask questions and seek help when needed.

Welcome to the team! 🎉

## ⏭️ Next Steps

After completing this Onboarding Guide, continue following our [Official Documentation Path](./documentation-path.md):

1. **Read the [Project Requirements](./project-requirements.md)**
   - Understand what we're building and why
   - Review the functional and technical requirements
   - Note the current status of each requirement

The complete documentation path is defined in the [Documentation Path](./documentation-path.md) file. This ensures you follow the correct sequence of documentation and get a complete understanding of the project.
