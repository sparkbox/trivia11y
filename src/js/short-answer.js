import { updatePaginationLinks } from './helpers/update-pagination-links';

const answerForm = document.querySelector('#answerForm');
const acceptedAnswer = document.querySelector('#acceptedAnswer');
const acceptedAnswerSection = document.querySelector('#acceptedAnswerSection');

const handleShortAnswerFormSubmit = (event) => {
  event.preventDefault();

  const acceptedAnswerContent = acceptedAnswer.innerHTML;
  acceptedAnswerSection.innerHTML = acceptedAnswerContent;
  acceptedAnswerSection.focus();
};

answerForm.addEventListener('submit', handleShortAnswerFormSubmit);

updatePaginationLinks();
