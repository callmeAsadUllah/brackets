let button = document.querySelector("button");

const clickCounter = (function () {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
})();

button.addEventListener("click", function () {
  console.log(clickCounter());
});
