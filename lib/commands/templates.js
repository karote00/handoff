const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function templatesCommand() {
    console.log(chalk.blue('📋 Available Templates\n'));
    
    try {
        const templatesDir = path.join(__dirname, '../../templates');
        const templates = await fs.readdir(templatesDir);
        
        console.log(chalk.green('Template Types:\n'));
        
        for (const template of templates) {
            const templatePath = path.join(templatesDir, template);
            const stat = await fs.stat(templatePath);
            
            if (stat.isDirectory()) {
                console.log(chalk.cyan(`${template}`) + ' template');
                
                // Try to read template description or show default info
                switch (template) {
                    case 'basic':
                        console.log('  • Minimal setup for small projects');
                        console.log('  • Includes core EPICs and configuration');
                        console.log('  • Perfect for solo developers or simple projects');
                        break;
                    case 'full':
                        console.log('  • Comprehensive setup with all EPICs');
                        console.log('  • Advanced configuration options');
                        console.log('  • Best for complex projects and teams');
                        break;
                    case 'team':
                        console.log('  • Multi-developer collaboration setup');
                        console.log('  • Team-specific workflows and guidelines');
                        console.log('  • Enhanced communication protocols');
                        break;
                    default:
                        console.log('  • Custom template configuration');
                }
                
                // Show what's included
                const templateProjectPath = path.join(templatePath, '.project');
                if (await fs.pathExists(templateProjectPath)) {
                    const epicsPath = path.join(templateProjectPath, 'epics');
                    if (await fs.pathExists(epicsPath)) {
                        const epics = await fs.readdir(epicsPath);
                        const epicCount = epics.filter(f => f.endsWith('.md')).length;
                        console.log(`  • ${epicCount} EPIC workflows included`);
                    }
                }
                
                console.log('');
            }
        }
        
        console.log(chalk.green('Usage:'));
        console.log('• ' + chalk.cyan('handoff-ai init') + ' - Use basic template (default)');
        console.log('• ' + chalk.cyan('handoff-ai init --template full') + ' - Use full template');
        console.log('• ' + chalk.cyan('handoff-ai init --template team') + ' - Use team template');
        
        console.log('\n' + chalk.blue('💡 Choose the template that best matches your project size and team structure.'));
        
    } catch (error) {
        console.error(chalk.red('❌ Failed to list templates:'));
        console.error(chalk.red(error.message));
    }
}

module.exports = { templatesCommand };