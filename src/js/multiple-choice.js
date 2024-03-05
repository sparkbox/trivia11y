import { randomizeAnswers } from './helpers/randomize-answers';
import { updatePaginationLinks } from './helpers/update-pagination-links';
import { initializeOptionClickListeners } from './helpers/multiple-choice-options';
import { initializeTimer } from './helpers/time-remaining';

initializeOptionClickListeners();
randomizeAnswers();
updatePaginationLinks();
initializeTimer();
