/* globals IS_MULTIPLE_CHOICE */
import { getQuestions, getRelevantQuestions } from './helpers/get-questions';

let questions;

const getQuestionCountForCategory = (questions, categoryName) => {
	const relevantQuestions = getRelevantQuestions(questions, categoryName, IS_MULTIPLE_CHOICE);

	return relevantQuestions.length;
};

const updateQuestionCounts = async () => {
	questions = await getQuestions();

	const categoryCountElements = document.querySelectorAll('[data-category]');
	categoryCountElements.forEach((element) => {
		const category = element.dataset.category;
		const count = getQuestionCountForCategory(questions, category);

		element.textContent = `(${count})`;
	});
};

const getQuestionsForGame = async () => {
	const questionsForGame = [];
	if (!questions) {
		questions = await getQuestions();
	}
	const selectedElements = document.querySelectorAll('input[name="category"]:checked');

	selectedElements.forEach((element) => {
		const category = element.value;
		const relevantQuestions = getRelevantQuestions(questions, category, IS_MULTIPLE_CHOICE);
		relevantQuestions.forEach((question) => {
			if (!questionsForGame.some(({ id }) => id === question.id)) {
				questionsForGame.push(question);
			}
		});
	});

	return questionsForGame;
};

const initializeCategorySelectionChangeHandler = () => {
	const elements = document.querySelectorAll('input[name="category"]');
	elements.forEach((element) => {
		element.addEventListener('change', async () => {
			const questionsForGame = await getQuestionsForGame();
			const questionCountElement = document.querySelector('[data-question-total]');
			if (questionCountElement) {
				questionCountElement.textContent = questionsForGame.length;
			}
		});
	});
};

updateQuestionCounts();
initializeCategorySelectionChangeHandler();
