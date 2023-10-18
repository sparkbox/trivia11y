const getOptionButtons = () => {
  return document.querySelectorAll('.js-multiple-choice');
};

const handleOptionButtonClick = (event) => {
  const isPressed = event.target.getAttribute('aria-pressed') === 'true';
  const isCorrect = event.target.dataset.correct === 'true';

  const optionButtons = getOptionButtons();
  const explanation = document.querySelector('.js-explanation');
  const explanationSection = document.querySelector('.js-explanation-section');

  if (!explanation || !explanationSection) {
    return;
  }

  const explanationContent = explanation.innerHTML;

  optionButtons.forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
  });

  event.target.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
  explanationSection.innerHTML = `<h3 class="cmp-explanation-section__title cmp-explanation-section__title--${
    isCorrect ? 'correct' : 'incorrect'
  }">
    ${isCorrect ? 'Correct' : 'Incorrect'}
  </h3>${explanationContent}`;
  explanationSection.focus();
};

export const initializeOptionClickListeners = () => {
  const optionButtons = getOptionButtons();

  optionButtons.forEach((button) => {
    button.addEventListener('click', handleOptionButtonClick);
  });
};
