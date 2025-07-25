# Handoff AI 🤝

**The foundation layer for intelligent AI collaboration**

Handoff AI doesn't compete with your favorite AI tools - it makes them dramatically better. By creating comprehensive project knowledge, Handoff AI enables any AI assistant to understand your codebase deeply, work consistently with your patterns, and collaborate intelligently across team members and sessions.

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

### 1. Universal AI Collaboration Setup

```bash
npx handoff-ai start
```

Then ask any AI assistant:
```
"Please run handoff-ai start and follow the instructions"
```

Your AI will guide you through setting up comprehensive project documentation for intelligent collaboration.

### 2. Traditional Setup (Alternative)

```bash
npx handoff-ai init    # Initialize project documentation
npx handoff-ai config  # Configure your preferences
```

### 3. Enhanced AI Collaboration

```
"Hey Claude, check my .project folder and help me implement user authentication using medium-engagement mode"
```

The AI will automatically understand your codebase, follow your architectural patterns, and work at your preferred collaboration level.

## Foundation Layer Philosophy

### 🤝 **Collaboration, Not Competition**

Handoff AI is designed as a **foundation layer** that enhances your existing AI workflow:

- **🔗 Works WITH your tools**: Integrates seamlessly with Claude, ChatGPT, GitHub Copilot, and any future AI assistant
- **🚀 Makes everything better**: Your favorite AI tools become dramatically more effective with comprehensive project context
- **🔄 No lock-in**: Switch between AI assistants while maintaining consistent project knowledge
- **📈 Future-proof**: As AI tools evolve, Handoff AI makes them all more intelligent about your specific project

### 🎯 **Universal Enhancement**

Think of Handoff AI as the **missing infrastructure** that every AI tool needs:

```
Without Handoff AI:          With Handoff AI:
AI Tool → Generic Code       AI Tool + Project Context → Intelligent Code

Claude: "What's your setup?"     Claude: "Based on your React/TypeScript setup..."
ChatGPT: "General advice"        ChatGPT: "Following your documented patterns..."
Copilot: "Generic suggestions"   Copilot: "Consistent with your architecture..."
```

**The goal**: Make every AI interaction feel like working with a team member who deeply understands your project.

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

### 🔄 **Bidirectional Documentation Flow**
- **Forward**: Code → Handoff docs (AI collaboration and knowledge capture)
- **Reverse**: Handoff docs → Inline code documentation (`inject-docs` command)
- **100% Accurate**: AI-generated inline documentation with precise return types
- **Multi-language**: JavaScript/TypeScript (JSDoc), Python (docstrings), Java (Javadoc), and more

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

## inject-docs: Reverse Documentation Flow

Complete the documentation cycle by injecting Handoff knowledge back into your code as inline documentation:

```bash
# Preview what documentation would be added
handoff-ai inject-docs --dry-run

# Apply documentation to all supported files
handoff-ai inject-docs

# Target specific files
handoff-ai inject-docs --files "src/**/*.js"

# Force language detection
handoff-ai inject-docs --language typescript
```

### Before inject-docs:
```javascript
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
```

### After inject-docs:
```javascript
/**
 * Validates email addresses using regex pattern
 * @returns {boolean} True if email format is valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Securely hashes passwords using bcrypt with salt rounds
 * @returns {Promise<string>} Promise resolving to bcrypt hashed password
 */
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}
```

### Supported Languages:
- **JavaScript/TypeScript**: JSDoc format with precise return types
- **Python**: Docstrings with proper formatting
- **Java**: Javadoc with complete annotations
- **C#, Go, Rust, PHP, Ruby, C/C++**: Language-appropriate documentation

## How It Works

1. **Initialize**: Run `handoff-ai init` to create the `.project` structure
2. **Configure**: Set your preferences for AI interaction style
3. **Document**: AI analyzes your codebase and creates persistent knowledge
4. **Collaborate**: Work with AI using structured workflows (EPICs)
5. **inject-docs**: Generate inline documentation from Handoff knowledge
6. **Evolve**: Knowledge base grows and improves over time

## Installation

```bash
# Quick start (recommended)
npx handoff-ai start

# Or install globally
npm install -g handoff-ai
handoff-ai start
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

## The Ecosystem Vision

### 🌟 **Enabling Innovation, Not Controlling It**

Handoff AI's foundation-layer approach creates opportunities for the entire ecosystem:

**For AI Tool Builders:**
- Build on top of rich project context instead of starting from scratch
- Focus on your AI's unique strengths while leveraging comprehensive project knowledge
- Create specialized tools knowing the foundation is already there

**For Development Teams:**
- Choose the best AI tools for each task without losing project context
- Experiment with new AI assistants without rebuilding project knowledge
- Maintain consistency across different tools and team members

**For the Community:**
- Share project patterns and workflows through standardized formats
- Build integrations and extensions on a stable foundation
- Contribute to a growing ecosystem of AI-enhanced development tools

### 🚀 **Growing Together**

As AI tools evolve and new ones emerge, Handoff AI ensures your project knowledge remains valuable and accessible. We're not building walls - we're building bridges that connect all AI tools to your project's unique context.

**The future**: A world where every AI tool understands your project as deeply as your most experienced team member.

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
- [x] **inject-docs**: Bidirectional documentation flow with 100% accuracy
- [ ] VS Code extension
- [ ] GitHub integration
- [ ] AI platform partnerships
- [ ] Team collaboration features

## License

MIT © [Asa Tsai](https://github.com/karote00)

---

**Stop re-explaining your codebase. Start building with persistent AI collaboration.** 🚀
