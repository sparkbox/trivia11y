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
