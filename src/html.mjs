import afterLoad from 'after-load';
import domWalk from 'dom-walk';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

const IGNORE_NODE_NAMES = {
  'SCRIPT': true,
  'STYLE': true
};

const textNodeFilter = node => {
  return node.nodeType === 3 && !IGNORE_NODE_NAMES[node.parentNode.nodeName] && node.textContent.trim() !== '';
};

const fetchHTML = (url) => {
  return new Promise((result, reject) => { afterLoad(url, result); });
};

const htmlDOMToVisibleText = (htmlDom, selector) => {
  return new Promise((result, reject) => {
    const doc = htmlDom.window.document;
    const elements = selector ? doc.querySelectorAll(selector) : doc.childNodes;
    const texts = [];

    domWalk(elements, node => {
      if (textNodeFilter(node)) {
        texts.push({
          text: node.textContent.trim(),
          node
        });
      }
    });

    result(texts);
  });
};

const htmlStringToVisibleText = (htmlString, selector) => {
  const dom = new JSDOM(htmlString);

  return htmlDOMToVisibleText(dom, selector);
};


export default {
  fetchHTML,
  htmlStringToVisibleText,
  htmlDOMToVisibleText
};