# Eleventy Starter Lite

A minimal starter template for building a site with Eleventy. For those who prefer to add tools when needed rather than delete boilerplate. [Create a new repository from this template](https://github.com/dustin-jw/eleventy-starter-lite/generate).

This template is meant for the lazy developer, and the default configurations should _just work_ for simple projects. It is up to you to add a testing library, a bundler, or additional tooling if you decide that you need it for your project.

## Making the Project Your Own

You will want to update at least a few things to customize the project.

- `package.json`
  - `name`
  - `author`
  - `license` (if using a different one)
- `README.md`: delete irrelevant sections and add any project-specific details
- icons
  - `favicon.svg` and `favicon.png`
  - `maskable_icon.png`
  - `splash_icon.png`
- `manifest.json`
  - `name`
  - `short_name`
  - `description`
  - `icons` (only if you changed the names of existing icons or added new icons)
  - `theme_color`
  - `background_color`
  - `display` (one of `fullscreen`, `standalone`, `minimal-ui`, or `browser`)
- `robots.txt` (empty by default)
- Copy the contents of the `.env.example` file into a `.env` file to set your environment variables (be sure to set these in whichever environments exist for your project)

## Getting Started

This project requires [Node.js](https://nodejs.org) and `npm` (included with Node.js) to build the site and run it in local development. The LTS (Long Term Support) version is recommended for most cases.

Here are the main commands you'll need to run to get the project up and running.

```sh
# install dependencies
npm install

# run the site in development mode
npm start

# build the site for production
npm run build

# lint your code for possible issues
npm run lint

# run unit tests (by default does nothing)
npm run test

# update dependencies to their latest versions
npm run update-deps
```

## Conventions

To keep the project as small as possible, a lot of tooling has been avoided in favor of lightweight/lazy approaches.

### HTML

Any file put in the `pages` folder (or a subfolder) that matches one of [Eleventy's supported template languages](https://www.11ty.dev/docs/languages/) will be processed by Eleventy and written to `dist` as an HTML file. You may notice a few pages that aren't pages, like `service-worker.njk` or `sitemap.njk`. They make use of the [permalink feature](https://www.11ty.dev/docs/permalinks/) that allows them to be treated as whatever file type you specify.

The `pages` folder is kept separate from the `src` folder, which is set up to be the `includes` path in Eleventy. This means that you can essentially import anything from the `src` folder into your pages, and updating files within the `src` folder will trigger hot reloading when in development.

### CSS

For CSS, rather than using something like SCSS or PostCSS, CSS files are concatenated in `styles.njk` following [this pattern from the Eleventy documentation](https://www.11ty.dev/docs/quicktips/concatenate/).

There is some linting in place for CSS with Stylelint, but it is about the least opinionated possible set of rules. Extend it however you want to, or remove it if you don't need it.

### JavaScript

JavaScript is essentially ignored in this template due to the wide variety of approaches one can take to bundle or process their JS. Do you want to use esbuild, Webpack, Rollup, or just inline your JS in your HTML? Go for it however you want–that's not the focus of this template and it doesn't make sense to choose for you.

The same goes for unit and end-to-end testing. There are so many options (Vitest, Jest, Playwright, Cypress, Mocha, Jasmine, Karma, etc.) to choose from that you should feel free to pick whatever works best for you.

Linting for JS is set up using a pretty generic and unopinionated ESLint ruleset. Modify, extend, or remove it as you will.

### Static Resources

Anything that is a static resource that you don't need to do any processing on, such as images, icons, or `robots.txt` should go in `src/public`, since it will be copied directly to the root level of your output directory (`dist`).
