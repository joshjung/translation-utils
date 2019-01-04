import program from 'commander';
import html from './src/html.mjs';

program
  .version('0.1.0')
  .option('-u, --url [url]', 'Process the url provided')
  .parse(process.argv);

if (program.url) {
  html.fetchHTML(program.url)
    .then(html.htmlStringToVisibleText)
    .then(nodes => nodes.forEach(n => console.log(n.text)))
    .catch(console.error);
}