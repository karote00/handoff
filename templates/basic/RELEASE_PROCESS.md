# Release Process

This document defines the official release workflow for your project.

## 🚀 New Feature Release Process

Follow these steps for new features, bug fixes, or significant changes:

### 1. Pre-Release Checks
- ✅ Ensure all changes are pushed to your repository
- ✅ Verify no irrelevant files will be committed
- ✅ Add files to `.gitignore` if needed
- ✅ Clean up any test artifacts or temporary files

### 2. Version Management
- ✅ Update version in `package.json` (follow semantic versioning)
- ✅ Ensure any CLI tools read version dynamically
- ✅ Create git tag matching the version

### 3. Documentation Updates
- ✅ Update README.md with new features and usage examples
- ✅ Update relevant documentation files for new functionality
- ✅ Ensure all examples reflect the new features
- ✅ Update integration guides and API documentation

### 4. Release Documentation
- ✅ Write comprehensive release notes in a markdown file
- ✅ Include: features added, improvements, technical details, installation instructions
- ✅ Use the markdown file for GitHub release (avoid shell interpretation issues)

### 5. Package Publication (if applicable)
- ✅ Run `npm publish` or equivalent for your platform
- ✅ Verify package is published successfully

### 6. Post-Publication Testing
- ✅ Test the published package works correctly (use latest, not specific version)
- ✅ Verify all new features function as expected in clean environment
- ✅ Test installation and basic functionality
- ✅ Test full workflows with new features (not just command execution)
- ✅ Test in multiple environments if applicable

### 7. Repository Release
- ✅ If testing passes: Create repository release using the markdown file
- ✅ If testing fails: Fix issues and return to step 1

### 8. Final Verification & Cleanup
- ✅ Confirm repository has all updates
- ✅ Confirm release notes are correct
- ✅ Confirm package works (if applicable)
- ✅ **NOTIFY TEAM**: Release is complete

## 📝 Documentation-Only Updates

For documentation updates that don't involve code changes:

### Simple Process
1. ✅ Update documentation files
2. ✅ Commit and push to repository
3. ✅ **DONE** - No version bump or package publish needed

## 🔄 Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features, backwards compatible
- **Patch** (0.0.x): Bug fixes, documentation improvements

## 📋 Release Checklist Template

```markdown
## Release vX.X.X Checklist

### Pre-Release
- [ ] All changes pushed to repository
- [ ] No irrelevant files in commit
- [ ] Test artifacts cleaned up
- [ ] Version updated in package files
- [ ] Git tag created

### Release Notes
- [ ] Release notes written in markdown file
- [ ] Features and improvements documented
- [ ] Installation/upgrade instructions included

### Publication (if applicable)
- [ ] Package publish successful
- [ ] Package version verified
- [ ] New features tested

### Repository Release
- [ ] Repository release created
- [ ] Release notes uploaded
- [ ] All links working

### Final
- [ ] Team notified
- [ ] Release process complete
```

## 🚨 Important Notes

- **Documentation updates**: Do NOT follow the full release process
- **Feature releases**: ALWAYS follow the complete process
- **Testing**: Never skip the testing step
- **Release notes**: Use markdown files to avoid shell interpretation issues
- **Automation**: Consider automating repetitive steps

## 🛠️ Common Commands

Customize these for your project:

```bash
# Version update (Node.js/npm example)
npm version patch|minor|major

# Create tag
git tag -a v0.x.x -m "Release v0.x.x: Description"

# Push with tags
git push origin main --tags

# Test published package (npm example)
npx your-package --version  # Test latest published version
npx your-package@0.x.x --version  # Only for testing specific versions

# GitHub release with file
gh release create v0.x.x --title "Title" --notes-file release-notes.md
```

---

**Customize this process for your specific project needs and technology stack.**