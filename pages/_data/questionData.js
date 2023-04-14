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
  return [
    ...new Set(
      questions
        .map((question) => question.Tags)
        .flat()
        .sort()
    ),
  ];
};

const groupQuestionsIntoCategories = async (questions) => {
  const { default: slugify } = await import('@sindresorhus/slugify');
  const questionGroups = {};

  questions.forEach((question) => {
    question.Tags.forEach((tag) => {
      const category = slugify(tag);
      if (!questionGroups[category]) {
        questionGroups[category] = [question];
      } else {
        questionGroups[category].push(question);
      }
    });
  });

  return questionGroups;
};

module.exports = async () => {
  const questions = await getPublishedQuestions();
  const categories = getUniqueCategories(questions);
  const questionGroups = await groupQuestionsIntoCategories(questions);

  return {
    questions,
    categories,
    questionGroups,
  };
};
