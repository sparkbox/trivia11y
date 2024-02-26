import { randomizeAnswers } from './helpers/randomize-answers';
import { updatePaginationLinks } from './helpers/update-pagination-links';
import { initializeOptionClickListeners } from './helpers/multiple-choice-options';

initializeOptionClickListeners();
randomizeAnswers();
updatePaginationLinks();
