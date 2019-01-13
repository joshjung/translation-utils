import program from 'commander';
import scraper from './src/utils/htmlScraper.mjs';
import commands from './src/commands/index.mjs';

const commandsStr = Object.keys(commands).join(', ');

process.on('uncaughtException', function (error) {
  console.log(error.stack);
});

program
  .version('0.1.0')
  .option('-u, --url [url]', 'Scrap the html from the url provided and use the result as the input document.')
  .option('-s, --domSelector [domSelector]', 'Provide a DOM selector for which nodes you want to scrape when using url input document(s).')
  .option('-g, --config [config]', 'Set the document(s) to process to the provided config JSON file. See ./languages/swedish for examples.')
  .option('-c, --command [command]', `Command to apply to the input document(s). Options: ${commandsStr}. Default is 'sortAndTranslate'.`, 'sortAndTranslate')
  .option('-v, --verbose [verbose]', 'Output debugging information.', false)
  .parse(process.argv);

/**
 * The basic concept of this program is that you have three major pieces:
 *
 * input: one or more sources that are converted into an array of strings.
 * command: a command to be run on the input array of strings.
 * config: optional configuration to be passed to the command.
 *
 * For example, you could input a url that would convert the HTML text to a single document for the input.
 * Then the command could be 'sortAndTranslate' which would sort all the words into frequency of use and
 * then translate each one, one by one.
 */
let input;
let command;
let config;

if (program.url) {
  if (program.verbose) {
    console.log(`Fetching ${program.url}`);
    console.log(`Filtering DOM to ${program.selector}`);
  }

  input = () => scraper.fetchHTML(program.url)
    .then(_html => scraper.scrapeTextFromHTMLString(_html, program.domSelector))
    .then(nodes => nodes.map(n => n.text));
}

if (program.command) {
  command = commands[program.command];

  if (!command) {
    console.warn(`WARNING: You have provided an invalid command name '${program.command}'`);
  }
}

input()
  .then(documents => command({ documents, config, log: true }))
  .catch(console.error);