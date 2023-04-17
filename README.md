# Trivia11y

A site for questions and answers, either for studying or fun (or both).

## Getting Started

### Environment Variables

Copy the contents of `.env.example` into a file called `.env` and fill in the missing values. The example file should have instructions on where to find those values.

### Dependencies and Scripts

This project requires [Node.js](https://nodejs.org) and `npm` (included with Node.js) to build the site and run it in local development. The LTS (Long Term Support) version is recommended for most cases.

You will need `netlify-cli` installed globally before running `npm start`, so be sure to run `npm i -g netlify-cli` if you don't have it installed already.

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
