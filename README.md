# Handyman Lead Generation Project

Welcome to the Handyman Lead Generation Project! This web application connects homeowners with local handyman services, allowing users to search for services, view provider profiles, read reviews, and request quotes.

## 📚 Documentation - Start Here

### Step 1: Onboarding

**All developers must start with the [Onboarding Guide](./documentation/ONBOARDING.md)**

This comprehensive guide is the entry point for all project documentation and will walk you through:

- Setting up your development environment
- Understanding the project structure
- Your first week plan with day-by-day tasks
- How to track progress and contribute to the project
- Where to find additional documentation

### Step 2: Project Understanding

After completing the onboarding process, review these key documents:

1. [Project Requirements](./documentation/project-requirements.md) - Understand what we're building
2. [Architecture Overview](./documentation/architecture/README.md) - Learn how the system is designed

### Step 3: Development Process

Once you understand the project, familiarize yourself with our development process:

1. [Task Tracking System](./documentation/task-tracking.md) - How we track and manage tasks
2. [Daily Development Log](./handyman-v2/Envato-template-files/WorkDirectory/HandymanServices/daily-log.md) - Day-to-day progress tracking
3. [Documentation Guide](./documentation/development-guides/documentation-guide.md) - How to document your work

### ⏭️ Documentation Path

Follow our official [Documentation Path](./documentation/documentation-path.md):

1. **Start here**: [Onboarding Guide](./documentation/ONBOARDING.md)
2. Follow the step-by-step documentation path
3. Return to this document only after completing the onboarding process

## 🚀 Quick Start

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

3. **Install dependencies**

```bash
cd handyman-v2/Envato-template-files/WorkDirectory/HandymanServices
npm install
# or
yarn install
```

4. **Start the MCP servers**

```bash
# Start all MCP servers at once
./start-all-mcp-servers.bat

# Or start individual servers
./start-perplexity-mcp.bat
./start-google-maps-mcp.bat
./start-supabase-mcp.bat
```

5. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

6. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## 🤝 Contributing

Please read our [Contributing Guide](./documentation/development-guides/contributing.md) for details on our code of conduct and the process for submitting pull requests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Envato for the original template
- All contributors who have helped shape this project
