# Trivia11y

Test your accessibility knowledge in a variety of question-and-answer formats:

- Flash Cards
- Flash Cards with Typing
- Multiple Choice

## Getting Started

### Environment Variables

Copy the contents of `.env.example` into a file called `.env` and fill in the missing values. The example file should have instructions on where to find those values.

### Dependencies and Scripts

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

## Setting up your own Airtable base

If you want to fork this project and use its core mechanics against your own set of questions, you can create a new [Airtable](https://airtable.com) base. To do so without needing to make complex changes, you'll need to match the existing schema.

| Column Name          | Column Type                                 | Description                                                                                                |
| -------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Question             | Single line text                            | The question, which should be kept short                                                                   |
| Answer               | Long text with rich text formatting enabled | The correct answer to the question                                                                         |
| Distractor 1         | Long text with rich text formatting enabled | An incorrect answer to the question                                                                        |
| Distractor 2         | Long text with rich text formatting enabled | An incorrect answer to the question                                                                        |
| Explanation          | Long text with rich text formatting enabled | An explanation about why the correct answer is correct or other additional details                         |
| Multiple Choice Only | Checkbox                                    | Whether the question should only show up in the Multiple Choice categories (like for true/false questions) |
| Tags                 | Multiple Select                             | Used to group questions into different categories, can include multiple tags per question                  |
| Published            | Checkbox                                    | Whether the question should be included when the site is built or treated as a draft                       |

### Finding your base's ID

You will need your base's ID to set the `AIRTABLE_BASE_ID` environment variable in your `.env` file. You can find this in Airtable by navigating to the API documentation for your base (Help > API Documentation). It is also the first segment of the URL after `airtable.com` when you're viewing your base, as in `https://airtable.com/<AIRTABLE_BASE_ID>/<other-stuff>`.

### Creating a personal access token

To set the `AIRTABLE_API_KEY` environment variable in your `.env` file, you will need to [create a personal access token](https://airtable.com/create/tokens). You will need to set the scope to `data.records:read` for the token and make sure it only has access to your base.

Once both `AIRTABLE_BASE_ID` and `AIRTABLE_API_KEY` are defined in your `.env` file, you should be good to go!
