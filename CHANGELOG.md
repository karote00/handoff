# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.5] - 2025-01-18

### Fixed
- Applied code formatting and autofix improvements
- Ensured consistent code style across all files

## [0.1.4] - 2025-01-18

### Fixed
- Fixed CLI version mismatch between package.json and bin/handoff.js
- Both now correctly report version 0.1.4

### Added
- Added comprehensive configuration documentation (docs/configuration.md)

## [0.1.2] - 2025-01-18

### Added
- **Testing Command Guidelines**: Added comprehensive testing guidelines to `ai-quick-start.md` to prevent AI agents from using watch mode commands that hang processes
  - Guidance on using CI commands (`yarn test:ci`, `npm run test:run`) for documentation/analysis tasks
  - Warning against interactive commands (`yarn start`, `npm start`) that AI cannot control
  - Recommendations for automated testing tools (Playwright, Cypress) for browser testing
- **Documentation Sync Phase**: Added final documentation sync phase to all EPIC workflows
  - Ensures project documentation is updated before PR/merge
  - Preserves knowledge for future AI sessions and team members
  - Includes comprehensive documentation update checklist
  - Supports all engagement modes (High, Medium, Auto-Pilot)

### Changed
- Updated all EPIC files with new documentation sync phase:
  - `feature-implementation.md` - Phase 7: Documentation Sync & Handoff Preparation
  - `codebase-improvement.md` - Phase 6: Documentation Sync & Handoff Preparation  
  - `collaborative-documentation.md` - Phase 5: Documentation Sync & Handoff Preparation
  - `codebase-exploration.md` - Phase 7: Documentation Sync & Handoff Preparation

### Fixed
- Resolved issue where AI agents would hang on watch mode commands during documentation tasks
- Addressed knowledge loss when features are completed without updating project documentation

## [0.1.1] - Previous Release

### Added
- Initial release with basic Handoff AI framework
- Template system for AI collaboration
- EPIC workflows for different development scenarios
- Engagement level system (High, Medium, Auto-Pilot)

## [0.1.0] - Initial Release

### Added
- Core Handoff AI framework
- Basic project templates
- CLI tool for project initialization