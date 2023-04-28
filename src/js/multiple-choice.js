const optionButtons = document.querySelectorAll('.js-multiple-choice');
const explanation = document.querySelector('.js-explanation');
const explanationSection = document.querySelector('.js-explanation-section');

const handleOptionButtonClick = (event) => {
  const isPressed = event.target.getAttribute('aria-pressed') === 'true';
  const isCorrect = event.target.dataset.correct === 'true';
  const explanationContent = explanation.innerHTML;

  optionButtons.forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
  });

  event.target.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
  explanationSection.innerHTML = `<p>${
    isCorrect ? 'Correct' : 'Incorrect'
  }</p>${explanationContent}`;
  explanationSection.focus();
};

optionButtons.forEach((button) => {
  button.addEventListener('click', handleOptionButtonClick);
});
