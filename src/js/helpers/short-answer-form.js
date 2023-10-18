const revealAcceptedAnswer = (event) => {
  event.preventDefault();

  const acceptedAnswer = document.querySelector('#acceptedAnswer');
  const acceptedAnswerSection = document.querySelector(
    '#acceptedAnswerSection'
  );

  if (!acceptedAnswer || !acceptedAnswerSection) {
    return;
  }

  const acceptedAnswerContent = acceptedAnswer.innerHTML;
  acceptedAnswerSection.innerHTML = acceptedAnswerContent;
  acceptedAnswerSection.focus();
};

export const initializeAnswerFormListener = () => {
  const answerForm = document.querySelector('#answerForm');

  if (answerForm) {
    answerForm.addEventListener('submit', revealAcceptedAnswer);
  }
};
