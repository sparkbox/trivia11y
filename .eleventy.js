import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import ejsPlugin from '@11ty/eleventy-plugin-ejs';

const markdownToHtml = (markdown) => {
  const html = marked.parse(markdown.replace(/\\/g, ''), {
    breaks: true,
    mangle: false,
    headerIds: false,
    headerPrefix: false,
  });
  const withKbdElements = html.replace(/\[\[(.+?)\]\]/g, '<kbd>$1</kbd>');
  const cleanHtml = DOMPurify.sanitize(withKbdElements);

  return cleanHtml;
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(ejsPlugin);

  eleventyConfig.addPassthroughCopy({ 'src/public/': '/' });
  eleventyConfig.addLayoutAlias('default', 'layout.njk');

  eleventyConfig.addFilter('mdToHtml', markdownToHtml);
  eleventyConfig.addFilter('csvList', (values) => values.join(', '));

  return {
    dir: {
      input: 'pages',
      output: 'dist',
      includes: '../src',
    },
    markdownTemplateEngine: 'njk',
  };
};
