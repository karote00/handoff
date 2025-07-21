# AI Quick Start Pattern Guidance - Implementation Guide

## 🎯 Objective
Add pattern inconsistency guidance to the ai-quick-start.md template so AI agents know how to handle conflicting patterns.

## 📝 File to Update
`templates/basic/.project/ai-quick-start.md`

## 🔧 Implementation

### Add this section after the existing content:

```markdown
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
```

## ✅ Expected Result
AI agents will have clear guidance on how to handle pattern inconsistencies, focusing only on implementation-relevant conflicts and always communicating with users.

## 🧪 Test
After implementation, test with:
```bash
npx handoff-ai init
# Check that .project/ai-quick-start.md contains the pattern guidance
# Test with AI assistant to verify it follows the guidance
```