# Node.js API Example

This example demonstrates how to use Handoff AI with a Node.js Express API project.

## Project Structure

```
node-api/
├── .project/                    # Handoff AI configuration
│   ├── handoff-config.md       # API-specific collaboration settings
│   ├── assumptions.md          # API design decisions
│   ├── ai-quick-start.md       # Context for AI assistants
│   └── epics/                  # API development workflows
├── src/
│   ├── controllers/            # Route handlers
│   ├── middleware/             # Express middleware
│   ├── models/                 # Data models
│   ├── routes/                 # API routes
│   └── utils/                  # Utility functions
├── tests/                      # API tests
└── docs/                       # API documentation
```

## Handoff AI Configuration

### API-Specific Settings
```markdown
# .project/handoff-config.md

## API Development Context
- **Framework:** Express.js with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT with refresh tokens
- **Testing:** Jest with supertest
- **Documentation:** OpenAPI/Swagger

## Collaboration Preferences
- **Mode:** collaborate (for API design decisions)
- **Engagement:** medium-engagement
- **Expertise:** intermediate
- **Trust Level:** medium
```

### Key Assumptions Documented
```markdown
# .project/assumptions.md

## API Design Decisions

### Authentication Strategy
- **Decision:** JWT with 15-minute access tokens, 7-day refresh tokens
- **Rationale:** Balance between security and user experience
- **AI Assumption:** Refresh token rotation for enhanced security

### Error Handling Pattern
- **Decision:** Consistent error response format with error codes
- **Format:** `{ error: { code: string, message: string, details?: any } }`
- **AI Assumption:** All endpoints follow this pattern

### Database Access Pattern
- **Decision:** Repository pattern with Prisma
- **Rationale:** Separation of concerns and testability
- **AI Assumption:** All database operations go through repository layer
```

## AI Collaboration Examples

### Feature Implementation
```
"Please follow the Feature Implementation EPIC to help me add user profile management to this API. Use medium-engagement mode and follow our documented authentication and error handling patterns."
```

### API Documentation
```
"Using the Collaborative Documentation EPIC, help me generate comprehensive OpenAPI documentation for our user management endpoints. Follow our established response formats and authentication requirements."
```

### Code Review
```
"Please review this new endpoint implementation against our documented API patterns. Check for consistency with our error handling, authentication, and database access patterns documented in .project/assumptions.md."
```

## Workflow Examples

### 1. Adding New Endpoint

**AI Request:**
```
Please help me implement a new endpoint for user profile updates following our established patterns:

1. Check .project/assumptions.md for our API patterns
2. Follow the authentication strategy we've documented
3. Use our error handling format
4. Implement proper validation
5. Add appropriate tests
```

**Expected AI Response:**
```
I see from your .project/assumptions.md that you're using:
- JWT authentication with middleware validation
- Repository pattern for database access
- Consistent error response format

Here's the implementation following your patterns:

[Implementation with proper authentication, error handling, and testing]
```

### 2. Database Schema Changes

**AI Request:**
```
Help me add a new user preferences table using the Codebase Improvement EPIC. Follow our Prisma patterns and update the repository layer accordingly.
```

### 3. Performance Optimization

**AI Request:**
```
Using the Codebase Improvement EPIC, help me optimize our user search endpoint. Consider our documented performance requirements and database access patterns.
```

## Benefits Demonstrated

### Consistency Across Endpoints
- All endpoints follow the same authentication pattern
- Consistent error handling and response formats
- Standardized validation and sanitization

### Faster Development
- AI understands project context immediately
- No need to re-explain API patterns
- Consistent code generation following established patterns

### Better Code Quality
- AI follows documented best practices
- Consistent testing patterns
- Proper error handling and logging

### Team Collaboration
- New developers can use AI with full context
- Consistent AI assistance across team members
- Documented decisions prevent conflicting implementations

## Integration with Development Tools

### API Testing
```bash
# AI understands to use these patterns for testing
npm test                    # Run all tests
npm run test:integration   # Integration tests
npm run test:coverage      # Coverage report
```

### Documentation Generation
```bash
# AI can help maintain API documentation
handoff-ai inject-docs --files "src/**/*.js"
npm run docs:generate      # Generate OpenAPI docs
```

### Code Quality
```bash
# AI follows these quality standards
npm run lint              # ESLint with project rules
npm run type-check        # TypeScript validation
npm run security-audit    # Security vulnerability check
```

## GitHub Actions Integration

### Context-Aware Code Review
```yaml
# .github/workflows/ai-review.yml
name: AI-Assisted Code Review
on: [pull_request]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Check Project Context
        run: |
          echo "🔍 Checking available project context..."
          
          if [ -f "CLAUDE.md" ]; then
            echo "✅ CLAUDE.md found"
            CLAUDE_EXISTS=true
          else
            echo "ℹ️  CLAUDE.md not found"
            CLAUDE_EXISTS=false
          fi
          
          if [ -d ".project" ]; then
            echo "✅ Handoff AI context found"
            npx handoff-ai status
            HANDOFF_EXISTS=true
          else
            echo "ℹ️  Handoff AI not initialized"
            HANDOFF_EXISTS=false
          fi
          
          echo "CLAUDE_EXISTS=$CLAUDE_EXISTS" >> $GITHUB_ENV
          echo "HANDOFF_EXISTS=$HANDOFF_EXISTS" >> $GITHUB_ENV
          
      - name: AI Review Instructions
        run: |
          echo "🤖 AI Review Instructions for Node.js API:"
          echo ""
          
          if [ "$HANDOFF_EXISTS" = "true" ] && [ "$CLAUDE_EXISTS" = "true" ]; then
            echo "📚 Comprehensive Context Available:"
            echo "1. Read CLAUDE.md for project overview"
            echo "2. Read .project/ folder for detailed API context:"
            echo "   - .project/assumptions.md (API design decisions)"
            echo "   - .project/review-rules.md (API-specific criteria)"
            echo "   - Authentication patterns and error handling"
            echo "3. Review PR changes against both context sources"
            
          elif [ "$HANDOFF_EXISTS" = "true" ]; then
            echo "📋 Handoff AI Context Available:"
            echo "1. Read .project/assumptions.md for API design decisions"
            echo "2. Check authentication patterns and error handling"
            echo "3. Validate database access patterns (repository layer)"
            echo "4. Ensure API response format compliance"
            echo "5. Review against documented constraints"
            
          else
            echo "⚠️  No Project Context Found:"
            echo "1. Review using general API best practices"
            echo "2. Consider setting up Handoff AI for API-specific context:"
            echo "   npx handoff-ai init --template full"
            echo "3. Document API patterns in .project/assumptions.md"
          fi
```

### Documentation Sync Check
```yaml
# .github/workflows/docs-sync.yml  
name: Documentation Sync
on: [pull_request]

jobs:
  docs-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Check Documentation Sync
        run: |
          npx handoff-ai inject-docs --dry-run
          if [ $? -ne 0 ]; then
            echo "❌ Documentation out of sync with code"
            echo "Run: npx handoff-ai inject-docs"
            exit 1
          fi
          echo "✅ Documentation is in sync"
          
      - name: Auto-Update Documentation
        run: |
          npx handoff-ai inject-docs
          if [[ `git status --porcelain` ]]; then
            echo "📝 Documentation updated automatically"
            git config --local user.email "action@github.com"
            git config --local user.name "GitHub Action"
            git add .
            git commit -m "docs: Auto-update inline documentation"
            git push
          fi
```

### Project Health Check
```yaml
# .github/workflows/project-health.yml
name: Weekly Project Health
on: 
  schedule:
    - cron: '0 9 * * 1'  # Weekly on Monday
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Handoff AI Health Check
        run: |
          echo "🏥 Weekly Project Health Analysis"
          npx handoff-ai status
          npx handoff-ai review --dry-run
          
      - name: Generate AI Health Report
        run: |
          echo "📊 AI Analysis Prompt:"
          echo "Please analyze our API project health by:"
          echo "1. Reading .project/assumptions.md for recent decisions"
          echo "2. Checking if documented patterns are still followed"
          echo "3. Identifying any architectural drift in recent commits"
          echo "4. Suggesting improvements based on project evolution"
          echo "5. Recommending documentation updates if needed"
```

## Key Learnings

1. **API Context Matters:** Documenting authentication, error handling, and data access patterns helps AI generate consistent code

2. **Structured Workflows:** Using EPICs for common API tasks (new endpoints, schema changes, optimization) provides reliable results

3. **Documentation Sync:** Regular use of `inject-docs` keeps API documentation current with code changes

4. **Team Consistency:** Shared Handoff configuration ensures all team members get consistent AI assistance

## Next Steps

To implement this pattern in your Node.js API:

1. **Initialize Handoff:** `npx handoff-ai init --template full`
2. **Document Patterns:** Add your API patterns to `.project/assumptions.md`
3. **Configure Collaboration:** Set appropriate engagement level for API work
4. **Start Building:** Use EPICs for structured API development
5. **Maintain Documentation:** Regular `inject-docs` runs for API documentation

This example shows how Handoff AI transforms API development from repetitive explanations to efficient, context-aware collaboration.