export const randomizeAnswers = () => {
  const multipleChoiceItems = document.querySelectorAll(
    '.cmp-multiple-choice__item[data-needs-js]'
  );
  const randomizedOrder = Array.from(multipleChoiceItems).sort(() =>
    Math.random() > 0.5 ? 1 : -1
  );
  const multipleChoiceItemsContainer = document.querySelector(
    '.cmp-multiple-choice'
  );
  randomizedOrder.forEach((element) => {
    multipleChoiceItemsContainer.append(element);
  });
};
