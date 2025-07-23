const fs = require('fs-extra');
const chalk = require('chalk');

async function modeCommand(options) {
    console.log(chalk.blue('🤝 Collaboration Modes\n'));
    
    if (options.list) {
        console.log(chalk.green('Available Collaboration Modes:\n'));
        
        console.log(chalk.cyan('collaborate') + ' (Rich interaction)');
        console.log('  • AI asks clarifying questions before proceeding');
        console.log('  • Validates assumptions with human input');
        console.log('  • Best for: Complex projects, critical decisions\n');
        
        console.log(chalk.cyan('automatic') + ' (Minimal interaction)');
        console.log('  • AI makes decisions independently');
        console.log('  • Documents what it did and why');
        console.log('  • Best for: Simple tasks, routine work\n');
        
        console.log(chalk.cyan('guided') + ' (Structured decision-making)');
        console.log('  • AI presents options with pros/cons');
        console.log('  • Human chooses, AI executes');
        console.log('  • Best for: Learning, team environments\n');
        
        console.log(chalk.cyan('review-only') + ' (Batch feedback)');
        console.log('  • AI completes entire tasks independently');
        console.log('  • Presents final result for approval/rejection');
        console.log('  • Best for: Experienced developers, routine tasks, time pressure\n');
        
        return;
    }
    
    const configPath = '.project/handoff-config.md';
    if (!await fs.pathExists(configPath)) {
        console.log(chalk.yellow('No Handoff configuration found.'));
        console.log('Run ' + chalk.cyan('handoff-ai init') + ' to initialize Handoff in this project.');
        return;
    }
    
    if (options.set) {
        const validModes = ['collaborate', 'automatic', 'guided', 'review-only'];
        if (!validModes.includes(options.set)) {
            console.log(chalk.red(`Invalid mode: ${options.set}`));
            console.log('Valid modes: ' + validModes.join(', '));
            return;
        }
        
        try {
            let config = await fs.readFile(configPath, 'utf8');
            
            // Update the default collaboration mode
            config = config.replace(
                /default_collaboration_mode:\s*\w+/,
                `default_collaboration_mode: ${options.set}`
            );
            
            await fs.writeFile(configPath, config, 'utf8');
            console.log(chalk.green(`✅ Collaboration mode set to: ${options.set}`));
            
        } catch (error) {
            console.log(chalk.red('Error updating configuration:'), error.message);
        }
    } else {
        // Show current mode
        try {
            const config = await fs.readFile(configPath, 'utf8');
            const modeMatch = config.match(/default_collaboration_mode:\s*(\w+)/);
            const currentMode = modeMatch ? modeMatch[1] : 'collaborate';
            
            console.log(`Current collaboration mode: ${chalk.green(currentMode)}`);
            console.log('\nUse ' + chalk.cyan('handoff-ai mode --list') + ' to see all available modes');
            console.log('Use ' + chalk.cyan('handoff-ai mode --set <mode>') + ' to change mode');
            
        } catch (error) {
            console.log(chalk.red('Error reading configuration:'), error.message);
        }
    }
}

module.exports = { modeCommand };