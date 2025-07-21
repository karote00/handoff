# Documentation Sync Phase - Implementation Guide

## 🎯 Objective
Add a final documentation sync phase to all EPIC workflows to ensure project documentation stays current with code changes.

## 📝 Files to Update
All EPIC files in `templates/basic/.project/epics/`:
- `collaborative-documentation.md`
- `feature-implementation.md`
- `codebase-improvement.md`
- `codebase-exploration.md`

## 🔧 Implementation

### Add this as the final phase to ALL EPIC files:

```markdown
## Phase [N]: Documentation Sync & Handoff Preparation

### **Goal**
Update project documentation with new patterns, decisions, and functionality before PR/merge, ensuring knowledge is preserved for future AI sessions and team members.

### 🤝 High Engagement Mode
**AI Actions**:
- Present documentation update plan to human
- Collaborate on updating each type of documentation
- Get approval for each major documentation change

**Human Actions**:
- Review and approve documentation updates
- Provide context for business logic changes
- Validate that new patterns are accurately documented

### 🎯 Medium Engagement Mode
**AI Actions**:
- Automatically update obvious documentation (API changes, new components)
- Present summary of major changes for approval
- Update assumptions log with implementation decisions

**Human Actions**:
- Quick review and approval of documentation changes
- Provide feedback on any inaccuracies

### 🚀 Auto-Pilot Mode
**AI Actions**:
- Automatically update all relevant documentation
- Log all changes in assumptions for later review
- Flag any complex changes that might need human review

### **Documentation Update Checklist**
- [ ] **Golden paths** updated for new user flows
- [ ] **Architecture docs** reflect new components/patterns  
- [ ] **BDD features** cover new functionality
- [ ] **API docs** updated for new/modified endpoints
- [ ] **Assumptions log** updated with implementation decisions
- [ ] **Test documentation** reflects new test patterns
- [ ] **Configuration files** updated if new dependencies added
- [ ] **README** updated if setup process changed

### **Output**
Updated project documentation ready for PR review and team handoff, ensuring the next developer (or AI session) has complete context about the changes made.
```

## ✅ Expected Result
All EPICs will include a final phase that ensures documentation stays current with code changes, maintaining the "persistent knowledge" value proposition.

## 🧪 Test
After implementation, test with:
```bash
npx handoff-ai init
# Check that all EPIC files contain the documentation sync phase
```