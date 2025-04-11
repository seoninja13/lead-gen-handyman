# Getting Started

This guide will help you set up your development environment and get started with the Handyman Lead Generation Project.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [First Tasks](#first-tasks)
- [Common Issues](#common-issues)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+)
- **npm** (v8+) or **yarn** (v1.22+)
- **Git**
- **VS Code** (recommended) with the following extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

## Environment Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/lead-gen-handyman.git
cd lead-gen-handyman
```

2. **Set up environment variables**

Create a `.env.local` file in the `handyman-v2/Envato-template-files/WorkDirectory/HandymanServices` directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
```

Contact a team member to get the actual values for these environment variables.

## Installation

Navigate to the main application directory:

```bash
cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
```

Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the Application

1. **Start the MCP servers**

```bash
# Start all MCP servers at once
./start-all-mcp-servers.bat

# Or start individual servers
./start-perplexity-mcp.bat
./start-google-maps-mcp.bat
./start-supabase-mcp.bat
```

2. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

3. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

The main application code is located in:

```
handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/
```

Key directories include:

- `pages/`: Next.js pages and API routes
- `components/`: React components
- `data/`: Static data files
- `utils/`: Utility functions
- `styles/`: CSS and styling files
- `public/`: Static assets
- `MCP-Servers/`: Model Context Protocol servers

## First Tasks

Here are some suggested first tasks to get familiar with the codebase:

1. **Explore the application**
   - Navigate through the different pages
   - Understand the data flow
   - Review the component structure

2. **Make a small change**
   - Update text on the home page
   - Modify a component style
   - Add a new static data entry

3. **Run tests**
   - Execute existing tests
   - Add a simple test for a component

## Common Issues

### Port 3000 is already in use

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

### Supabase Connection Issues

If you're having trouble connecting to Supabase:

1. Verify your environment variables are correct
2. Check if the Supabase project is active
3. Test the connection using the `/test/supabase` page

### MCP Server Issues

If MCP servers aren't working:

1. Check if the servers are running (look for terminal windows)
2. Verify API keys in your `.env.local` file
3. Check the logs in the `logs/` directory

## Next Steps

Once you're comfortable with the basics, check out the [Development Guides](../development-guides/README.md) for more detailed information on contributing to the project.
