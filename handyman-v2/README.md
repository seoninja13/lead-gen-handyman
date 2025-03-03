# Handyman v2 - Developer Quick Start Guide

## Project Overview

This project is a conversion of the FindHouse template into a Handyman Directory, leveraging Supabase for the backend and OpenAI for data generation. This guide will help you quickly set up your development environment and start contributing.

This project is running from: C:\Users\IvoD\repos\lead-gen-handyman\handyman-v2\Envato-template-files\themeforest-findhouse-real-estate-react-nextjs-template\findhouse

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url> handyman-v2
cd handyman-v2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

- Copy the example environment file and configure your Supabase and OpenAI credentials:

  ```bash
  cp .env.example .env.local
  ```

  - Update `.env.local` with your Supabase project URL, anon key, and OpenAI API key.

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    OPENAI_API_KEY=your_openai_api_key
    ```

### 4. Database Migration

- Run the initial database migration script to rename legacy tables and create v2 tables.

  ```bash
  # Execute this SQL script in your Supabase SQL Editor
  # Located at: scripts/migrations/001-initial-schema.sql

  psql -f scripts/migrations/001-initial-schema.sql -h <your_supabase_host> -p 5432 -U postgres -d postgres
  ```
  *(Replace placeholders with your actual Supabase connection details if using psql CLI directly)*

  **Alternatively**, you can copy and paste the contents of `scripts/migrations/001-initial-schema.sql` directly into the Supabase SQL Editor in your project dashboard.

### 5. Data Population (Optional)

- To populate the `professionals` table with AI-generated data based on your v1 data, run the data population script:

  ```bash
  npm run populate:v2
  ```

  - This script uses OpenAI to generate professional profiles and inserts them into the `professionals` table.
  - **Note**: Ensure you have configured your OpenAI API key correctly in `.env.local` for this step.

### 6. Run Development Server

```bash
npm run dev
```

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### 7. Key Files and Structure

- **`scripts/migrations/001-initial-schema.sql`**: SQL migration script for database setup.
- **`handyman-v2/src/lib/openai-client.ts`**:  Rate-limited OpenAI client for API interactions.
- **`handyman-v2/scripts/populate-v2.ts`**: Script to populate v2 tables using OpenAI.
- **`handyman-v2/src/utils/supabase/client.ts`**: Supabase client initialization.
- **`handyman-v2/README.md`**: This developer quick start guide.

### 8. Next Steps

- Refer to the main project `README.md` in the root directory for the overall project roadmap and documentation links.
- Consult the `TODO.md` for upcoming tasks and features to implement.
- Follow the architecture plan documented in `docs/v2-architecture.md` for feature implementation.

Happy coding!
