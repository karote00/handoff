const chalk = require('chalk');

async function startCommand() {
    console.log(chalk.blue('🚀 Welcome to Handoff AI!\n'));
    
    console.log('Handoff AI creates persistent knowledge for smooth AI collaboration.\n');
    
    console.log(chalk.green('Quick Start:'));
    console.log('1. ' + chalk.cyan('handoff-ai init') + ' - Initialize Handoff in your project');
    console.log('2. ' + chalk.cyan('handoff-ai config') + ' - Configure your preferences');
    console.log('3. Tell your AI: ' + chalk.yellow('"Check my .project folder and help me with [task]"'));
    
    console.log('\n' + chalk.green('Available Commands:'));
    console.log('• ' + chalk.cyan('handoff-ai init') + ' - Set up Handoff in your project');
    console.log('• ' + chalk.cyan('handoff-ai config') + ' - Configure engagement level and preferences');
    console.log('• ' + chalk.cyan('handoff-ai status') + ' - Check current configuration');
    console.log('• ' + chalk.cyan('handoff-ai mode') + ' - View/set collaboration mode');
    console.log('• ' + chalk.cyan('handoff-ai inject-docs') + ' - Generate inline documentation');
    console.log('• ' + chalk.cyan('handoff-ai templates') + ' - List available project templates');
    
    console.log('\n' + chalk.green('Collaboration Modes:'));
    console.log('• ' + chalk.cyan('collaborate') + ' - Rich interaction, validates assumptions');
    console.log('• ' + chalk.cyan('automatic') + ' - Minimal interaction, works independently');
    console.log('• ' + chalk.cyan('guided') + ' - Structured decision-making with options');
    console.log('• ' + chalk.cyan('review-only') + ' - Batch feedback on completed tasks');
    
    console.log('\n' + chalk.green('Example AI Interactions:'));
    console.log('• "Help me implement user authentication using collaborate mode"');
    console.log('• "Document this codebase using the collaborative-documentation EPIC"');
    console.log('• "Improve this code using guided mode for learning"');
    console.log('• "Set up professional releases using the release-management EPIC"');
    
    console.log('\n' + chalk.blue('💡 Pro Tip:') + ' Start with ' + chalk.cyan('handoff-ai init') + ' to create your .project folder!');
}

module.exports = { startCommand };