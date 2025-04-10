# Supabase MCP Server Guide

## Overview
The Supabase MCP (Model Context Protocol) server provides database and authentication capabilities to the Handyman Lead Generation application through the Supabase platform. This integration enables powerful database operations, user authentication, and storage functionality throughout the application.

## Features
- **PostgreSQL Database Operations**: Execute SQL queries against your Supabase PostgreSQL database
- **Database Schema Management**: View and manage database schemas, tables, and relationships
- **Authentication**: User management and authentication operations
- **Storage**: File storage and management capabilities
- **Real-time Subscriptions**: Subscribe to database changes in real-time
- **Edge Functions**: Execute serverless functions

## Configuration
The Supabase MCP server is configured in the MCP configuration file (`mcp_config.json`):

```json
{
  "supabase-mcp-server": {
    "command": "cmd",
    "args": [
      "/c",
      "npx",
      "-y",
      "@smithery/cli@latest",
      "run",
      "@alexander-zuev/supabase-mcp-server",
      "--config",
      "{\"queryApiKey\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zaGxycGhraXJoemNodW9kcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNzE0MjksImV4cCI6MjA1Mzc0NzQyOX0.sUeIVmnldQt3_ykzcCW-vQcjT4u4Oc-gvAa-FiQC8ls\",\"supabaseRegion\":\"us-west-1\",\"supabaseDbPassword\":\"1dEYJiVpY9roeFJ1\",\"supabaseProjectRef\":\"nshlrphkirhzchuodpeo\",\"supabaseAccessToken\":\"\",\"supabaseServiceRoleKey\":\"\"}"
    ]
  }
}
```

## Supabase Project Setup
To use the Supabase MCP server, you need a Supabase project with the following configuration:
1. Create a project in the [Supabase Dashboard](https://app.supabase.io/)
2. Configure the necessary tables and schemas for your application
3. Set up authentication providers if needed
4. Generate API keys with appropriate permissions
5. Configure storage buckets if required

## Available Functions

### Database Operations

#### Execute PostgreSQL Query
Execute SQL queries against your Supabase PostgreSQL database.

```javascript
// Example usage
const result = await mcp3_execute_postgresql({
  query: "SELECT * FROM public.users LIMIT 10;"
});

// Example response
{
  "command": "SELECT",
  "rowCount": 10,
  "rows": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "created_at": "2025-04-09T16:00:00.000Z"
    },
    // More rows...
  ]
}
```

#### Get Database Schemas
Retrieve a list of all schemas in the database.

```javascript
// Example usage
const result = await mcp3_get_schemas();

// Example response
{
  "schemas": [
    {
      "name": "public",
      "owner": "postgres",
      "size": "16 MB",
      "description": "standard public schema",
      "tables": 12
    },
    {
      "name": "auth",
      "owner": "supabase_auth_admin",
      "size": "8 MB",
      "description": "authentication schema",
      "tables": 8
    }
  ]
}
```

#### Get Tables in Schema
Retrieve a list of all tables in a specific schema.

```javascript
// Example usage
const result = await mcp3_get_tables({
  schema_name: "public"
});

// Example response
{
  "tables": [
    {
      "name": "users",
      "type": "table",
      "rows": 1250,
      "size": "2 MB",
      "columns": 8,
      "indexes": 3,
      "last_vacuum": "2025-04-08T14:30:00.000Z"
    },
    // More tables...
  ]
}
```

#### Get Table Schema
Get detailed information about a specific table's structure.

```javascript
// Example usage
const result = await mcp3_get_table_schema({
  schema_name: "public",
  table: "users"
});

// Example response
{
  "columns": [
    {
      "name": "id",
      "type": "uuid",
      "nullable": false,
      "default": "gen_random_uuid()",
      "primary_key": true
    },
    {
      "name": "email",
      "type": "text",
      "nullable": false,
      "unique": true
    },
    // More columns...
  ],
  "primary_key": {
    "name": "users_pkey",
    "columns": ["id"]
  },
  "foreign_keys": [
    {
      "name": "users_profile_id_fkey",
      "columns": ["profile_id"],
      "referenced_table": "profiles",
      "referenced_columns": ["id"]
    }
  ],
  "indexes": [
    {
      "name": "users_email_idx",
      "columns": ["email"],
      "unique": true
    }
  ]
}
```

### Authentication Operations

#### Get Auth Admin Methods
Get a list of available authentication admin methods.

```javascript
// Example usage
const result = await mcp3_get_auth_admin_methods_spec();

// Example response (partial)
{
  "methods": {
    "get_user_by_id": {
      "description": "Get a user by their ID",
      "parameters": {
        "uid": {
          "type": "string",
          "description": "The user's ID"
        }
      }
    },
    "list_users": {
      "description": "List all users",
      "parameters": {
        "page": {
          "type": "integer",
          "description": "Page number",
          "default": 1
        },
        "per_page": {
          "type": "integer",
          "description": "Items per page",
          "default": 50
        }
      }
    },
    // More methods...
  }
}
```

#### Call Auth Admin Method
Execute an authentication admin method.

```javascript
// Example usage
const result = await mcp3_call_auth_admin_method({
  method: "list_users",
  params: {
    page: 1,
    per_page: 10
  }
});

// Example response
{
  "users": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "user@example.com",
      "created_at": "2025-04-09T16:00:00.000Z",
      "last_sign_in_at": "2025-04-09T16:15:00.000Z"
    },
    // More users...
  ],
  "total": 1250,
  "page": 1,
  "per_page": 10
}
```

### Management API Operations

#### Get Management API Specification
Get the complete Supabase Management API specification.

```javascript
// Example usage
const result = await mcp3_get_management_api_spec();

// Example response (partial)
{
  "openapi": "3.0.0",
  "info": {
    "title": "Supabase Management API",
    "version": "1.0.0"
  },
  "paths": {
    "/v1/projects/{ref}/functions": {
      "get": {
        "summary": "List all functions",
        "parameters": [
          {
            "name": "ref",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    // More paths...
  }
}
```

#### Send Management API Request
Execute a Supabase Management API request.

```javascript
// Example usage
const result = await mcp3_send_management_api_request({
  method: "GET",
  path: "/v1/projects/{ref}/functions",
  path_params: {},
  request_params: {},
  request_body: {}
});

// Example response
{
  "functions": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "name": "process-payment",
      "slug": "process-payment",
      "status": "ACTIVE",
      "version": 1,
      "created_at": "2025-04-01T12:00:00.000Z",
      "updated_at": "2025-04-09T16:00:00.000Z"
    },
    // More functions...
  ]
}
```

## Integration Examples

### Database Operations Example
Execute a SQL query to retrieve handyman services:

```javascript
// Get all handyman services with ratings above 4.5
const result = await mcp3_execute_postgresql({
  query: `
    SELECT 
      s.id, 
      s.name, 
      s.description, 
      s.hourly_rate,
      AVG(r.rating) as average_rating,
      COUNT(r.id) as review_count
    FROM 
      public.services s
    LEFT JOIN 
      public.reviews r ON s.id = r.service_id
    GROUP BY 
      s.id, s.name, s.description, s.hourly_rate
    HAVING 
      AVG(r.rating) > 4.5
    ORDER BY 
      average_rating DESC
    LIMIT 10;
  `
});

// Process the results
const topServices = result.rows.map(service => ({
  id: service.id,
  name: service.name,
  description: service.description,
  hourlyRate: service.hourly_rate,
  rating: parseFloat(service.average_rating).toFixed(1),
  reviewCount: service.review_count
}));
```

### User Authentication Example
Retrieve a list of users and filter by email domain:

```javascript
// Get all users with a specific email domain
const result = await mcp3_call_auth_admin_method({
  method: "list_users",
  params: {
    page: 1,
    per_page: 100
  }
});

// Filter users by email domain
const companyUsers = result.users.filter(user => 
  user.email.endsWith('@company.com')
);

// Process the filtered users
const userProfiles = companyUsers.map(user => ({
  id: user.id,
  email: user.email,
  lastActive: new Date(user.last_sign_in_at).toLocaleDateString()
}));
```

### Database Schema Management Example
Create a new table for service categories:

```javascript
// Enable unsafe mode for database operations
await mcp3_live_dangerously({
  service: "database",
  enable_unsafe_mode: true
});

// Create a new table for service categories
const result = await mcp3_execute_postgresql({
  query: `
    CREATE TABLE IF NOT EXISTS public.service_categories (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT,
      icon TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    
    -- Add RLS policies
    ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
    
    -- Create policy for read access
    CREATE POLICY "Allow read access for all users"
      ON public.service_categories
      FOR SELECT
      USING (true);
      
    -- Create policy for insert/update/delete for authenticated users
    CREATE POLICY "Allow full access for authenticated users"
      ON public.service_categories
      FOR ALL
      USING (auth.role() = 'authenticated');
  `,
  migration_name: "create_service_categories_table"
});

// Return to safe mode
await mcp3_live_dangerously({
  service: "database",
  enable_unsafe_mode: false
});
```

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - **Error**: "Failed to connect to Supabase"
   - **Solution**: Verify the Supabase project reference and API key in the configuration

2. **Authentication Issues**
   - **Error**: "Invalid API key"
   - **Solution**: Check the queryApiKey in the configuration and ensure it has the necessary permissions

3. **SQL Execution Errors**
   - **Error**: "Syntax error in SQL statement"
   - **Solution**: Verify the SQL query syntax and ensure it's compatible with PostgreSQL

4. **Permission Issues**
   - **Error**: "Permission denied for table X"
   - **Solution**: Check the Row Level Security (RLS) policies for the table and ensure the API key has the necessary permissions

5. **Safe Mode Errors**
   - **Error**: "This operation requires unsafe mode"
   - **Solution**: Use mcp3_live_dangerously to enable unsafe mode for the database service

## Best Practices

1. **Database Security**
   - Use Row Level Security (RLS) policies to control access to tables
   - Avoid exposing sensitive data in public tables
   - Use parameterized queries to prevent SQL injection

2. **Performance Optimization**
   - Create appropriate indexes for frequently queried columns
   - Use efficient SQL queries to minimize database load
   - Implement caching for frequently accessed data

3. **Error Handling**
   - Implement robust error handling for database operations
   - Provide user-friendly error messages
   - Log detailed error information for debugging

4. **Data Validation**
   - Validate user input before executing database operations
   - Use database constraints to enforce data integrity
   - Implement application-level validation for complex business rules

## Conclusion
The Supabase MCP server provides powerful database and authentication capabilities to the Handyman Lead Generation application. By leveraging these features, the application can offer secure user authentication, efficient data storage and retrieval, and real-time updates for an enhanced user experience.