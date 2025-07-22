#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();
const glob = require('glob');

// Helper functions for inject-docs command
async function checkHandoffDocs() {
    const requiredFiles = [
        '.project/ai-quick-start.md',
        '.project/assumptions.md'
    ];
    
    for (const file of requiredFiles) {
        if (!(await fs.pathExists(file))) {
            return false;
        }
    }
    return true;
}

async function analyzeProject(filePattern) {
    const defaultPatterns = [
        '**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx',
        '**/*.py', '**/*.java', '**/*.cs', '**/*.go',
        '**/*.rs', '**/*.php', '**/*.rb', '**/*.cpp',
        '**/*.c', '**/*.h', '**/*.hpp'
    ];
    
    const patterns = filePattern ? [filePattern] : defaultPatterns;
    const files = [];
    
    for (const pattern of patterns) {
        const matches = glob.sync(pattern, {
            ignore: ['node_modules/**', '.git/**', 'dist/**', 'build/**', '.project/**']
        });
        files.push(...matches);
    }
    
    const uniqueFiles = [...new Set(files)];
    const projectInfo = {
        files: uniqueFiles.map(file => ({
            path: file,
            language: detectLanguage(file)
        }))
    };
    
    return projectInfo;
}

function detectLanguage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const languageMap = {
        '.js': 'javascript',
        '.jsx': 'javascript',
        '.ts': 'typescript',
        '.tsx': 'typescript',
        '.py': 'python',
        '.java': 'java',
        '.cs': 'csharp',
        '.go': 'go',
        '.rs': 'rust',
        '.php': 'php',
        '.rb': 'ruby',
        '.cpp': 'cpp',
        '.cc': 'cpp',
        '.cxx': 'cpp',
        '.c': 'c',
        '.h': 'c',
        '.hpp': 'cpp'
    };
    
    return languageMap[ext] || 'unknown';
}

async function loadHandoffDocs() {
    const docs = {};
    
    // Load main documentation files
    if (await fs.pathExists('.project/ai-quick-start.md')) {
        docs.quickStart = await fs.readFile('.project/ai-quick-start.md', 'utf8');
    }
    
    if (await fs.pathExists('.project/assumptions.md')) {
        docs.assumptions = await fs.readFile('.project/assumptions.md', 'utf8');
    }
    
    // Load EPIC documentation
    const epicFiles = [
        'feature-implementation.md',
        'codebase-exploration.md',
        'codebase-improvement.md',
        'collaborative-documentation.md'
    ];
    
    docs.epics = {};
    for (const epicFile of epicFiles) {
        const epicPath = `.project/epics/${epicFile}`;
        if (await fs.pathExists(epicPath)) {
            docs.epics[epicFile] = await fs.readFile(epicPath, 'utf8');
        }
    }
    
    return docs;
}

async function generateInlineDocs(projectInfo, handoffDocs, options) {
    const results = [];
    
    for (const fileInfo of projectInfo.files) {
        if (fileInfo.language === 'unknown') continue;
        
        const fileContent = await fs.readFile(fileInfo.path, 'utf8');
        const documentation = generateDocumentationForFile(fileInfo, fileContent, handoffDocs);
        
        if (documentation) {
            results.push({
                file: fileInfo.path,
                language: fileInfo.language,
                originalContent: fileContent,
                documentation: documentation,
                newContent: injectDocumentationIntoFile(fileContent, documentation, fileInfo.language)
            });
        }
    }
    
    return results;
}

function generateDocumentationForFile(fileInfo, fileContent, handoffDocs) {
    // Extract key information from Handoff docs that's relevant to this file
    const fileName = path.basename(fileInfo.path);
    const documentation = [];
    
    // Look for mentions of this file or similar patterns in the documentation
    const allDocsText = [
        handoffDocs.quickStart || '',
        handoffDocs.assumptions || '',
        ...Object.values(handoffDocs.epics || {})
    ].join('\n');
    
    // Extract functions/classes from the file
    const codeElements = extractCodeElements(fileContent, fileInfo.language);
    
    // Generate documentation for each element
    for (const element of codeElements) {
        const docText = generateElementDocumentation(element, allDocsText, fileInfo.language);
        if (docText) {
            documentation.push({
                element: element,
                documentation: docText
            });
        }
    }
    
    return documentation.length > 0 ? documentation : null;
}

function extractCodeElements(content, language) {
    const elements = [];
    
    switch (language) {
        case 'javascript':
        case 'typescript':
            // Extract functions and classes
            const functionRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\([^)]*\)/g;
            const classRegex = /(?:export\s+)?class\s+(\w+)/g;
            const arrowFunctionRegex = /(?:export\s+)?const\s+(\w+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g;
            
            let match;
            while ((match = functionRegex.exec(content)) !== null) {
                elements.push({ type: 'function', name: match[1], line: getLineNumber(content, match.index) });
            }
            while ((match = classRegex.exec(content)) !== null) {
                elements.push({ type: 'class', name: match[1], line: getLineNumber(content, match.index) });
            }
            while ((match = arrowFunctionRegex.exec(content)) !== null) {
                elements.push({ type: 'function', name: match[1], line: getLineNumber(content, match.index) });
            }
            break;
            
        case 'python':
            const pyFunctionRegex = /def\s+(\w+)\s*\([^)]*\):/g;
            const pyClassRegex = /class\s+(\w+)(?:\([^)]*\))?:/g;
            
            while ((match = pyFunctionRegex.exec(content)) !== null) {
                elements.push({ type: 'function', name: match[1], line: getLineNumber(content, match.index) });
            }
            while ((match = pyClassRegex.exec(content)) !== null) {
                elements.push({ type: 'class', name: match[1], line: getLineNumber(content, match.index) });
            }
            break;
            
        case 'java':
            const javaMethodRegex = /(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*\([^)]*\)\s*{/g;
            const javaClassRegex = /(?:public|private)?\s*class\s+(\w+)/g;
            
            while ((match = javaMethodRegex.exec(content)) !== null) {
                elements.push({ type: 'method', name: match[1], line: getLineNumber(content, match.index) });
            }
            while ((match = javaClassRegex.exec(content)) !== null) {
                elements.push({ type: 'class', name: match[1], line: getLineNumber(content, match.index) });
            }
            break;
    }
    
    return elements;
}

function getLineNumber(content, index) {
    return content.substring(0, index).split('\n').length;
}

function generateElementDocumentation(element, allDocsText, language) {
    // Simple documentation generation based on element name and context
    const elementName = element.name;
    
    // Look for mentions of this element in the documentation
    const lines = allDocsText.split('\n');
    const relevantLines = lines.filter(line => 
        line.toLowerCase().includes(elementName.toLowerCase()) ||
        line.includes(element.type)
    );
    
    if (relevantLines.length === 0) {
        // Generate basic documentation
        return generateBasicDocumentation(element, language);
    }
    
    // Use relevant documentation context
    const context = relevantLines.slice(0, 3).join(' ').trim();
    return generateContextualDocumentation(element, context, language);
}

function generateBasicDocumentation(element, language) {
    const templates = {
        javascript: {
            function: `/**\n * ${element.name} - Function description\n * @returns {*} Return value description\n */`,
            class: `/**\n * ${element.name} - Class description\n */`
        },
        typescript: {
            function: `/**\n * ${element.name} - Function description\n * @returns Return value description\n */`,
            class: `/**\n * ${element.name} - Class description\n */`
        },
        python: {
            function: `"""${element.name} - Function description\n    \n    Returns:\n        Description of return value\n    """`,
            class: `"""${element.name} - Class description\n    """`,
        },
        java: {
            method: `/**\n * ${element.name} - Method description\n * @return Return value description\n */`,
            class: `/**\n * ${element.name} - Class description\n */`
        }
    };
    
    const langTemplates = templates[language];
    if (!langTemplates) return null;
    
    return langTemplates[element.type] || null;
}

function generateContextualDocumentation(element, context, language) {
    // Generate documentation based on context from Handoff docs
    const summary = context.length > 100 ? context.substring(0, 100) + '...' : context;
    
    const templates = {
        javascript: {
            function: `/**\n * ${element.name} - ${summary}\n * @returns {*} Return value description\n */`,
            class: `/**\n * ${element.name} - ${summary}\n */`
        },
        python: {
            function: `"""${element.name} - ${summary}\n    \n    Returns:\n        Description of return value\n    """`,
            class: `"""${element.name} - ${summary}\n    """`
        },
        java: {
            method: `/**\n * ${element.name} - ${summary}\n * @return Return value description\n */`,
            class: `/**\n * ${element.name} - ${summary}\n */`
        }
    };
    
    const langTemplates = templates[language];
    if (!langTemplates) return null;
    
    return langTemplates[element.type] || null;
}

function injectDocumentationIntoFile(content, documentation, language) {
    let newContent = content;
    const lines = content.split('\n');
    
    // Sort documentation by line number (descending) to avoid index shifting
    const sortedDocs = documentation.sort((a, b) => b.element.line - a.element.line);
    
    for (const doc of sortedDocs) {
        const lineIndex = doc.element.line - 1;
        if (lineIndex >= 0 && lineIndex < lines.length) {
            // Check if documentation already exists
            if (!hasExistingDocumentation(lines, lineIndex, language)) {
                // Insert documentation before the element
                const indent = getIndentation(lines[lineIndex]);
                const docLines = doc.documentation.split('\n').map(line => indent + line);
                lines.splice(lineIndex, 0, ...docLines);
            }
        }
    }
    
    return lines.join('\n');
}

function hasExistingDocumentation(lines, lineIndex, language) {
    // Check if there's already documentation above this line
    if (lineIndex === 0) return false;
    
    const prevLine = lines[lineIndex - 1].trim();
    
    switch (language) {
        case 'javascript':
        case 'typescript':
        case 'java':
            return prevLine.endsWith('*/') || prevLine.startsWith('/**');
        case 'python':
            return prevLine.endsWith('"""') || prevLine.startsWith('"""');
        default:
            return false;
    }
}

function getIndentation(line) {
    const match = line.match(/^(\s*)/);
    return match ? match[1] : '';
}

function displayDryRunResults(results) {
    console.log(chalk.blue('\n📋 Proposed Changes:\n'));
    
    results.forEach((result, index) => {
        console.log(chalk.green(`${index + 1}. ${result.file} (${result.language})`));
        console.log(chalk.gray(`   ${result.documentation.length} documentation blocks to add\n`));
        
        result.documentation.forEach((doc, docIndex) => {
            console.log(chalk.yellow(`   ${docIndex + 1}. ${doc.element.type}: ${doc.element.name} (line ${doc.element.line})`));
            console.log(chalk.gray(`      ${doc.documentation.split('\n')[0].trim()}\n`));
        });
    });
    
    console.log(chalk.blue(`\n💡 Run without --dry-run to apply these changes`));
}

async function applyDocumentationChanges(results) {
    for (const result of results) {
        await fs.writeFile(result.file, result.newContent, 'utf8');
    }
}

program
    .name('handoff-ai')
    .description('AI collaboration framework for persistent project knowledge')
    .version('0.1.8');

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
            // Check if documentation exists
            const docsExist = await checkHandoffDocs();
            if (!docsExist) {
                spinner.fail('No Handoff documentation found to inject');
                console.log(chalk.yellow('💡 Generate documentation first using AI collaboration'));
                return;
            }

            // Analyze project structure and detect languages
            spinner.text = 'Detecting project languages and files...';
            const projectInfo = await analyzeProject(options.files);
            
            if (projectInfo.files.length === 0) {
                spinner.fail('No source files found to process');
                return;
            }

            // Load and parse Handoff documentation
            spinner.text = 'Loading Handoff documentation...';
            const handoffDocs = await loadHandoffDocs();

            // Generate inline documentation for each file
            spinner.text = 'Generating inline documentation...';
            const results = await generateInlineDocs(projectInfo, handoffDocs, options);

            if (options.dryRun) {
                spinner.succeed('Dry run completed - showing proposed changes');
                displayDryRunResults(results);
            } else {
                spinner.text = 'Injecting documentation into files...';
                await applyDocumentationChanges(results);
                spinner.succeed(`Documentation injected into ${results.length} files! 🎉`);
                
                console.log(chalk.green('\n✅ Inline documentation added successfully!'));
                console.log(chalk.blue('\nFiles updated:'));
                results.forEach(result => {
                    console.log(`  • ${result.file} (${result.language})`);
                });
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

program.parse();