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
    .map((record) => {
      const options = [
        {
          answer: record.fields.Answer,
          isCorrect: true,
        },
      ];

      if (record.fields['Distractor 1']?.trim()) {
        options.push({
          answer: record.fields['Distractor 1'],
          isCorrect: false,
        });
      }

      if (record.fields['Distractor 2']?.trim()) {
        options.push({
          answer: record.fields['Distractor 2'],
          isCorrect: false,
        });
      }

      return {
				...record.fields,
				id: record.id,
				options: options.sort(() => {
					const sign = Math.round(Math.random()) > 0 ? 1 : -1;

					return sign;
				}),
			};
    });

  return publishedQuestions;
};

const getFlashCardQuestions = (questions) =>
  questions.filter((question) => !question['Multiple Choice Only']);

const getUniqueCategories = (questions) => {
	return [
		'All Questions',
		...new Set(
			questions
				.map((question) => question.Tags)
				.flat()
				.sort()
		),
	];
};

const groupQuestionsIntoCategories = (questions, categories) => {
	const questionGroups = [];
	questions.forEach((question, index) => {
		questionGroups.push({
			category: 'All Questions',
			tagName: 'all-questions',
			pageNumber: index + 1,
			questionTotal: questions.length,
			question,
		});
	});

	categories.forEach((category) => {
		let pageNumber = 1;
		const questionTotal = questions.reduce((sum, question) => {
			if (question.Tags.includes(category)) {
				return sum + 1;
			}

			return sum;
		}, 0);

		questions.forEach((question) => {
			if (question.Tags.includes(category)) {
				questionGroups.push({
					category,
					tagName: slugify(category),
					pageNumber,
					questionTotal,
					question,
				});

				pageNumber += 1;
			}
		});
	});

	return questionGroups;
};

module.exports = async () => {
	const questions = await getQuestions();
	const categories = getUniqueCategories(questions);
	const questionGroups = groupQuestionsIntoCategories(questions, categories);

	const flashCardQuestions = getFlashCardQuestions(questions);
	const flashCardCategories = getUniqueCategories(flashCardQuestions);
	const flashCardQuestionGroups = groupQuestionsIntoCategories(flashCardQuestions, flashCardCategories);

	return {
		questions,
		categories,
		questionGroups,
		flashCardQuestions,
		flashCardCategories,
		flashCardQuestionGroups,
	};
};
