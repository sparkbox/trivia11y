export const getQuestions = async () => {
  const response = await fetch('/questions.json');
  const questions = await response.json();

  return questions;
};

export const getRelevantQuestions = (questions, category, isMultipleChoice) => {
  return questions.filter((question) => {
    if (!isMultipleChoice && question['Multiple Choice Only']) {
      return false;
    }

    if (category !== 'All' && !question.Tags.some((tag) => tag === category)) {
      return false;
    }

    return true;
  });
};
