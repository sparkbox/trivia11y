const { EleventyServerlessBundlerPlugin } = require('@11ty/eleventy');
const { marked } = require('marked');
const DOMPurify = require('isomorphic-dompurify');

const markdownToHtml = (markdown) => {
  const html = marked.parse(markdown.replace(/\\/g, ''), {
    breaks: true,
  });
  const withKbdElements = html.replace(/\[\[(.+?)\]\]/g, '<kbd>$1</kbd>');
  const cleanHtml = DOMPurify.sanitize(withKbdElements);

  return cleanHtml;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ 'src/public': '/' });
  eleventyConfig.addLayoutAlias('default', 'layout.njk');

  eleventyConfig.addFilter('mdToHtml', markdownToHtml);

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'serverless',
    functionsDir: './netlify/functions/',
    redirects: 'netlify-toml-builders',
  });

  return {
    dir: {
      input: 'pages',
      output: 'dist',
      includes: '../src',
    },
    markdownTemplateEngine: 'njk',
  };
};
