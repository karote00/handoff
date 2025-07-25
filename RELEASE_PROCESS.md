# Release Process for Handoff AI

This document defines the official release workflow for new features and documentation updates.

## 🚀 New Feature Release Process

Follow these steps **ONLY** for new features (not for README-only updates):

### 1. Pre-Release Checks
- ✅ Ensure all changes are pushed to GitHub
- ✅ Verify no irrelevant files will be committed
- ✅ Add files to `.gitignore` if needed
- ✅ Clean up any test artifacts or temporary files

### 2. Version Management
- ✅ Update version in `package.json` (follow semantic versioning)
- ✅ Ensure CLI version reads dynamically from `package.json`
- ✅ Create git tag matching the version

### 3. Documentation Updates
- ✅ Update README.md with new features and usage examples
- ✅ Update docs/examples.md with new integration patterns
- ✅ Update relevant documentation files for new functionality
- ✅ Ensure all examples reflect the new features

### 4. Release Documentation
- ✅ Write comprehensive release notes in a markdown file
- ✅ Include: features added, improvements, technical details, installation instructions
- ✅ Use the markdown file for GitHub release (avoid shell interpretation issues)

### 5. NPM Publication
- ✅ Run `npm publish`
- ✅ Verify package is published successfully

### 6. Post-Publication Testing
- ✅ Test the published package with `npx handoff-ai@x.x.x --version`
- ✅ Test all new features work correctly in clean environment
- ✅ Verify CLI commands and help text
- ✅ Test full workflows with new features (not just command execution)
- ✅ Test in multiple environments (terminal, simulated IDE usage)

### 7. GitHub Release
- ✅ If testing passes: Create GitHub release using the markdown file
- ✅ If testing fails: Fix issues and return to step 1

### 8. Final Verification & Cleanup
- ✅ Confirm GitHub has all updates
- ✅ Confirm release notes are correct
- ✅ Confirm NPM package works in real scenarios
- ✅ Remove release notes file after successful GitHub release
- ✅ **NOTIFY TEAM**: Release is complete

## 📝 README-Only Updates

For documentation updates that don't involve new features:

### Simple Process
1. ✅ Update README.md
2. ✅ Commit and push to GitHub
3. ✅ **DONE** - No version bump, no NPM publish, no GitHub release needed

## 🔄 Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **Major** (x.0.0): Breaking changes
- **Minor** (0.x.0): New features, backwards compatible
- **Patch** (0.0.x): Bug fixes, documentation improvements

## 📋 Release Checklist Template

```markdown
## Release vX.X.X Checklist

### Pre-Release
- [ ] All changes pushed to GitHub
- [ ] No irrelevant files in commit
- [ ] Test artifacts cleaned up
- [ ] Version updated in package.json
- [ ] Git tag created

### Release Notes
- [ ] Release notes written in markdown file
- [ ] Features and improvements documented
- [ ] Installation instructions included

### Publication
- [ ] NPM publish successful
- [ ] Package version verified
- [ ] New features tested with npx

### GitHub Release
- [ ] GitHub release created
- [ ] Release notes uploaded
- [ ] All links working

### Final
- [ ] Team notified
- [ ] Release process complete
```

## 🚨 Important Notes

- **README updates**: Do NOT follow the full release process
- **Feature releases**: ALWAYS follow the complete process
- **Testing**: Never skip the NPX testing step
- **Release notes**: Always use markdown file to avoid shell issues
- **Version sync**: CLI version must read from package.json dynamically

## 🛠️ Common Commands

```bash
# Version update
npm version patch|minor|major

# Create tag
git tag -a v0.x.x -m "Release v0.x.x: Description"

# Push with tags
git push origin main --tags

# Test published package
npx handoff-ai@0.x.x --version
npx handoff-ai@0.x.x inject-docs --help

# GitHub release with file
gh release create v0.x.x --title "Title" --notes-file release-notes.md
```

---

**Remember**: This process ensures quality releases and prevents issues like shell interpretation errors, version mismatches, and broken packages.