#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const { injectDocs, applyDocumentationChanges, displayDryRunResults } = require('../lib/inject-docs');

// Read version from package.json
const packageJson = require('../package.json');

const program = new Command();

program
    .name('handoff-ai')
    .description('AI collaboration framework for persistent project knowledge')
    .version(packageJson.version);

// Show start command prominently when no command is given
if (process.argv.length === 2) {
    console.log(chalk.blue('🚀 Welcome to Handoff AI!\n'));
    console.log(chalk.green('Quick start: handoff-ai start'));
    console.log(chalk.gray('Full help: handoff-ai --help\n'));
}

program
    .command('start')
    .description('Quick start guide for new users')
    .action(async () => {
        console.log(chalk.blue('🚀 Welcome to Handoff AI!\n'));
        
        // Check if already initialized
        if (await fs.pathExists('.project')) {
            console.log(chalk.green('✅ Handoff AI is already set up in this project!\n'));
            
            console.log(chalk.blue('Next steps:'));
            console.log('  1. Tell your AI assistant: "Check my .project folder and help me with [task]"');
            console.log('  2. Choose an engagement level:');
            console.log('     • high-engagement (collaborative)');
            console.log('     • medium-engagement (guided)'); 
            console.log('     • auto-pilot (autonomous)');
            console.log('\n  3. Try these common tasks:');
            console.log('     • "Help me implement user authentication using medium-engagement mode"');
            console.log('     • "Use the codebase exploration EPIC to understand this project"');
            console.log('     • "Document this project using collaborative documentation EPIC"');
            
            console.log(chalk.gray('\n💡 Run "handoff-ai config" to change your preferences'));
            return;
        }

        // Guide new users through setup
        console.log(chalk.yellow('Let\'s get you set up! This will take 30 seconds.\n'));

        const { shouldInit } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'shouldInit',
                message: 'Initialize Handoff AI in this project?',
                default: true
            }
        ]);

        if (!shouldInit) {
            console.log(chalk.blue('👋 No problem! Run "handoff-ai start" anytime to get started.'));
            return;
        }

        // Quick setup
        const spinner = ora('Setting up Handoff AI...').start();
        
        try {
            const templatePath = path.join(__dirname, '..', 'templates', 'basic');
            await fs.copy(templatePath, '.');
            spinner.succeed('Handoff AI set up successfully! 🎉');

            console.log(chalk.green('\n🎯 You\'re ready to go!\n'));
            
            console.log(chalk.blue('Tell your AI assistant:'));
            console.log(chalk.white('  "Check my .project folder and help me implement user authentication using medium-engagement mode"\n'));
            
            console.log(chalk.blue('Available engagement levels:'));
            console.log('  • high-engagement - Collaborative, detailed discussions');
            console.log('  • medium-engagement - Guided with key approvals (recommended)');
            console.log('  • auto-pilot - Autonomous with assumption logging\n');
            
            console.log(chalk.gray('💡 Run "handoff-ai config" to customize your preferences'));
            console.log(chalk.gray('💡 Run "handoff-ai status" to see what\'s available'));

        } catch (error) {
            spinner.fail('Setup failed');
            console.error(chalk.red(error.message));
        }
    });

program
    .command('init')
    .description('Initialize Handoff in your project')
    .option('-t, --template <type>', 'Template type (basic, full, team)', 'basic')
    .action(async (options) => {
        const spinner = ora('Initializing Handoff AI...').start();

        try {
            // Check if .project already exists
            if (await fs.pathExists('.project')) {
                spinner.stop();
                console.log(chalk.yellow('⚠️  .project folder already exists!'));

                const { overwrite } = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'overwrite',
                        message: 'Do you want to overwrite the existing .project folder?',
                        default: false
                    }
                ]);

                if (!overwrite) {
                    console.log(chalk.blue('ℹ️  Handoff AI initialization cancelled.'));
                    return;
                }

                await fs.remove('.project');
                spinner.start('Reinitializing Handoff AI...');
            }

            // Get template path
            const templatePath = path.join(__dirname, '..', 'templates', options.template);

            if (!(await fs.pathExists(templatePath))) {
                spinner.fail(`Template "${options.template}" not found!`);
                console.log(chalk.red('Available templates: basic, full, team'));
                return;
            }

            // Copy template
            await fs.copy(templatePath, '.');

            spinner.succeed('Handoff AI initialized successfully! 🎉');

            console.log(chalk.green('\n✅ Your project now has Handoff AI support!'));
            console.log(chalk.blue('\nNext steps:'));
            console.log('  1. Review .project/handoff-config.md to set your preferences');
            console.log('  2. Tell your AI assistant: "Check my .project folder and help me with [task]"');
            console.log('  3. Choose an engagement level: high-engagement, medium-engagement, or auto-pilot');

        } catch (error) {
            spinner.fail('Failed to initialize Handoff');
            console.error(chalk.red(error.message));
        }
    });

program
    .command('config')
    .description('Configure Handoff settings')
    .action(async () => {
        if (!(await fs.pathExists('.project/handoff-config.md'))) {
            console.log(chalk.red('❌ No Handoff AI configuration found. Run "handoff-ai init" first.'));
            return;
        }

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'engagement',
                message: 'What is your preferred engagement level?',
                choices: [
                    { name: 'High Engagement - Collaborative, detailed input', value: 'high-engagement' },
                    { name: 'Medium Engagement - Guided with key approvals', value: 'medium-engagement' },
                    { name: 'Auto-Pilot - Autonomous with assumption logging', value: 'auto-pilot' }
                ]
            },
            {
                type: 'list',
                name: 'expertise',
                message: 'What is your technical expertise level?',
                choices: [
                    { name: 'Expert - Deep technical knowledge', value: 'expert' },
                    { name: 'Intermediate - Some experience', value: 'intermediate' },
                    { name: 'Beginner - New to development', value: 'beginner' }
                ]
            },
            {
                type: 'list',
                name: 'review',
                message: 'How often do you want to review AI decisions?',
                choices: [
                    { name: 'Every Step - Review each phase', value: 'every-step' },
                    { name: 'Key Decisions - Review major decisions only', value: 'key-decisions-only' },
                    { name: 'Final Review - Review completed work', value: 'final-review' },
                    { name: 'Post Implementation - Review after completion', value: 'post-implementation' }
                ]
            }
        ]);

        // Update config file
        let config = await fs.readFile('.project/handoff-config.md', 'utf8');

        config = config.replace(
            /\*\*Current Setting\*\*: `[^`]+`/,
            `**Current Setting**: \`${answers.engagement}\``
        );

        config = config.replace(
            /\*\*Setting\*\*: `[^`]+`/,
            `**Setting**: \`${answers.expertise}\``
        );

        config = config.replace(
            /\*\*Setting\*\*: `[^`]+`/g,
            `**Setting**: \`${answers.review}\``
        );

        await fs.writeFile('.project/handoff-config.md', config);

        console.log(chalk.green('✅ Handoff configuration updated!'));
        console.log(chalk.blue('\nYour settings:'));
        console.log(`  Engagement Level: ${answers.engagement}`);
        console.log(`  Expertise Level: ${answers.expertise}`);
        console.log(`  Review Frequency: ${answers.review}`);
    });

program
    .command('status')
    .description('Show Handoff status and configuration')
    .action(async () => {
        if (!(await fs.pathExists('.project'))) {
            console.log(chalk.red('❌ Handoff AI not initialized. Run "handoff-ai init" to get started.'));
            return;
        }

        console.log(chalk.green('✅ Handoff AI is initialized in this project'));

        // Check what files exist
        const files = [
            'handoff-config.md',
            'assumptions.md',
            'ai-quick-start.md',
            'epics/collaborative-documentation.md',
            'epics/codebase-improvement.md',
            'epics/feature-implementation.md',
            'epics/codebase-exploration.md'
        ];

        console.log(chalk.blue('\nAvailable files:'));
        for (const file of files) {
            const exists = await fs.pathExists(`.project/${file}`);
            const status = exists ? chalk.green('✓') : chalk.red('✗');
            console.log(`  ${status} .project/${file}`);
        }

        // Show current config if available
        if (await fs.pathExists('.project/handoff-config.md')) {
            const config = await fs.readFile('.project/handoff-config.md', 'utf8');
            const engagementMatch = config.match(/\*\*Current Setting\*\*: `([^`]+)`/);
            if (engagementMatch) {
                console.log(chalk.blue(`\nCurrent engagement level: ${engagementMatch[1]}`));
            }
        }
    });

program
    .command('templates')
    .description('List available templates')
    .action(async () => {
        console.log(chalk.blue('Available Handoff AI templates:\n'));

        const templates = [
            {
                name: 'basic',
                description: 'Minimal setup with core EPICs - good for small projects'
            },
            {
                name: 'full',
                description: 'Comprehensive setup with all features - good for large projects'
            },
            {
                name: 'team',
                description: 'Multi-developer setup with collaboration features'
            }
        ];

        templates.forEach(template => {
            console.log(chalk.green(`  ${template.name}`));
            console.log(chalk.gray(`    ${template.description}\n`));
        });

        console.log(chalk.blue('Usage: handoff-ai init --template <name>'));
    });

program
    .command('inject-docs')
    .description('Inject Handoff documentation back into code as inline documentation')
    .option('-d, --dry-run', 'Show what would be changed without making changes')
    .option('-f, --files <pattern>', 'File pattern to process (e.g., "src/**/*.js")')
    .option('-l, --language <lang>', 'Force specific language detection (js, py, java, etc.)')
    .action(async (options) => {
        if (!(await fs.pathExists('.project'))) {
            console.log(chalk.red('❌ Handoff AI not initialized. Run "handoff-ai init" first.'));
            return;
        }

        const spinner = ora('Analyzing Handoff documentation...').start();

        try {
            const results = await injectDocs(options);

            if (options.dryRun) {
                spinner.succeed('Dry run completed - showing proposed changes');
                displayDryRunResults(results);
            } else {
                spinner.text = 'Injecting documentation into files...';
                await applyDocumentationChanges(results);
                
                const successCount = results.length;
                
                if (successCount > 0) {
                    spinner.succeed(`Documentation injected into ${successCount} files! 🎉`);
                    
                    console.log(chalk.green('\n✅ Inline documentation added successfully!'));
                    console.log(chalk.blue('\nFiles updated:'));
                    results.forEach(result => {
                        console.log(`  • ${result.file} (${result.language})`);
                    });
                } else {
                    spinner.succeed('No files needed documentation injection');
                }
            }

        } catch (error) {
            spinner.fail('Failed to inject documentation');
            console.error(chalk.red(error.message));
        }
    });

// Handle unknown commands
program.on('command:*', () => {
    console.error(chalk.red('Invalid command: %s\nSee --help for a list of available commands.'), program.args.join(' '));
    process.exit(1);
});

program
    .command('mode')
    .description('View or set collaboration mode')
    .option('-s, --set <mode>', 'Set collaboration mode (collaborate|automatic|guided|review-only)')
    .option('-l, --list', 'List available collaboration modes')
    .action(async (options) => {
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
            console.log('  • AI completes entire tasks');
            console.log('  • Presents final result for review');
            console.log('  • Best for: High-trust scenarios, time pressure\n');
            
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
    });

program.parse();