import { getQuestions, getRelevantQuestions } from './helpers/questions';

const interceptCategoryNavigation = async () => {
  sessionStorage.removeItem('questions');
  sessionStorage.removeItem('questionStatus');
  const questions = await getQuestions();
  const links = document.querySelectorAll('.cmp-categories__link');

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const relevantQuestions = getRelevantQuestions(
        questions,
        link.dataset.category,
        link.dataset.type === 'Multiple Choice'
      );

      const questionOrder = Array.from(
        { length: relevantQuestions.length },
        (_item, index) => `${link.dataset.baseLink}${index + 1}/`
      ).sort(() => (Math.random() > 0.5 ? 1 : -1));

      sessionStorage.setItem('questions', JSON.stringify(questionOrder));

      sessionStorage.setItem('currentQuestionIndex', '0');

      window.location.href = questionOrder[0];
    });
  });
};

interceptCategoryNavigation();
