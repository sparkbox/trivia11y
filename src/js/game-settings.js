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
	const questionsForGame = await getQuestionsForGame(questions, IS_MULTIPLE_CHOICE);
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

const initializeCategorySelectionChangeListener = () => {
	const elements = document.querySelectorAll('input[name="category"]');
	elements.forEach((element) => {
		element.addEventListener('change', handleSelectionChange);
	});
};

const getSavedSettings = () => {
	const savedSettings = localStorage.getItem('savedSettings');
	if (savedSettings) {
		return JSON.parse(savedSettings);
	}

	return [];
};

const getMaxQuestions = () => {
	const maxQuestionsInput = document.querySelector('#max-questions');
	const maxQuestions = Number.parseInt(maxQuestionsInput?.value, 10) || null;
	return maxQuestions;
};

const saveSettings = () => {
	const gameType = GAME_TYPE;

	const selectedCategoryElements = document.querySelectorAll('input[name="category"]:checked');
	const selectedCategories = Array.from(selectedCategoryElements).map((element) => element.value);

	const maxQuestions = getMaxQuestions;

	const timerElement = document.querySelector('input[name="question-timer"]:checked');
	const timer = timerElement?.value ?? 'no-timer';

	const gameSettings = {
		gameType,
		selectedCategories,
		maxQuestions,
		timer,
	};

	const savedSettings = getSavedSettings();
	const updatedSettings = [...savedSettings, gameSettings];
	localStorage.setItem('savedSettings', JSON.stringify(updatedSettings));
};

const startGame = async () => {
	sessionStorage.removeItem('questions');
	sessionStorage.removeItem('questionStatus');

	const questionsForGame = await getQuestionsForGame(questions, IS_MULTIPLE_CHOICE);
	const questionOrder = questionsForGame
		.map((question) => `/${GAME_TYPE}/all-questions/${question.pageNumber}/`)
		.sort(() => (Math.random() > 0.5 ? 1 : -1))
		.slice(0, getMaxQuestions());

	sessionStorage.setItem('questions', JSON.stringify(questionOrder));

	sessionStorage.setItem('currentQuestionIndex', '0');

	window.location.href = questionOrder[0];
};

const handleFormSubmit = (event) => {
	event.preventDefault();

	const saveSettingsInput = document.querySelector('#save-settings');
	if (saveSettingsInput?.checked) {
		saveSettings();
	}

	startGame();
};

const initializeFormSubmitListener = () => {
	const form = document.querySelector('[data-game-settings]');
	form?.addEventListener('submit', handleFormSubmit);
};

updateQuestionCounts();
initializeCategorySelectionChangeListener();
initializeFormSubmitListener();
handleSelectionChange();
