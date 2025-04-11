# Handyman Lead Generation Project Documentation

**Important: New developers should start with the [Onboarding Guide](./ONBOARDING.md) instead of this page.**

This documentation hub contains detailed information about all aspects of the project. It is referenced from the Onboarding Guide and provides in-depth documentation for specific areas of the project.

## 📚 Documentation Structure

This documentation is organized into the following sections:

### 🚀 [Getting Started](./getting-started/README.md)
- Environment setup
- Project installation
- First steps for new developers

### 🏗️ [Architecture](./architecture/README.md)
- System overview
- Component architecture
- Data flow diagrams

### 💻 [Development Guides](./development-guides/README.md)
- Coding standards
- Workflow guidelines
- Best practices
- [Documentation Guide](./development-guides/documentation-guide.md)

### 🔌 [API Documentation](./api/README.md)
- API endpoints
- Request/response formats
- Authentication

### 🗄️ [Database](./database/README.md)
- Schema documentation
- Query examples
- Data models

### 🧪 [Testing](./testing/README.md)
- Testing strategies
- Test coverage
- Running tests

### 🚢 [Deployment](./deployment/README.md)
- Deployment procedures
- Environment configuration
- CI/CD pipeline

### 🔧 [Troubleshooting](./troubleshooting/README.md)
- Common issues
- Debugging tips
- Support resources

## 📋 Project Overview

The Handyman Lead Generation Project is a web application designed to connect homeowners with local handyman services. The platform allows users to:

- Search for handyman services by location and service type
- View detailed profiles of service providers
- Read reviews and ratings
- Request quotes and book services

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Netlify
- **AI Integration**: Google Gemini, Perplexity API

## 🗂️ Project Structure

```
lead-gen-handyman/
├── handyman-v1/           # Original version (reference only)
├── handyman-v2/           # Current version
│   ├── Envato-template-files/
│   │   ├── WorkDirectory/
│   │   │   └── HandymanServices/  # Main application
│   │   └── Original template files-do-not-edit/
│   └── documentation/     # Project documentation
├── documentation/         # Central documentation hub
└── README.md             # Project overview
```

## 📝 Documentation Standards

### Daily Development Log

We maintain a daily development log to track progress, document issues, and share knowledge:

- **Location**: `handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md`
- **Purpose**: Document daily progress, issues, and next steps
- **Format**: See the [Documentation Guide](./development-guides/documentation-guide.md#daily-development-log) for details

### General Standards

All documentation in this project follows these standards:

1. **Markdown Format**: All documentation is written in Markdown for consistency and readability.
2. **Section Headers**: Clear hierarchical structure with appropriate heading levels.
3. **Code Examples**: Code snippets are properly formatted with language specification.
4. **Links**: Internal links use relative paths for better portability.
5. **Images**: Diagrams and screenshots are stored in the assets directory.
6. **Updates**: Documentation is updated alongside code changes.

## 🔄 Contributing to Documentation

When contributing to this documentation:

1. Follow the established format and structure
2. Update relevant sections when making code changes
3. Use the templates provided in each section
4. Test all links and code examples
5. Submit documentation changes with related code PRs

## 📌 Task Tracking

We use a structured task tracking system to monitor progress and manage work:

- **[Task Tracking System](./task-tracking.md)**: Detailed system for tracking individual tasks
- **[Progress Tracking](./tracking-progress.md)**: High-level overview of project progress
- **[Daily Log](../handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md)**: Day-to-day development activities

When working on tasks:
1. Update the task status in the task tracking document
2. Document your progress in the daily log
3. Update the progress tracking document when completing major milestones

## 📅 Documentation Roadmap

- **Phase 1**: Core documentation structure and templates
- **Phase 2**: Comprehensive component and API documentation
- **Phase 3**: Advanced guides and tutorials
- **Phase 4**: Video tutorials and interactive examples

## 🤝 Need Help?

If you need assistance or have questions about the documentation:

1. Check the [Troubleshooting](./troubleshooting/README.md) section
2. Reach out to the documentation team
3. Submit an issue with the "documentation" label
