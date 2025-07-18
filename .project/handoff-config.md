# Handoff Configuration

This file defines how AI agents should interact with humans in this project. It serves as the default behavior that can be overridden per session.

## Default Engagement Level

**Current Setting**: `medium-engagement`

Available options:
- `high-engagement`: Collaborative, detailed human input required
- `medium-engagement`: Guided, AI makes reasonable assumptions with human approval
- `auto-pilot`: Autonomous, AI makes all decisions and documents assumptions

## Project-Specific Preferences

### Human Expertise Level
**Setting**: `intermediate`
- `expert`: Assume deep architectural knowledge, use technical language
- `intermediate`: Provide context for complex decisions, offer multiple options
- `beginner`: Explain concepts, provide guided choices, use clear language

### Review Requirements
**Setting**: `key-decisions-only`
- `every-step`: Human reviews each phase before proceeding
- `key-decisions-only`: Human reviews major architectural decisions
- `final-review`: Human reviews completed work before commit
- `post-implementation`: Human can review and adjust after completion

### Documentation Depth
**Setting**: `comprehensive`
- `minimal`: Basic documentation for immediate needs
- `standard`: Good coverage of main components and patterns
- `comprehensive`: Detailed documentation including edge cases and rationale

### AI Autonomy Boundaries
**What AI can do without asking**:
- ✅ Analyze existing code patterns
- ✅ Generate documentation following established templates
- ✅ Make assumptions based on industry standards
- ✅ Create implementation plans

**What requires human approval**:
- ⚠️ Major architectural decisions
- ⚠️ Breaking changes to existing patterns
- ⚠️ External dependency additions
- ⚠️ Final commits to main branch

## Session Overrides

Humans can override these defaults by saying:
- "Use high-engagement mode for this task"
- "Go full auto-pilot on this"
- "I'm in a hurry, just make reasonable choices"
- "I want to review every step"

## Learning Preferences

**Feedback Style**: `direct`
- `direct`: Clear yes/no feedback, specific corrections
- `collaborative`: Discussion-based, explore alternatives together
- `educational`: Explain reasoning, help human learn architectural concepts