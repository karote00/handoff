#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();

program
    .name('handoff-ai')
    .description('AI collaboration framework for persistent project knowledge')
    .version('0.1.5');

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

// Handle unknown commands
program.on('command:*', () => {
    console.error(chalk.red('Invalid command: %s\nSee --help for a list of available commands.'), program.args.join(' '));
    process.exit(1);
});

program.parse();