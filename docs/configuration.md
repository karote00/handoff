# Configuration Guide

This guide covers all configuration options available in Handoff AI.

## Configuration Files

### `.project/handoff-config.md`
Main configuration file that defines how AI should interact with your project.

### `.project/ai-quick-start.md`  
First file AI reads for immediate project context and testing guidelines.

### `.project/assumptions.md`
Log of AI decisions when human input isn't available.

## Engagement Levels

### 🤝 High Engagement (Collaborative)
```markdown
engagement_level: high
```
- Detailed discussions and explanations
- Step-by-step collaboration
- Best for: Complex features, learning, critical systems

### 🎯 Medium Engagement (Guided)
```markdown
engagement_level: medium
```
- AI proposes, human approves key decisions
- Balanced efficiency and control
- Best for: Standard features, busy schedules

### 🚀 Auto-Pilot (Autonomous)
```markdown
engagement_level: auto-pilot
```
- AI handles everything, documents assumptions
- Maximum efficiency, minimal time investment
- Best for: Simple tasks, well-defined requirements

## Testing Configuration

### Smart Testing Guidelines (v0.1.2+)
Handoff automatically guides AI to use appropriate commands:

**For Documentation/Analysis:**
- ✅ `yarn test:ci`, `npm run test:run`, `yarn lint:ci`
- ❌ `yarn test`, `npm test` (watch mode)
- ❌ `yarn start`, `npm start` (interactive)

**For Development:**
- ✅ `yarn test`, `yarn dev` (when human can control)

**For Browser Testing:**
- ✅ Playwright, Cypress, automated tools
- ❌ Manual browser interaction

## Documentation Sync (v0.1.2+)

All EPICs now include automatic documentation sync:

```markdown
documentation_sync: enabled
```

**What gets updated:**
- Golden paths for new user flows
- Architecture docs for new components
- API docs for new/modified endpoints
- BDD features for new functionality
- Test documentation for new patterns

## Expertise Levels

### Beginner
```markdown
expertise_level: beginner
```
- Detailed explanations of concepts
- Multiple choice options
- Guided decision-making

### Intermediate  
```markdown
expertise_level: intermediate
```
- Balanced explanations
- Some technical assumptions
- Moderate guidance

### Expert
```markdown
expertise_level: expert
```
- Minimal explanations
- Technical language
- Assumes deep knowledge

## Project-Specific Settings

### Architecture Constraints
```markdown
architecture_constraints:
- "Use TypeScript for all new code"
- "Follow existing error handling patterns"
- "Maintain test coverage above 80%"
```

### Coding Standards
```markdown
coding_standards:
- "Use ESLint configuration"
- "Follow existing naming conventions"
- "Document all public APIs"
```

### Review Preferences
```markdown
review_frequency: key-decisions-only
# Options: every-step, key-decisions-only, final-review-only
```

## CLI Configuration

### Global Settings
```bash
handoff config --global
```

### Project Settings
```bash
handoff config
```

### Available Options
- `--engagement-level`: Set default engagement level
- `--expertise-level`: Set your technical expertise
- `--review-frequency`: How often to request approval

## Example Configuration

```markdown
# .project/handoff-config.md

## Project Configuration
- **Engagement Level**: medium
- **Expertise Level**: intermediate  
- **Review Frequency**: key-decisions-only

## Architecture Constraints
- Use React with TypeScript
- Follow existing component patterns
- Maintain Jest test coverage above 80%
- Use Tailwind for styling

## Coding Standards
- ESLint configuration must pass
- All components must have PropTypes or TypeScript interfaces
- Use existing error handling patterns
- Document complex business logic

## Current Focus
Working on user authentication system using JWT tokens.
```

## Troubleshooting

### AI Ignores Configuration
- Ensure `.project/ai-quick-start.md` is the first file AI reads
- Check that configuration syntax is correct
- Verify AI assistant supports reading multiple files

### Inconsistent Behavior
- Review `.project/assumptions.md` for conflicting decisions
- Ensure all team members use same configuration
- Update configuration as project evolves

### Testing Issues
- New testing guidelines (v0.1.2+) prevent common hang issues
- AI will automatically avoid watch mode commands
- Use `yarn test:ci` instead of `yarn test` for documentation tasks