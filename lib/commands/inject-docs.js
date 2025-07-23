const chalk = require('chalk');
const ora = require('ora');
const { injectDocs, applyDocumentationChanges, displayDryRunResults } = require('../inject-docs');

async function injectDocsCommand(options) {
    const spinner = ora('Analyzing project and generating documentation...').start();
    
    try {
        const results = await injectDocs({
            files: options.files,
            language: options.language,
            dryRun: options.dryRun
        });
        
        spinner.stop();
        
        if (options.dryRun) {
            console.log(chalk.green('✔ Dry run completed - showing proposed changes\n'));
            displayDryRunResults(results);
        } else {
            await applyDocumentationChanges(results);
            
            console.log(chalk.green(`✔ Documentation injected into ${results.length} files! 🎉\n`));
            
            console.log(chalk.green('✅ Inline documentation added successfully!\n'));
            
            console.log('Files updated:');
            results.forEach(result => {
                console.log(`  • ${result.file} (${result.language})`);
            });
        }
        
    } catch (error) {
        spinner.stop();
        console.log(chalk.red('✖ Failed to inject documentation'));
        console.error(chalk.red(error.message));
    }
}

module.exports = { injectDocsCommand };