# Database Documentation

This document provides comprehensive information about the database structure, schema, and operations for the Handyman Lead Generation Project.

## 📋 Table of Contents

- [Database Overview](#database-overview)
- [Connection Setup](#connection-setup)
- [Schema](#schema)
- [CRUD Operations](#crud-operations)
- [Query Examples](#query-examples)
- [Migrations](#migrations)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Database Overview

The Handyman Lead Generation Project uses Supabase, which is built on PostgreSQL, as its primary database. Supabase provides:

- PostgreSQL database
- Real-time subscriptions
- Authentication
- Storage
- API auto-generation

### Environment Configuration

The database connection is configured using environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Connection Setup

### Supabase Client Initialization

The Supabase client is initialized in `utils/supabaseClient.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Testing the Connection

You can test the Supabase connection by visiting:
- http://localhost:3000/test/supabase

This page provides a UI for testing CRUD operations against the test-delete table.

## Schema

### Main Tables

#### test-delete

This table is used ONLY for testing CRUD operations and should NOT be used as a data source for production code.

| Column   | Type    | Description                |
|----------|---------|----------------------------|
| id       | uuid    | Primary key                |
| city     | text    | City name                  |
| business | text    | Business name              |
| service  | text    | Service description        |

> **IMPORTANT**: The test-delete table is strictly for testing purposes. All production data should be stored in the appropriate tables (e.g., businesses, services, etc.). Be cautious about using the test-delete table as it may not have the appropriate structure or constraints for production data.

#### users

| Column       | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | uuid      | Primary key                |
| email        | text      | User email                 |
| name         | text      | User full name             |
| phone        | text      | User phone number          |
| created_at   | timestamp | Account creation timestamp |
| user_type    | text      | 'customer' or 'provider'   |

#### services

| Column       | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | uuid      | Primary key                |
| name         | text      | Service name               |
| description  | text      | Service description        |
| category     | text      | Service category           |
| created_at   | timestamp | Creation timestamp         |

#### businesses

| Column       | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | uuid      | Primary key                |
| name         | text      | Business name              |
| description  | text      | Business description       |
| enriched_data| jsonb     | Enriched data from OpenRouter web search |
| created_at   | timestamp | Creation timestamp         |

> **IMPORTANT**: The enriched_data column stores the enriched data retrieved from the OpenRouter web search. This data is in JSON format and contains detailed information about the business, including review insights, service details, repair techniques, and maintenance tips.

#### providers

| Column       | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | uuid      | Primary key                |
| user_id      | uuid      | Foreign key to users       |
| business_name| text      | Business name              |
| description  | text      | Business description       |
| address      | text      | Business address           |
| city         | text      | City                       |
| state        | text      | State                      |
| zip          | text      | ZIP code                   |
| created_at   | timestamp | Creation timestamp         |

#### listings

| Column       | Type      | Description                |
|--------------|-----------|----------------------------|
| id           | uuid      | Primary key                |
| provider_id  | uuid      | Foreign key to providers   |
| service_id   | uuid      | Foreign key to services    |
| title        | text      | Listing title              |
| description  | text      | Listing description        |
| price        | decimal   | Service price              |
| created_at   | timestamp | Creation timestamp         |

### Relationships

- **users** ← one-to-one → **providers**: A user can be a service provider
- **providers** ← one-to-many → **listings**: A provider can have multiple listings
- **services** ← one-to-many → **listings**: A service can have multiple listings

## CRUD Operations

### Direct SQL Approach

The project uses direct SQL queries for all Supabase operations:

#### Read Data

```sql
-- Get all records from test-delete
SELECT * FROM "test-delete";

-- Get specific record by id
SELECT * FROM "test-delete" WHERE id = '123e4567-e89b-12d3-a456-426614174000';

-- Get filtered records
SELECT * FROM "test-delete" WHERE city = 'New York';
```

#### Insert Data

```sql
-- Insert a new record
INSERT INTO "test-delete" (city, business, service)
VALUES ('New York', 'ABC Plumbing', 'Pipe repair');
```

#### Update Data

```sql
-- Update a record
UPDATE "test-delete"
SET city = 'Chicago', business = 'XYZ Plumbing'
WHERE id = '123e4567-e89b-12d3-a456-426614174000';
```

#### Delete Data

```sql
-- Delete a record
DELETE FROM "test-delete"
WHERE id = '123e4567-e89b-12d3-a456-426614174000';
```

### Implementation in Code

Example of executing SQL queries in Next.js API routes:

```javascript
// pages/api/listings.js
import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('listings').select('*');

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  // Other methods...
}
```

## Query Examples

### Join Queries

```sql
-- Get listings with provider and service information
SELECT
  l.id, l.title, l.description, l.price,
  p.business_name, p.city, p.state,
  s.name as service_name, s.category
FROM
  listings l
JOIN
  providers p ON l.provider_id = p.id
JOIN
  services s ON l.service_id = s.id
WHERE
  p.city = 'New York';
```

### Aggregation Queries

```sql
-- Count listings by service category
SELECT
  s.category, COUNT(l.id) as listing_count
FROM
  listings l
JOIN
  services s ON l.service_id = s.id
GROUP BY
  s.category
ORDER BY
  listing_count DESC;
```

## Migrations

Database migrations are managed manually through SQL scripts stored in the `migrations/` directory.

### Migration Process

1. Create a new SQL file in the `migrations/` directory with a timestamp prefix
2. Write the SQL statements for the migration
3. Apply the migration using the Supabase dashboard or CLI

Example migration file (`migrations/20250411_add_ratings_column.sql`):

```sql
-- Add ratings column to listings table
ALTER TABLE listings ADD COLUMN rating DECIMAL(3,2);

-- Set default values
UPDATE listings SET rating = 0.0 WHERE rating IS NULL;
```

## Best Practices

1. **Always use double quotes for table names with hyphens**:
   ```sql
   SELECT * FROM "test-delete";
   ```

2. **Use parameterized queries to prevent SQL injection**:
   ```javascript
   const { data, error } = await supabase
     .from('listings')
     .select('*')
     .eq('id', id);
   ```

3. **Include error handling for all database operations**:
   ```javascript
   const { data, error } = await supabase.from('listings').select('*');
   if (error) {
     console.error('Error fetching listings:', error);
     return null;
   }
   return data;
   ```

4. **Use transactions for operations that modify multiple tables**:
   ```sql
   BEGIN;
   INSERT INTO providers (user_id, business_name) VALUES ('user-id', 'Business Name');
   INSERT INTO listings (provider_id, service_id) VALUES ('provider-id', 'service-id');
   COMMIT;
   ```

## Troubleshooting

### Common Issues

#### Connection Errors

If you're experiencing connection errors:

1. Verify your environment variables are correct
2. Check if the Supabase project is active
3. Test the connection using the `/test/supabase` page

#### Query Errors

For query errors:

1. Check the SQL syntax
2. Verify table and column names
3. Ensure proper quoting for table names with hyphens
4. Check for data type mismatches

### Debugging Tools

1. **Supabase Dashboard**: Use the SQL Editor to test queries
2. **Test Page**: Use the `/test/supabase` page to test CRUD operations
3. **Console Logging**: Log query results and errors in development

## Next Steps

For more detailed information on specific database operations, see:

- [Schema Details](./schema.md)
- [Query Examples](./queries.md)
- [Migration Guide](./migrations.md)
