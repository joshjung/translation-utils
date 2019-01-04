import program from 'commander';
import html from './src/html.mjs';
import processors from './src/processors.mjs';

program
  .version('0.1.0')
  .option('-u, --url [url]', 'Process the url provided')
  .option('-f, --file [file]', 'Process the provided config JSON file. See kits/swedish for examples.')
  .option('-p, --processor [processor]', 'Which processor to use, by default uses the word sort and count processor.', 'wordCountAndSort')
  .option('-s, --selector [selector]', 'Provide a DOM selector for which nodes you want to process only.')
  .parse(process.argv);

const processor = processors[program.processor];

if (!processor) {
  console.log(`You have provided an invalid processor name '${program.processor}'`);
  console.log('Must be one of:');
  console.log(Object.keys(processors));

  process.exit(1);
}

if (program.url) {
  console.log(`Fetching ${program.url}`);
  console.log(`Filtering DOM to ${program.selector}`);

  html.fetchHTML(program.url)
    .then(_html => html.htmlStringToVisibleText(_html, program.selector))
    .then(nodes => processor({ texts: nodes.map(n => n.text), log: true }))
    .catch(console.error);
}
