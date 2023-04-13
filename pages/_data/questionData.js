/* eslint-env node */
require('dotenv').config();
const Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

const getPublishedQuestions = async () => {
  const questions = await base('Questions and Answers').select().all();

  const publishedQuestions = questions
    .filter((record) => record.fields.Published)
    .map((record) => record.fields);

  return publishedQuestions;
};

const getUniqueCategories = (questions) => {
  // console.log(JSON.stringify({ questions }, null, 2));
  return [
    ...new Set(
      questions
        .map((question) => question.Tags)
        .flat()
        .sort()
    ),
  ];
};

module.exports = async () => {
  const questions = await getPublishedQuestions();
  const categories = getUniqueCategories(questions);

  return {
    questions,
    categories,
  };
};
