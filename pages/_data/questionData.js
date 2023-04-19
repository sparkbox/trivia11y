/* eslint-env node */
require('dotenv').config();
const Airtable = require('airtable');
const slugify = require('@sindresorhus/slugify');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);
const viewDrafts = process.env.VIEW_DRAFTS === 'true';

const getQuestions = async () => {
  const questions = await base('Questions and Answers').select().all();

  const publishedQuestions = questions
    .filter((record) => record.fields.Published || viewDrafts)
    .map((record) => record.fields);

  return publishedQuestions;
};

const getFlashCardQuestions = (questions) =>
  questions.filter((question) => !question['Multiple Choice Only']);

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

const groupQuestionsIntoCategories = (questions) => {
  const questionGroups = {};

  questions.forEach((question) => {
    question.Tags.forEach((tag) => {
      const category = slugify(tag);
      if (!questionGroups[category]) {
        questionGroups[category] = {
          tagName: tag,
          questions: [question],
        };
      } else {
        questionGroups[category].questions.push(question);
      }
    });
  });

  return questionGroups;
};

module.exports = async () => {
  const questions = await getQuestions();
  const categories = getUniqueCategories(questions);
  const questionGroups = groupQuestionsIntoCategories(questions);

  const flashCardQuestions = getFlashCardQuestions(questions);
  const flashCardCategories = getUniqueCategories(flashCardQuestions);
  const flashCardQuestionGroups =
    groupQuestionsIntoCategories(flashCardQuestions);

  return {
    questions,
    categories,
    questionGroups,
    flashCardQuestions,
    flashCardCategories,
    flashCardQuestionGroups,
  };
};
