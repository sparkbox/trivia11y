const optionButtons = document.querySelectorAll('.cmp-option-button');
const explanation = document.querySelector('#explanation');
const liveRegion = document.querySelector('[aria-live]');

const handleOptionButtonClick = (event) => {
  const isPressed = event.target.getAttribute('aria-pressed') === 'true';
  const isCorrect = event.target.dataset.correct === 'true';
  const explanationContent = explanation.innerHTML;

  optionButtons.forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
  });

  event.target.setAttribute('aria-pressed', isPressed ? 'false' : 'true');
  liveRegion.innerHTML = `<p>${
    isCorrect ? 'Correct' : 'Incorrect'
  }</p>${explanationContent}`;
};

optionButtons.forEach((button) => {
  button.addEventListener('click', handleOptionButtonClick);
});
