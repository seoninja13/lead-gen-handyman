# Handyman v2 Project - Handover Instructions for New Developer

## 1. Initial Setup
```bash
# Clone repository
git clone https://github.com/your-repo/handyman-v2.git
cd handyman-v2

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Add Supabase credentials to .env.local
```

## 2. Database Setup Instructions

### 2.1 Schema Migration
```sql
-- Execute via Supabase SQL Editor
BEGIN;
ALTER TABLE cities RENAME TO cities_v1_legacy;
ALTER TABLE services RENAME TO services_v1_legacy;
ALTER TABLE city_services RENAME TO city_services_v1_legacy;

CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT NOT NULL,
  skills TEXT[],
  -- ... other v2 fields
);
COMMIT;
```

### 2.2 Data Population
```typescript
// From scripts/populate-v2.ts
async function main() {
  // 1. Load v1 legacy data
  const legacyData = await loadV1Data('cities_v1_legacy');
  
  // 2. Process with OpenAI
  const processed = await processWithGPT35(legacyData);
  
  // 3. Insert into v2 tables
  await supabase.from('professionals').insert(processed);
}
```

## 3. Key Implementation Tasks

### 3.1 Security Configuration
```sql
-- Row Level Security for professionals
CREATE POLICY "public_read" ON professionals
FOR SELECT USING (true);

CREATE POLICY "owner_write" ON professionals
FOR UPDATE USING (auth.uid() = user_id);
```

### 3.2 Rate-Limited OpenAI Client
```typescript
// utils/openai-client.ts
const client = new OpenAIApi(config);
const limiter = new RateLimiter(3, 1000); // 3 req/sec

async function safeCompletion(prompt: string) {
  await limiter.removeTokens(1);
  return client.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}]
  });
}
```

## 4. Validation Checklist
```markdown
- [ ] Verify table structures in Supabase Dashboard
- [ ] Test data population script with `npm run populate:v2`
- [ ] Confirm RLS policies enforcement
- [ ] Run UI smoke tests with `npm test`
- [ ] Check rate limiting functionality
```

## 5. Documentation Requirements
```bash
# Update documentation structure
docs/
├── v2-architecture.md
├── data-flow.md
└── api-reference.md
```

## 6. Critical Notes
```markdown
!> **UI Freeze Warning**  
Do NOT modify any files in `/components/ui`  
Do NOT alter existing CSS classes  
Preserve template structure exactly

!> **Data Safety**  
Always backup before migrations:
```bash
pg_dump -Fc > backup.dump
```

**First Week Deliverables**  
1. Functional data pipeline  
2. Security implementation  
3. Updated documentation  
4. Validation test suite

## Current Project Status (as of February 7, 2025)

- **Database Schema:**
    - Legacy tables (`cities`, `services`, `city_services`) have been renamed to `cities_v1_legacy`, `services_v1_legacy`, `city_services_v1_legacy`.
    - New v2 tables (`businesses`, `cities`, `services`, `reviews`, `bookings`) have been created in the Supabase database.
    - The `businesses` table schema has been updated to include all columns from the provided CSV file (`handyman-v2/Feed Data/handyman-200_near-eldoardo_co-all-fields.csv`).
- **Codebase:**
    - Basic Next.js project structure is set up.
    - Supabase client and server-side utilities are configured (`src/utils/supabase`).
    - OpenAI client is configured (`src/lib/openai-client.ts`).
    - Data population script (`scripts/populate-v2.ts`) is created but not yet successfully executed due to build issues.
    - Core documentation files are created and updated (`README.md`, `roadmap.md`, `TODO.md`, `docs/`).
    - TypeScript configuration (`tsconfig.json`) has been updated to resolve build errors.
- **Build Status:**
    - The Next.js build process (`npm run build`) is now running successfully after updating the `tsconfig.json` configuration.
- **Data Population Status:**
    - Data population for the `businesses` table using the `populate-v2.ts` script is **not yet completed** due to ongoing issues with script execution.
    - SQL schema for v2 tables has been created, but tables are currently empty except for legacy v1 data.

**Remaining Issues:**

- **Data Population Script Execution:** The `npm run populate:v2` command is still failing with `MODULE_NOT_FOUND` error, even after correcting script paths and build configurations. Further troubleshooting is needed to execute the data population script successfully.
- **OpenAI Enriched Descriptions:** The data population script is intended to generate enriched descriptions using OpenAI, but this functionality is not yet implemented or tested.
- **Data Import Workflow:** The data population workflow is not yet fully defined or implemented. We need to decide whether to proceed with the Node.js script approach or switch to a SQL client-based data import approach.
- **CRUD Operations and Data Revalidation:** Implementation of CRUD operations and data revalidation for Next.js components is pending.

**Next Steps:**

1.  **Troubleshooting Data Population Script:** Continue troubleshooting the `npm run populate:v2` script execution to identify and resolve the `MODULE_NOT_FOUND` error.
2.  **Data Population:** Once the script execution issue is resolved, run the `populate-v2.ts` script to populate the `businesses` table with CSV data and enriched descriptions. Alternatively, if script execution issues persist, proceed with SQL client data import and implement a separate solution for enriched descriptions.
3.  **Implement CRUD Operations and Data Revalidation:** Implement CRUD operations for handyman businesses and services in the Next.js application and implement data revalidation.
4.  **UI/UX Adaptations:** Continue adapting the FindHouse template UI components for the handyman directory.
5.  **Testing and Optimization:** Implement testing and performance optimizations as outlined in the project documentation.
