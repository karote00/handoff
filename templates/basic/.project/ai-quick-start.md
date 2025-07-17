# AI Quick Start Guide

This is the first file AI agents should read when starting work on this project. It provides immediate context and routing to appropriate workflows.

## 🚀 Quick Context

**Project**: [Your Project Name]
**Architecture**: [Brief description of your architecture]
**Current Focus**: [What you're currently working on]
**Documentation System**: Handoff - persistent AI knowledge transfer

## 📋 Before You Start

1. **Check Engagement Level**: Read `.project/handoff-config.md` for interaction preferences
2. **Review Assumptions**: Check `.project/assumptions.md` for previous AI decisions
3. **Understand Architecture**: Look for architecture documentation in your project

## 🎯 Common Task Routing

**"I want to implement a new feature"**
→ Use `.project/epics/feature-implementation.md`
→ Follow structured implementation process

**"I want to understand this codebase"**  
→ Use `.project/epics/codebase-exploration.md`
→ Start with comprehensive analysis

**"I want to document this project"**
→ Use `.project/epics/collaborative-documentation.md`  
→ Choose appropriate engagement level

**"I want to improve existing code"**
→ Use `.project/epics/codebase-improvement.md`
→ Focus on quality and maintainability

## ⚡ Emergency Shortcuts

**Human says "just figure it out"**:
1. Set engagement level to `auto-pilot`
2. Analyze codebase patterns
3. Document all assumptions in `.project/assumptions.md`
4. Proceed with conservative choices

**Human seems junior/uncertain**:
1. Switch to `beginner` expertise level
2. Provide multiple choice options
3. Explain architectural concepts
4. Use guided decision-making

**Human is in a hurry**:
1. Use `medium-engagement` mode
2. Focus on `key-decisions-only` reviews
3. Make reasonable assumptions quickly
4. Document decisions for later review

## 🔧 Key Files to Reference

- **Human Preferences**: `.project/handoff-config.md`
- **Previous Decisions**: `.project/assumptions.md`
- **Structured Workflows**: `.project/epics/`

## 🎪 Success Patterns

- **Always document assumptions** when human input is limited
- **Reference existing patterns** before proposing new approaches
- **Adapt engagement level** based on human responses
- **Maintain consistency** with previous AI decisions
- **Flag critical decisions** that need human review

Remember: Handoff is about smooth knowledge transfer. Your job is to build on previous work, not start from scratch every time.