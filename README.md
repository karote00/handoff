# Handoff AI 🤝

**AI collaboration framework for persistent project knowledge and smooth handoffs**

Handoff AI eliminates the need to re-explain your codebase to AI assistants every time. It creates a persistent knowledge base that enables consistent, intelligent AI collaboration across team members and sessions.

## The Problem

Every time you work with an AI assistant on your codebase:
- ❌ You explain the same architecture over and over
- ❌ AI makes inconsistent assumptions across sessions  
- ❌ Team members get different AI advice for the same codebase
- ❌ Junior developers struggle to provide AI with proper context
- ❌ AI starts from scratch instead of building on previous work

## The Solution

Handoff AI creates a `.project` folder in your repository that serves as **institutional memory for AI collaboration**:

```
your-project/
├── .project/
│   ├── handoff-config.md      # AI interaction preferences
│   ├── assumptions.md         # AI decisions for human review
│   ├── ai-quick-start.md      # Immediate context for AI
│   └── epics/                 # Structured workflows
│       ├── collaborative-documentation.md
│       ├── codebase-improvement.md
│       └── feature-implementation.md
└── your code...
```

## Quick Start

### 1. Initialize Handoff AI in your project

```bash
npx handoff-ai init
```

### 2. Configure your preferences

```bash
# Set your engagement level and expertise
npx handoff-ai config
```

### 3. Work with any AI assistant

```
"Hey Claude, check my .project folder and help me implement user authentication using medium-engagement mode"
```

The AI will automatically understand your codebase, follow your architectural patterns, and work at your preferred collaboration level.

## Key Features

### 🎯 **Flexible Engagement Levels**
- **High Engagement**: Full collaboration with detailed human input
- **Medium Engagement**: AI makes reasonable assumptions, human approves key decisions  
- **Auto-Pilot**: AI handles everything, documents assumptions for later review

### 🧠 **Persistent AI Memory**
- AI decisions are documented and reused across sessions
- Consistent architectural guidance for all team members
- No more re-explaining the same concepts

### 👥 **Universal Compatibility**
- Works with any AI assistant (Claude, ChatGPT, Copilot, etc.)
- Adapts to different human expertise levels (junior to senior)
- Scales from solo developers to large teams

### 📚 **Structured Workflows (EPICs)**
- **Collaborative Documentation**: Generate comprehensive project docs
- **Codebase Improvement**: Refactor, test, and enhance existing code
- **Feature Implementation**: Build new features following established patterns
- **Codebase Exploration**: Understand unfamiliar codebases

### 🧪 **Smart Testing Guidelines**
- Prevents AI from using watch mode commands that hang processes
- Guides AI to use CI-friendly commands for documentation tasks
- Recommends automated testing tools for browser interactions

### 📝 **Automatic Documentation Sync**
- Ensures project documentation stays current with code changes
- Built-in documentation update phase in all workflows
- Preserves knowledge for future AI sessions and team handoffs

## Real-World Example

**Before Handoff AI:**
```
You: "Help me add user authentication"
AI: "What framework are you using? What's your database? How do you handle state? What's your testing setup?"
You: *explains everything again*
```

**With Handoff AI:**
```
You: "Help me add user authentication using medium-engagement mode"
AI: "I see you're using React with TypeScript, PostgreSQL, and Jest. Based on your existing auth patterns, I'll implement JWT-based authentication following your established error handling and validation patterns. Here's the plan..."
```

## How It Works

1. **Initialize**: Run `handoff-ai init` to create the `.project` structure
2. **Configure**: Set your preferences for AI interaction style
3. **Document**: AI analyzes your codebase and creates persistent knowledge
4. **Collaborate**: Work with AI using structured workflows (EPICs)
5. **Evolve**: Knowledge base grows and improves over time

## Installation

```bash
# Install globally
npm install -g handoff-ai

# Or use directly
npx handoff-ai init
```

## Manual Setup (No CLI)

You can also set up Handoff manually by creating a `.project` folder with these files:

```bash
mkdir .project
mkdir .project/epics

# Copy templates from this repo
cp templates/basic/* .project/
```

## Documentation

- [Getting Started Guide](docs/getting-started.md)
- [Configuration Options](docs/configuration.md)
- [Available EPICs](docs/epics.md)
- [Integration Examples](docs/examples.md)
- [CLI Reference](docs/cli.md)

## Examples

See real projects using Handoff:
- [React TypeScript App](examples/react-app/)
- [Node.js API](examples/node-api/)
- [Python ML Project](examples/python-ml/)
- [Monorepo Project](examples/monorepo/)

## Templates

Choose from different project templates:
- **Basic**: Minimal setup for small projects
- **Full**: Comprehensive setup with all EPICs
- **Team**: Multi-developer collaboration setup
- **Monorepo**: Large-scale project template

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup

```bash
git clone https://github.com/karote00/handoff-ai.git
cd handoff-ai
npm install
npm run dev
```

## Roadmap

- [x] Core framework and templates
- [x] CLI tool (`handoff-ai init`, `handoff-ai config`)
- [ ] VS Code extension
- [ ] GitHub integration
- [ ] AI platform partnerships
- [ ] Team collaboration features

## License

MIT © [Asa Tsai](https://github.com/karote00)

---

**Stop re-explaining your codebase. Start building with persistent AI collaboration.** 🚀
