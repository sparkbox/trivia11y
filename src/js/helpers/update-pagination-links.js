const removeLink = (selector) => {
	const span = document.createElement('span');
	const link = document.querySelector(selector);
	link?.replaceWith(span);
};

const setLinkHref = (selector, url, linkText) => {
	const link = document.querySelector(selector);

	if (link) {
		link.setAttribute('href', url);
	} else {
		const span = document.querySelector('.cmp-pagination span');
		const a = document.createElement('a');
		a.setAttribute('href', url);
		a.setAttribute(selector.replace('[', '').replace(']', ''), '');
		a.innerHTML = linkText;
		span?.replaceWith(a);
	}
};

const updatePreviousLink = (questions, currentQuestionIndex) => {
	if (currentQuestionIndex <= 0) {
		removeLink('[data-prev-link]');
	} else {
		setLinkHref('[data-prev-link]', questions[currentQuestionIndex - 1], 'Previous Question');
	}
};

const updateNextLink = (questions, currentQuestionIndex) => {
	if (currentQuestionIndex >= questions.length - 1) {
		removeLink('[data-next-link]');
	} else {
		setLinkHref('[data-next-link]', questions[currentQuestionIndex + 1], 'Next Question');
	}
};

const updateQuestionNumber = (currentQuestionIndex) => {
	const currentQuestionElement = document.querySelector('[data-question-number]');

	if (currentQuestionElement) {
		currentQuestionElement.innerHTML = currentQuestionIndex + 1;
	}
};

const updateQuestionTotal = (total) => {
	const questionTotalElement = document.querySelector('[data-question-total]');

	if (questionTotalElement) {
		questionTotalElement.innerHTML = total;
	}
};

const updatePageTitle = (currentQuestionIndex, total) => {
	let newTitle = document.title.replace(/\d+/, currentQuestionIndex + 1);
	newTitle = newTitle.replace(/of\s\d+/, `of ${total}`);

	document.title = newTitle;
};

export const updatePaginationLinks = () => {
	const questionsRaw = sessionStorage.getItem('questions');
	const currentQuestionIndexRaw = sessionStorage.getItem('currentQuestionIndex');

	if (questionsRaw && currentQuestionIndexRaw) {
		const questions = JSON.parse(questionsRaw);
		const currentQuestionIndex = Number.parseInt(currentQuestionIndexRaw, 10);

		updatePreviousLink(questions, currentQuestionIndex);
		updateNextLink(questions, currentQuestionIndex);
		updateQuestionNumber(currentQuestionIndex);
		updateQuestionTotal(questions.length);
		updatePageTitle(currentQuestionIndex, questions.length);

		const previousLink = document.querySelector('[data-prev-link]');
		previousLink?.addEventListener('click', (event) => {
			event.preventDefault();

			sessionStorage.setItem('currentQuestionIndex', (currentQuestionIndex - 1).toString());
			window.location.href = event.target.href;
		});

		const nextLink = document.querySelector('[data-next-link]');
		nextLink?.addEventListener('click', (event) => {
			event.preventDefault();

			sessionStorage.setItem('currentQuestionIndex', (currentQuestionIndex + 1).toString());
			window.location.href = event.target.href;
		});
	}
};
