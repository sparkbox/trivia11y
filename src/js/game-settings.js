/* globals IS_MULTIPLE_CHOICE */
import { getQuestions, getRelevantQuestions } from './helpers/get-questions';

const getQuestionCountForCategory = (questions, categoryName) => {
	const relevantQuestions = getRelevantQuestions(questions, categoryName, IS_MULTIPLE_CHOICE);

	return relevantQuestions.length;
};

const updateQuestionCounts = async () => {
	const questions = await getQuestions();

	const categoryCountElements = document.querySelectorAll('[data-category]');
	categoryCountElements.forEach((element) => {
		const category = element.dataset.category;
		const count = getQuestionCountForCategory(questions, category);

		element.textContent = `(${count})`;
	});
};

updateQuestionCounts();
