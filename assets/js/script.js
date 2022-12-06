let count = 0;
const addButton = document.querySelector("#add");
const subButton = document.querySelector("#sub");
const text = document.querySelector("#result");

addButton.addEventListener("click", () => {
  count++;
  text.innerHTML = `${count}`;
});

subButton.addEventListener("click", () => {
  count--;
  text.innerHTML = `${count}`;
});