import { getQuestionsForGame } from './get-questions';

const quickStartGame = async (gameType) => {
	const questionsForGame = await getQuestionsForGame(null, gameType === 'multiple-choice');

	const questionOrder = questionsForGame
		.map((question) => `/${gameType}/all-questions/${question.pageNumber}/`)
		.sort(() => (Math.random() > 0.5 ? 1 : -1))
		.slice(0, 50);

	sessionStorage.setItem('questions', JSON.stringify(questionOrder));
	sessionStorage.setItem('currentQuestionIndex', '0');

	window.location.href = questionOrder[0];
};

export const interceptQuickStartNavigation = async () => {
	sessionStorage.removeItem('questions');
	sessionStorage.removeItem('questionStatus');
	const links = document.querySelectorAll('[data-game-type]');

	links.forEach((link) => {
		link.addEventListener('click', (event) => {
			event.preventDefault();

			const { gameType } = event.target.dataset;
			quickStartGame(gameType);
		});
	});
};
