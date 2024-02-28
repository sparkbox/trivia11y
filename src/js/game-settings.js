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

const formatDuration = (durationInSeconds) => {
	const minutes = Math.floor(durationInSeconds / 60);
	const remainingSeconds = durationInSeconds % 60;

	if (remainingSeconds === 0) {
		return `${minutes} minute${minutes > 1 ? 's' : ''}`;
	}

	if (minutes === 0) {
		return `${remainingSeconds} seconds`;
	}

	return `${minutes} minute${minutes > 1 ? 's' : ''}, ${remainingSeconds} seconds`;
};

const handleSelectionChange = async () => {
	const questionsForGame = await getQuestionsForGame();
	const numberOfQuestions = questionsForGame.length;
	const questionCountElement = document.querySelector('[data-question-total]');
	if (questionCountElement) {
		questionCountElement.textContent = numberOfQuestions;
	}

	const maxQuestionsInput = document.querySelector('#max-questions');
	if (maxQuestionsInput) {
		maxQuestionsInput.value = numberOfQuestions;
	}

	const durationElements = document.querySelectorAll('[data-timer-duration]');
	durationElements.forEach((durationElement) => {
		const numberOfSeconds = Number.parseInt(durationElement.dataset.timerDuration, 10);
		if (numberOfQuestions > 0) {
			durationElement.textContent = `(${formatDuration(numberOfQuestions * numberOfSeconds)} total)`;
		} else {
			durationElement.textContent = '';
		}
	});
};

const initializeCategorySelectionChangeHandler = () => {
	const elements = document.querySelectorAll('input[name="category"]');
	elements.forEach((element) => {
		element.addEventListener('change', handleSelectionChange);
	});
};

updateQuestionCounts();
initializeCategorySelectionChangeHandler();
handleSelectionChange();
