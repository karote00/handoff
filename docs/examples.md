# Integration Examples

This guide shows how to integrate Handoff AI with different development workflows, tools, and AI assistants.

## AI Assistant Integration

### Claude (Anthropic)

**Basic Integration:**
```
Hey Claude, I'm working on a React project. Please check my .project folder first, then help me implement user authentication using medium-engagement mode.
```

**Advanced Integration:**
```
Claude, please follow these steps:
1. Read .project/handoff-config.md to understand my preferences
2. Review .project/assumptions.md for previous decisions
3. Use the Feature Implementation EPIC from .project/epics/
4. Implement OAuth integration following our documented patterns
```

### ChatGPT (OpenAI)

**Context Setup:**
```
I'm using Handoff AI for project knowledge management. Here's my configuration:

[Paste .project/handoff-config.md content]

Please help me refactor this component following our documented patterns and using auto-pilot mode.
```

**Workflow Integration:**
```
Please follow the Codebase Improvement EPIC to help me optimize this React app. Focus on performance and maintainability. Document all assumptions in the format specified in my .project folder.
```

### GitHub Copilot

**Enhanced Context:**
While Copilot doesn't read files directly, you can enhance its suggestions by:

1. **Open relevant docs:** Keep `.project/ai-quick-start.md` open in your editor
2. **Use comments:** Reference patterns from your documentation
3. **Consistent naming:** Follow conventions documented in your project

```javascript
// Following our authentication pattern from .project/assumptions.md
// Using JWT tokens with 24-hour expiration as documented
const authenticateUser = async (credentials) => {
    // Implementation follows our security guidelines
}
```

## Development Workflow Integration

### Git Hooks Integration

**Pre-commit Hook:**
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Update documentation before commit
if [ -f ".project/handoff-config.md" ]; then
    echo "Handoff AI: Checking documentation sync..."
    # Add your documentation update logic here
fi
```

**Post-merge Hook:**
```bash
#!/bin/sh
# .git/hooks/post-merge

# Notify about assumption updates
if git diff HEAD@{1} --name-only | grep -q ".project/assumptions.md"; then
    echo "⚠️  AI assumptions updated - please review .project/assumptions.md"
fi
```

### CI/CD Integration

**Context-Aware Code Review:**
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
          
      - name: Verify Handoff AI Setup
        run: npx handoff-ai status
        
      - name: Prepare AI Review Context
        run: |
          echo "🤖 Context-Aware AI Review Instructions:"
          echo ""
          echo "Please review this PR using our project context:"
          echo "1. Read .project/ folder for complete project understanding"
          echo "2. Review .project/assumptions.md for documented decisions"
          echo "3. Check .project/review-rules.md for custom criteria"
          echo "4. Validate changes against documented patterns"
          echo "5. Ensure architectural consistency"
          echo ""
          echo "Focus areas based on changed files:"
          git diff --name-only origin/main | head -10
```

**Documentation Sync Automation:**
```yaml
# .github/workflows/docs-sync.yml
name: Documentation Sync
on: [pull_request]

jobs:
  docs-sync:
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

**Project Health Monitoring:**
```yaml
# .github/workflows/project-health.yml
name: Weekly Project Health Check
on: 
  schedule:
    - cron: '0 9 * * 1'  # Weekly on Monday
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Handoff AI Health Analysis
        run: |
          echo "🏥 Weekly Project Health Check"
          echo "================================"
          npx handoff-ai status
          npx handoff-ai review --dry-run
          
      - name: Generate AI Health Report
        run: |
          echo "📊 AI Health Analysis Instructions:"
          echo ""
          echo "Please analyze our project health by:"
          echo "1. Reading .project/assumptions.md for recent decisions"
          echo "2. Checking if documented patterns are still being followed"
          echo "3. Identifying any architectural drift in recent commits"
          echo "4. Reviewing project evolution against original constraints"
          echo "5. Suggesting documentation updates or pattern improvements"
          echo "6. Recommending areas for technical debt reduction"
          echo ""
          echo "Recent activity summary:"
          git log --oneline --since="1 week ago" | head -10
```

**Multi-Environment Validation:**
```yaml
# .github/workflows/handoff-validation.yml
name: Handoff AI Validation
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          
      - name: Validate Handoff AI Setup
        run: |
          if [ ! -d ".project" ]; then
            echo "❌ Handoff AI not initialized"
            exit 1
          fi
          
          echo "✅ Handoff AI configuration found"
          npx handoff-ai status
          
      - name: Validate Documentation Structure
        run: |
          # Check required files exist
          required_files=(".project/handoff-config.md" ".project/assumptions.md" ".project/ai-quick-start.md")
          for file in "${required_files[@]}"; do
            if [ ! -f "$file" ]; then
              echo "❌ Required file missing: $file"
              exit 1
            fi
          done
          echo "✅ All required documentation files present"
```

## IDE Integration

### VS Code

**Settings Integration:**
```json
// .vscode/settings.json
{
  "files.associations": {
    ".project/*.md": "markdown"
  },
  "markdown.preview.breaks": true,
  "files.watcherExclude": {
    ".project/assumptions.md": false
  }
}
```

**Snippets for Handoff Patterns:**
```json
// .vscode/handoff.code-snippets
{
  "AI Context Request": {
    "prefix": "handoff-context",
    "body": [
      "Please check my .project folder and help me $1 using $2-engagement mode.",
      "",
      "Specific requirements:",
      "- $3",
      "- Follow our documented patterns",
      "- Update assumptions.md with any decisions"
    ],
    "description": "Request AI help with Handoff context"
  }
}
```

### JetBrains IDEs

**File Templates:**
Create templates for common Handoff patterns in your IDE settings.

**Live Templates:**
```xml
<template name="handoff-ai-request" value="Please follow the $EPIC$ EPIC from .project/epics/ to help me $TASK$. Use $MODE$-engagement mode and document assumptions." description="Handoff AI request template" toReformat="false" toShortenFQNames="true">
  <variable name="EPIC" expression="" defaultValue="&quot;Feature Implementation&quot;" alwaysStopAt="true" />
  <variable name="TASK" expression="" defaultValue="&quot;implement this feature&quot;" alwaysStopAt="true" />
  <variable name="MODE" expression="" defaultValue="&quot;medium&quot;" alwaysStopAt="true" />
</template>
```

## Team Collaboration Examples

### Code Review Integration

**PR Template with Handoff Context:**
```markdown
## Changes
- Brief description of changes

## Handoff AI Context
- [ ] Updated .project/assumptions.md with new decisions
- [ ] Followed documented patterns from .project/
- [ ] Used [EPIC name] workflow
- [ ] Documentation is in sync (`handoff-ai inject-docs`)

## AI Collaboration Notes
<!-- Document any AI assistance used and key decisions made -->

## Review Checklist
- [ ] Changes align with documented architecture
- [ ] Assumptions are properly documented
- [ ] Inline documentation is current
```

### Onboarding New Team Members

**Onboarding Checklist:**
```markdown
# New Developer Onboarding

## Handoff AI Setup
- [ ] Clone repository
- [ ] Run `npx handoff-ai status` to verify setup
- [ ] Read `.project/ai-quick-start.md`
- [ ] Review `.project/assumptions.md` for project decisions

## First AI Collaboration
- [ ] Use Codebase Exploration EPIC to understand the project
- [ ] Ask AI to explain the architecture using project context
- [ ] Practice with a small feature using documented patterns

## Team Integration
- [ ] Understand the team's collaboration mode preferences
- [ ] Learn how to document assumptions properly
- [ ] Practice using EPICs for common tasks
```

### Knowledge Sharing

**Team Documentation Workflow:**
```markdown
# Weekly Documentation Sync

## Process
1. **Review assumptions:** Check `.project/assumptions.md` for new decisions
2. **Update patterns:** Document new patterns discovered during the week
3. **Sync inline docs:** Run `handoff-ai inject-docs` on main branches
4. **Share learnings:** Discuss effective AI collaboration techniques

## Template for Sharing AI Insights
- **Context:** What were you trying to accomplish?
- **Approach:** Which EPIC or method did you use?
- **Results:** What worked well or didn't work?
- **Documentation:** What was added to the project knowledge base?
```

## Claude GitHub Actions Integration

### Enhanced Claude Review with Handoff AI Context

Since Claude can read repository files (like `CLAUDE.md`), it can also read your `.project/` folder for comprehensive context:

```yaml
# .github/workflows/claude-handoff-review.yml
name: Claude + Handoff AI Code Review
on: [pull_request]

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Verify Handoff AI Setup
        run: |
          npx handoff-ai status
          npx handoff-ai review --dry-run
          
      - name: Claude Review with Handoff Context
        uses: anthropics/claude-github-action@v1
        with:
          claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
          prompt: |
            Please review this PR using our comprehensive project context:
            
            ## Project Context (Read These Files First)
            1. Read `.project/handoff-config.md` - Our AI collaboration preferences
            2. Read `.project/assumptions.md` - All documented project decisions
            3. Read `.project/review-rules.md` - Our custom review criteria
            4. Read `.project/ai-quick-start.md` - Project overview and patterns
            
            ## Review Instructions
            Based on the project context above, please:
            1. **Architecture Compliance**: Check if changes align with documented architecture
            2. **Pattern Consistency**: Ensure code follows established patterns from assumptions.md
            3. **Custom Rules**: Apply criteria from review-rules.md
            4. **Business Logic**: Validate against documented constraints and requirements
            5. **Documentation Impact**: Identify if changes require doc updates
            
            ## Focus Areas
            - Does this follow our documented error handling patterns?
            - Are naming conventions consistent with project standards?
            - Does the implementation respect our documented constraints?
            - Are there any architectural violations?
            
            Provide specific, actionable feedback based on OUR project's documented decisions, not generic best practices.
```

### Handoff AI + Claude Integration Pattern

```yaml
# .github/workflows/enhanced-claude-review.yml
name: Enhanced Claude Review
on: [pull_request]

jobs:
  prepare-context:
    runs-on: ubuntu-latest
    outputs:
      context-ready: ${{ steps.check.outputs.ready }}
    steps:
      - uses: actions/checkout@v3
      
      - name: Prepare Handoff Context
        id: check
        run: |
          echo "🔍 Preparing comprehensive project context for Claude..."
          
          # Verify Handoff AI setup
          if npx handoff-ai status; then
            echo "✅ Handoff AI configuration verified"
            echo "ready=true" >> $GITHUB_OUTPUT
          else
            echo "❌ Handoff AI not properly configured"
            echo "ready=false" >> $GITHUB_OUTPUT
          fi
          
          # Check documentation completeness
          npx handoff-ai review --dry-run
          
  claude-review:
    needs: prepare-context
    if: needs.prepare-context.outputs.context-ready == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Context-Aware Claude Review
        uses: anthropics/claude-github-action@v1
        with:
          claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
          prompt: |
            # Context-Aware Code Review
            
            You are reviewing code for a project that uses Handoff AI for comprehensive project knowledge management.
            
            ## Step 1: Load Project Context
            Please read these files to understand the project completely:
            
            **Core Configuration:**
            - `.project/handoff-config.md` - Collaboration preferences and project setup
            - `.project/ai-quick-start.md` - Project overview and key patterns
            
            **Project Knowledge:**
            - `.project/assumptions.md` - All documented decisions and rationale
            - `.project/review-rules.md` - Custom review criteria specific to this project
            
            **Workflow Guidance:**
            - `.project/epics/` - Development workflow patterns (if exists)
            
            ## Step 2: Analyze PR Changes
            Review the PR changes in the context of the project knowledge above.
            
            ## Step 3: Provide Context-Aware Feedback
            
            **Architecture Review:**
            - Does this change align with documented architectural decisions?
            - Are there any violations of documented constraints?
            
            **Pattern Compliance:**
            - Does the code follow established patterns from assumptions.md?
            - Is the implementation consistent with documented approaches?
            
            **Custom Criteria:**
            - Apply any specific rules from review-rules.md
            - Check against project-specific requirements
            
            **Documentation Impact:**
            - Does this change require updates to project documentation?
            - Should any new patterns be documented in assumptions.md?
            
            ## Step 4: Actionable Recommendations
            Provide specific, actionable feedback that references our documented decisions rather than generic best practices.
            
            Format your response with:
            - ✅ What aligns well with our documented patterns
            - ⚠️ What needs attention based on our project rules
            - 📝 What documentation updates might be needed
            - 🚀 Suggestions for improvement within our architectural constraints
```

### Claude + Handoff AI Best Practices

**1. Context Loading Pattern:**
```yaml
- name: Enhanced Context Loading
  run: |
    echo "📚 Claude Context Loading Instructions:"
    echo ""
    echo "Before reviewing code, please read our project context:"
    echo "1. .project/handoff-config.md (collaboration preferences)"
    echo "2. .project/assumptions.md (all project decisions)"
    echo "3. .project/review-rules.md (custom review criteria)"
    echo "4. .project/ai-quick-start.md (project overview)"
    echo ""
    echo "This context will help you provide project-specific feedback"
    echo "rather than generic code review comments."
```

**2. Incremental Context Updates:**
```yaml
- name: Context Change Detection
  run: |
    if git diff --name-only origin/main | grep -q ".project/"; then
      echo "🔄 Project context has changed!"
      echo "Claude: Please pay special attention to updates in .project/ folder"
      echo "These changes may affect how you should review this PR."
    fi
```

**3. Multi-Stage Review:**
```yaml
- name: Multi-Stage Claude Review
  run: |
    echo "🎯 Multi-Stage Review Process:"
    echo ""
    echo "Stage 1 - Context Loading:"
    echo "Read .project/ folder for complete project understanding"
    echo ""
    echo "Stage 2 - Change Analysis:"
    echo "Analyze PR changes against loaded context"
    echo ""
    echo "Stage 3 - Pattern Validation:"
    echo "Check compliance with documented patterns and rules"
    echo ""
    echo "Stage 4 - Feedback Generation:"
    echo "Provide context-aware, actionable recommendations"
```

## Advanced Integration Patterns

### Multi-Repository Projects

**Shared Configuration:**
```bash
# In each repository
ln -s ../shared-handoff/.project .project

# Or use git submodules
git submodule add https://github.com/yourorg/shared-handoff.git .project
```

**Cross-Repository Context:**
```markdown
# In .project/ai-quick-start.md
## Related Repositories
- **API:** ../api-service (authentication patterns)
- **Frontend:** ../web-app (component patterns)
- **Shared:** ../shared-lib (utility patterns)

When working across repositories, reference patterns from related projects.
```

### Microservices Architecture

**Service-Specific Configuration:**
```markdown
# .project/handoff-config.md for each service
## Service Context
- **Domain:** User Management
- **Dependencies:** Auth Service, Notification Service
- **Patterns:** Event-driven, CQRS
- **Shared Standards:** ../shared-standards/.project/
```

### Legacy Code Integration

**Gradual Adoption Strategy:**
```markdown
# Phase 1: Documentation
- Initialize Handoff AI in legacy project
- Use Codebase Exploration EPIC to understand existing patterns
- Document current architecture and decisions

# Phase 2: New Development
- Use Feature Implementation EPIC for new features
- Follow documented patterns for consistency
- Gradually improve documentation coverage

# Phase 3: Refactoring
- Use Codebase Improvement EPIC for systematic refactoring
- Maintain backward compatibility
- Update documentation as patterns evolve
```

## Troubleshooting Integration Issues

### Common Problems

**AI Not Using Project Context:**
```
❌ Problem: AI ignores .project folder
✅ Solution: Explicitly reference files in your requests
Example: "Please read .project/ai-quick-start.md first, then help me..."
```

**Inconsistent AI Behavior:**
```
❌ Problem: Different AI responses across team members
✅ Solution: Standardize requests using EPICs and document successful patterns
```

**Documentation Drift:**
```
❌ Problem: Inline docs become outdated
✅ Solution: Regular `handoff-ai inject-docs` runs and CI checks
```

### Best Practices for Integration

1. **Start Small:** Begin with one EPIC and expand gradually
2. **Document Success:** Record what works for your team
3. **Iterate Regularly:** Update patterns based on experience
4. **Share Knowledge:** Make successful integrations available to the team
5. **Automate Where Possible:** Use CI/CD to maintain consistency

---

These examples provide starting points for integrating Handoff AI into your development workflow. Adapt them to your specific tools, team size, and project requirements.