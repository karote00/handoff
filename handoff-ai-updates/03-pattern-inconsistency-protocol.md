# Pattern Inconsistency Communication Protocol - Implementation Guide

## 🎯 Objective
Add communication protocol to all EPIC workflows so AI agents communicate pattern inconsistencies in implementation areas instead of silently choosing patterns.

## 📝 Files to Update
All EPIC files in `templates/basic/.project/epics/`:
- `collaborative-documentation.md`
- `feature-implementation.md`
- `codebase-improvement.md`
- `codebase-exploration.md`

## 🔧 Implementation

### Add this section to ALL EPIC files (after the goal/overview section):

```markdown
## 🔍 Implementation-Area Pattern Communication Protocol

### **When AI Encounters Pattern Conflicts in Implementation Area**

**Only flag inconsistencies in code directly related to current implementation:**

**Scope of Analysis:**
- ✅ Files you need to modify for this feature
- ✅ Functions you need to integrate with
- ✅ Modules you need to extend or call
- ✅ Similar functionality you need to match
- ❌ Unrelated parts of the codebase
- ❌ Files you won't touch
- ❌ Legacy code that doesn't affect current work

**Communication Process:**
1. **Stop and inform user** about conflicts in the implementation area
2. **Show specific examples** from files you'll be working with
3. **Offer clear options** for the current implementation
4. **Get user approval** before continuing
5. **Document the decision** in assumptions.md for future reference

### **Communication Template**
```
⚠️ PATTERN INCONSISTENCY IN IMPLEMENTATION AREA

I found conflicting [pattern type] in the code I need to work with:

**Files I need to modify/integrate with:**
- File A (I need to modify): [specific example of pattern 1]
- File B (I need to integrate with): [specific example of pattern 2]  
- File C (similar functionality): [specific example of pattern 3]

**For this new implementation, I can:**
A) Follow Pattern 1 approach (matches File A I'm modifying)
B) Follow Pattern 2 approach (matches File B I'm integrating with)
C) Follow Pattern 3 approach (matches similar functionality)
D) Create adapter to work with existing patterns

**Which approach would you prefer?**
```

### **Common Pattern Conflicts to Watch For**
- **Async patterns**: callbacks vs promises vs async/await
- **Error handling**: exceptions vs error objects vs result types
- **Component patterns**: class vs functional components
- **State management**: local state vs global state vs context
- **API patterns**: REST vs GraphQL vs RPC
- **Testing patterns**: unit vs integration test approaches
- **Import patterns**: ES6 vs CommonJS vs dynamic imports
```

## ✅ Expected Result
AI agents will communicate pattern inconsistencies in implementation areas instead of silently choosing, leading to better user understanding and more consistent implementations.

## 🧪 Test
After implementation, test with:
```bash
npx handoff-ai init
# Check that all EPIC files contain the pattern communication protocol
# Test with a project that has mixed patterns to verify AI communicates conflicts
```