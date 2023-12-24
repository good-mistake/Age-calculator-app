const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const btn = document.getElementById("submit");
const showYear = document.getElementById("yearResult");
const showMonth = document.getElementById("monthResult");
const showDay = document.getElementById("dayResult");
const validation = document.querySelectorAll(".validate");
const labelValidation = document.querySelectorAll(".validate-label");
btn.addEventListener("click", handleClick);
day.addEventListener("keydown", handleKey);
month.addEventListener("keydown", handleKey);
year.addEventListener("keydown", handleKey);
function handleClick(e) {
  e.preventDefault();
  validateInput();
}
function handleKey(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    validateInput();
  }
}
function validateInput() {
  if (
    year.value < 9999 &&
    year.value > 999 &&
    month.value < 12 &&
    month.value > 0 &&
    day.value > 0 &&
    day.value < 31 &&
    !isNaN(day.value) &&
    !isNaN(month.value) &&
    !isNaN(year.value)
  ) {
    success();
  } else if (year.value === "" || month.value === "" || day.value === "") {
    validation.forEach(function (element) {
      element.textContent = "This field is required";
      onFail();
    });
  } else {
    validation.forEach(function (element) {
      element.textContent = "Must be a valid date!";
    });
    onFail();
  }
}
function success() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const enteredDate = `${year.value}-${month.value.padStart(
    2,
    "0"
  )}-${day.value.padStart(2, "0")}`;
  let birthDate = new Date(enteredDate);
  let birthYear = birthDate.getFullYear();
  let birthMonth = birthDate.getMonth();
  let birthDay = birthDate.getDate();
  const yearResult = currentYear - birthYear;
  const monthResult = currentMonth - birthMonth;
  const dayResult = currentDay - birthDay;
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    yearResult--;
    monthResult += 12;
  }
  if (currentDay < birthDay) {
    monthResult--;
    dayResult += new Date(currentYear, currentMonth, 0).getDate();
  }
  showYear.textContent = yearResult;
  showMonth.textContent = monthResult;
  showDay.textContent = dayResult;
  validation.forEach(function (element) {
    element.textContent = "";
  });
  labelValidation.forEach(function (element) {
    element.style.color = "";
  });
  year.style.border = "";
  month.style.border = "";
  day.style.border = "";
}
function onFail() {
  labelValidation.forEach(function (element) {
    element.style.color = "#f65b5bf5";
  });
  year.style.border = "0.5px solid #f65b5bf5";
  month.style.border = "0.5px solid #f65b5bf5";
  day.style.border = "0.5px solid #f65b5bf5";
}
