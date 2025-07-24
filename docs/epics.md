# Available EPICs

EPICs (Executable Project Implementation Cycles) are structured workflows that guide AI assistants through complex development tasks. Each EPIC provides a step-by-step framework for consistent, high-quality results.

## What are EPICs?

EPICs are markdown files that contain:
- **Structured workflows** for common development tasks
- **Context gathering** instructions for AI
- **Quality checkpoints** and validation steps
- **Documentation requirements** for knowledge persistence

## Available EPICs

### 1. Collaborative Documentation
**File:** `.project/epics/collaborative-documentation.md`

Generate comprehensive project documentation through AI collaboration:
- Architecture and design decisions
- API documentation and schemas
- Development guidelines and conventions
- Onboarding guides for new team members

**Best for:** New projects, documentation gaps, team knowledge sharing

### 2. Codebase Improvement
**File:** `.project/epics/codebase-improvement.md`

Systematically enhance existing codebases:
- Code quality analysis and refactoring
- Performance optimization
- Security vulnerability assessment
- Test coverage improvement

**Best for:** Legacy code, technical debt reduction, quality improvements

### 3. Feature Implementation
**File:** `.project/epics/feature-implementation.md`

Build new features following established patterns:
- Requirements analysis and planning
- Architecture-consistent implementation
- Comprehensive testing strategy
- Documentation and deployment

**Best for:** New feature development, maintaining consistency

### 4. Codebase Exploration
**File:** `.project/epics/codebase-exploration.md`

Understand and document unfamiliar codebases:
- Architecture discovery and mapping
- Pattern identification and documentation
- Dependency analysis
- Knowledge extraction for future work

**Best for:** New team members, inherited projects, code audits

## Using EPICs

### 1. Choose the Right EPIC
Select the EPIC that best matches your current task:
```bash
# View available EPICs
handoff-ai status
```

### 2. Share with Your AI Assistant
Copy the EPIC content and share it with your AI assistant:
```
"Please follow the Collaborative Documentation EPIC to help me document this React project. Use medium-engagement mode."
```

### 3. Follow the Workflow
Work through each phase of the EPIC:
- **Phase 1:** Context gathering and analysis
- **Phase 2:** Implementation or documentation
- **Phase 3:** Quality validation and testing
- **Phase 4:** Documentation updates and handoff

### 4. Customize for Your Project
EPICs are templates - adapt them to your specific needs:
- Add project-specific requirements
- Modify quality checkpoints
- Include custom validation steps

## EPIC Structure

Each EPIC follows a consistent structure:

```markdown
# EPIC Name

## Overview
Brief description and use cases

## Prerequisites
Required setup and context

## Phase 1: Analysis
Context gathering and planning

## Phase 2: Implementation
Core work execution

## Phase 3: Validation
Quality checks and testing

## Phase 4: Documentation
Knowledge capture and handoff

## Success Criteria
Measurable outcomes

## Handoff Checklist
Final validation steps
```

## Creating Custom EPICs

You can create project-specific EPICs:

1. **Create the file:** `.project/epics/custom-epic-name.md`
2. **Follow the structure:** Use existing EPICs as templates
3. **Add project context:** Include specific requirements and patterns
4. **Test with AI:** Validate the workflow with your AI assistant

### Example Custom EPIC Topics
- Database migration workflows
- Deployment and CI/CD setup
- Security audit procedures
- Performance testing protocols
- API integration patterns

## Best Practices

### For AI Collaboration
- **Be specific:** Include exact file paths and requirements
- **Set expectations:** Define quality standards and success criteria
- **Provide context:** Reference existing patterns and decisions
- **Validate results:** Include checkpoints and review steps

### For Team Consistency
- **Standardize workflows:** Use EPICs for common tasks
- **Document decisions:** Capture rationale and trade-offs
- **Share knowledge:** Make EPICs accessible to all team members
- **Iterate and improve:** Update EPICs based on experience

### For Project Evolution
- **Version control:** Track EPIC changes over time
- **Adapt to growth:** Update workflows as projects scale
- **Maintain relevance:** Regular review and updates
- **Knowledge transfer:** Use EPICs for onboarding and handoffs

## Integration with Handoff AI

EPICs work seamlessly with Handoff AI features:

- **Configuration:** Respects your collaboration mode and expertise level
- **Assumptions:** Documents AI decisions for human review
- **Templates:** Provides starting points for common workflows
- **Documentation:** Maintains project knowledge across sessions

## Troubleshooting

### EPIC Not Working as Expected?
1. **Check prerequisites:** Ensure all required context is available
2. **Review configuration:** Verify collaboration mode settings
3. **Provide more context:** Add project-specific details
4. **Break down tasks:** Split complex EPICs into smaller phases

### AI Not Following EPIC Structure?
1. **Be explicit:** Reference specific EPIC sections
2. **Set boundaries:** Clearly define scope and limitations
3. **Provide examples:** Show expected outputs and formats
4. **Iterate gradually:** Work through one phase at a time

## Contributing

Help improve EPICs for the community:
- **Share experiences:** Report what works and what doesn't
- **Contribute templates:** Submit new EPIC workflows
- **Improve documentation:** Enhance clarity and examples
- **Test with different AIs:** Validate cross-platform compatibility

---

EPICs transform ad-hoc AI interactions into structured, repeatable workflows that deliver consistent, high-quality results while building institutional knowledge for your project.