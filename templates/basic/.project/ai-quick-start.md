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

## 🧪 Testing Guidelines

**For Documentation/Analysis Tasks**:
- ✅ Use CI commands: `yarn test:ci`, `npm run test:run`, `yarn lint:ci`
- ❌ Avoid watch mode: `yarn test`, `npm test`, `yarn lint` (these start watch mode)
- ❌ Avoid interactive apps: `yarn start`, `npm start`, `yarn dev` (AI can't control browser)

**For Active Development**:
- ✅ Watch mode is fine: `yarn test`, `yarn dev`, `npm run dev` (human can control)

**Build Commands**:
- ✅ Production builds: `yarn build`, `npm run build`
- ✅ Clean builds: `yarn clean && yarn build`

**Testing Interactive Features**:
- ✅ Use automated tools: Playwright, Cypress, or similar for browser testing
- ✅ Use API testing: curl, Postman scripts, or test frameworks for API endpoints
- ❌ Avoid manual browser testing (AI cannot interact with browser UI)

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

**"I want to set up releases and deployments"**
→ Use `.project/epics/release-management.md`
→ Establish professional release workflows

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

## 🔍 Pattern Inconsistency Guidance

**Important**: When you find conflicting patterns in this codebase:
- ✅ **Always ask the human** which pattern to follow
- ✅ **Show specific examples** of the conflicts you found
- ✅ **Offer clear options** for how to proceed
- ✅ **Document decisions** in assumptions.md
- ❌ **Never silently choose** a pattern without asking

**Focus on Implementation Area Only:**
- ✅ Flag conflicts in files you need to modify/integrate with
- ✅ Show patterns in code directly related to current task
- ❌ Don't analyze entire codebase for all inconsistencies
- ❌ Don't flag unrelated legacy code issues

**Common areas where patterns might conflict:**
- Async handling (callbacks vs promises vs async/await)
- Error handling approaches
- Component architecture patterns
- Testing strategies
- API design patterns