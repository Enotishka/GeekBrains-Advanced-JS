const text =
  "Rudy Francisco: 'Aren't we all waiting to be read by someone, praying that they'll tell us that we make sense?'";
const regexp = RegExp("(?<=\\W)'", "g");
console.log(text.replaceAll(regexp, '"'));

const nameElem = document.querySelector("#name");
const phoneElem = document.querySelector("#phone");
const emailElem = document.querySelector("#email");
const originalBorderColor = nameElem.style.borderColor;
document.querySelector(".submit-button").addEventListener("click", (event) => {
  const validationResults = [
    validateInput(nameElem, /^[a-zA-Z]+$/),
    validateInput(phoneElem, /^\+7\(\d{3}\)\d{3}\-\d{4}$/),
    validateInput(emailElem, /^\w+([.-]\w+)?@\w+\.\w+$/),
  ];
  if (validationResults.includes(false)) {
    event.preventDefault();
    alert("Введены некорректные данные");
  }
});

function validateInput(elem, pattern) {
  if (!pattern.test(elem.value)) {
    elem.style.borderColor = "red";
    return false;
  } else {
    elem.style.borderColor = originalBorderColor;
    return true;
  }
}
