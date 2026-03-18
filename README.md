# SparkAgents

No-code AI agent builder platform with visual agent design, tool integration, marketplace, and deployment management.

## Features

- **Agent Builder** -- Visual drag-and-drop agent creation with configurable workflows
- **Agent Dashboard** -- Monitor deployed agents with success rates and run history
- **Tool Library** -- Connect agents to APIs, databases, and external services
- **Knowledge Bases** -- Attach document collections for RAG-powered agents
- **Sandbox Testing** -- Test agents in isolated environments before deployment
- **Agent Marketplace** -- Discover and share community-built agent templates
- **Team Management** -- Collaborate with role-based access controls
- **Monitoring** -- Real-time agent performance and cost tracking
- **Billing** -- Usage-based billing with cost breakdowns per agent
- **Guardrails** -- Configure safety rules and content filtering
- **Deployment** -- One-click deployment with API endpoint generation

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Validation:** Zod
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd sparkagents
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
sparkagents/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── agent-builder/ # Visual builder
│   │   ├── agents/       # Agent management
│   │   ├── tools/        # Tool library
│   │   ├── knowledge/    # Knowledge bases
│   │   ├── sandbox/      # Testing environment
│   │   ├── marketplace/  # Agent marketplace
│   │   └── monitoring/   # Performance metrics
│   ├── components/       # Shared UI components
│   └── lib/              # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

