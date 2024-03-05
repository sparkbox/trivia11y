/* globals IS_MULTIPLE_CHOICE GAME_TYPE */
import { getQuestions, getRelevantQuestions, getQuestionsForGame } from './helpers/get-questions';

let questions;

const getQuestionCountForCategory = (questions, categoryName) => {
	const relevantQuestions = getRelevantQuestions(questions, categoryName, IS_MULTIPLE_CHOICE);

	return relevantQuestions.length;
};

const updateQuestionCounts = async () => {
	questions = await getQuestions(IS_MULTIPLE_CHOICE);

	const categoryCountElements = document.querySelectorAll('[data-category]');
	categoryCountElements.forEach((element) => {
		const category = element.dataset.category;
		const count = getQuestionCountForCategory(questions, category);

		element.textContent = `(${count})`;
	});
};

const getDurationInMinutes = (durationInSeconds) => {
	const minutes = Math.floor(durationInSeconds / 60);
	const remainingSeconds = durationInSeconds % 60;
	let durationStrings = [];

	if (minutes > 0) {
		durationStrings.push(minutes === 1 ? '1 minute' : `${minutes} minutes`);
	}

	if (remainingSeconds > 0) {
		durationStrings.push(`${remainingSeconds} seconds`);
	}

	return durationStrings.join(', ');
};

const updateDurationIndicators = (numberOfQuestions) => {
	const durationIndicators = document.querySelectorAll('[data-duration]');
	durationIndicators.forEach((element) => {
		const secondsPerQuestion = Number.parseInt(element.dataset.duration, 10);
		const totalDurationInSeconds = secondsPerQuestion * numberOfQuestions;

		const durationInMinutes = getDurationInMinutes(totalDurationInSeconds);
		if (durationInMinutes) {
			element.textContent = `(up to ${getDurationInMinutes(totalDurationInSeconds)})`;
		} else {
			element.textContent = '';
		}
	});
};

const handleSelectionChange = async () => {
	const questionsForGame = await getQuestionsForGame(questions, IS_MULTIPLE_CHOICE);
	const numberOfQuestions = questionsForGame.length;
	const maxQuestionsInput = document.querySelector('#max-questions');
	if (maxQuestionsInput) {
		maxQuestionsInput.value = numberOfQuestions;
	}

	updateDurationIndicators(numberOfQuestions);
};

const initializeCategorySelectionChangeListener = () => {
	const elements = document.querySelectorAll('input[name="category"]');
	elements.forEach((element) => {
		element.addEventListener('change', handleSelectionChange);
	});
};

const initializeMaxQuestionsChangeListener = () => {
	const maxQuestionsInput = document.querySelector('#max-questions');
	if (maxQuestionsInput) {
		maxQuestionsInput.addEventListener('change', (event) => {
			const numberOfQuestions = Number.parseInt(event.target.value, 10) || 0;
			updateDurationIndicators(numberOfQuestions);
		});
	}
};

const startGame = async () => {
	sessionStorage.removeItem('questions');
	sessionStorage.removeItem('questionStatus');

	const questionsForGame = await getQuestionsForGame(questions, IS_MULTIPLE_CHOICE);
	const maxQuestionsInput = document.querySelector('#max-questions');
	const maxQuestions = Number.parseInt(maxQuestionsInput?.value, 10) || questionsForGame.length;

	const questionOrder = questionsForGame
		.map((question) => `/${GAME_TYPE}/all-questions/${question.pageNumber}/`)
		.sort(() => (Math.random() > 0.5 ? 1 : -1))
		.slice(0, maxQuestions);

	sessionStorage.setItem('questions', JSON.stringify(questionOrder));
	sessionStorage.setItem('currentQuestionIndex', '0');

	window.location.href = questionOrder[0];
};

const initializeFormSubmitListener = () => {
	const form = document.querySelector('[data-game-settings]');
	form?.addEventListener('submit', (event) => {
		event.preventDefault();

		startGame();
	});
};

updateQuestionCounts();
initializeCategorySelectionChangeListener();
initializeMaxQuestionsChangeListener();
initializeFormSubmitListener();
handleSelectionChange();
