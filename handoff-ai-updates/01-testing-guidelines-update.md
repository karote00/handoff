# Testing Guidelines Update - Implementation Guide

## 🎯 Objective
Add testing command guidelines to prevent AI from using watch mode commands during documentation/analysis tasks.

## 📝 File to Update
`templates/basic/.project/ai-quick-start.md`

## 🔧 Implementation

### Add this section after the project context section:

```markdown
## 🧪 Testing Guidelines

**For Documentation/Analysis Tasks**:
- ✅ Use CI commands: `yarn test:ci`, `npm run test:run`, `yarn lint:ci`
- ❌ Avoid watch mode: `yarn test`, `npm test`, `yarn lint` (these start watch mode)

**For Active Development**:
- ✅ Watch mode is fine: `yarn test`, `yarn dev`, `npm run dev`

**Build Commands**:
- ✅ Production builds: `yarn build`, `npm run build`
- ✅ Clean builds: `yarn clean && yarn build`
```

## ✅ Expected Result
AI assistants will use non-watch mode commands when documenting or analyzing projects, preventing hanging processes.

## 🧪 Test
After implementation, test with:
```bash
npx handoff-ai init
# Check that .project/ai-quick-start.md contains the testing guidelines
```