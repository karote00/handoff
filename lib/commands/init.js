const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function initCommand(options) {
    const templateType = options.template || 'basic';
    
    // Check if .project already exists
    if (await fs.pathExists('.project')) {
        console.log(chalk.yellow('⚠️  .project folder already exists!'));
        console.log('Handoff AI is already initialized in this project.');
        return;
    }
    
    try {
        // Create .project directory
        await fs.ensureDir('.project');
        await fs.ensureDir('.project/epics');
        
        // Get template path
        const templatePath = path.join(__dirname, '../../templates', templateType);
        
        if (!await fs.pathExists(templatePath)) {
            throw new Error(`Template '${templateType}' not found`);
        }
        
        // Copy template files
        const templateProjectPath = path.join(templatePath, '.project');
        if (await fs.pathExists(templateProjectPath)) {
            await fs.copy(templateProjectPath, '.project');
        }
        
        // Copy root template files (like RELEASE_PROCESS.md)
        const templateFiles = await fs.readdir(templatePath);
        for (const file of templateFiles) {
            if (file !== '.project') {
                const srcPath = path.join(templatePath, file);
                const destPath = path.join('.', file);
                
                // Only copy if destination doesn't exist
                if (!await fs.pathExists(destPath)) {
                    await fs.copy(srcPath, destPath);
                }
            }
        }
        
        console.log(chalk.green('✔ Handoff AI initialized successfully! 🎉\n'));
        
        console.log(chalk.green('✅ Your project now has Handoff AI support!\n'));
        
        console.log('Next steps:');
        console.log('  1. Review .project/handoff-config.md to set your preferences');
        console.log('  2. Tell your AI assistant: "Check my .project folder and help me with [task]"');
        console.log('  3. Choose a collaboration mode: collaborate, automatic, guided, or review-only');
        
    } catch (error) {
        console.error(chalk.red('❌ Failed to initialize Handoff AI:'));
        console.error(chalk.red(error.message));
    }
}

module.exports = { initCommand };