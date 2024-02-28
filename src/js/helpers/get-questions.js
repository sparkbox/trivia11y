export const getQuestions = async (isMultipleChoice = true) => {
	const response = await fetch(isMultipleChoice ? '/questions.json' : '/flash-card-questions.json');
	const questions = await response.json();

	return questions;
};

export const getRelevantQuestions = (questions, category, isMultipleChoice) => {
	return questions.filter((question) => {
		if (!isMultipleChoice && question['Multiple Choice Only']) {
			return false;
		}

		if (category !== 'All Questions' && !question.Tags.some((tag) => tag === category)) {
			return false;
		}

		return true;
	});
};

export const getQuestionsForGame = async (questions, isMultipleChoice) => {
	const questionsForGame = [];
	if (!questions) {
		questions = await getQuestions(isMultipleChoice);
	}
	const selectedElements = document.querySelectorAll('input[name="category"]:checked');

	if (!selectedElements.length) {
		return questions;
	}

	selectedElements.forEach((element) => {
		const category = element.value;
		const relevantQuestions = getRelevantQuestions(questions, category, isMultipleChoice);
		relevantQuestions.forEach((question) => {
			if (!questionsForGame.some(({ id }) => id === question.id)) {
				questionsForGame.push(question);
			}
		});
	});

	return questionsForGame;
};
