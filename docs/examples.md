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

**GitHub Actions Example:**
```yaml
name: Handoff AI Documentation Check
on: [pull_request]

jobs:
  doc-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check Handoff AI Setup
        run: |
          if [ ! -d ".project" ]; then
            echo "❌ Handoff AI not initialized"
            exit 1
          fi
          echo "✅ Handoff AI configuration found"
      
      - name: Validate Documentation
        run: |
          # Add validation logic for your documentation
          npx handoff-ai status
```

**Documentation Sync Check:**
```yaml
      - name: Check Documentation Sync
        run: |
          # Ensure inline docs are up to date
          npx handoff-ai inject-docs --dry-run
          if [ $? -ne 0 ]; then
            echo "❌ Documentation out of sync"
            echo "Run: npx handoff-ai inject-docs"
            exit 1
          fi
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