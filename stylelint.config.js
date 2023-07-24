module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss'
  ],
  rules: {
    'selector-class-pattern': null,
    // this CSS rule doesn't understand SCSS
    'media-query-no-invalid': null,
  },
};
