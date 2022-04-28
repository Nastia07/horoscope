document.addEventListener("DOMContentLoaded", function (event) {
  const nextButton = document.querySelectorAll(".form__btn_next");
  const infoSection = document.getElementById("info");
  const progressBar = document.getElementById("progress");
  const formSteps = document.querySelectorAll(".form__step");
  const checkboxs = document.querySelectorAll("input[type=radio]");
  const selectors = document.querySelectorAll("select");

  const formAlert = document.getElementById("form__alert");
  const zodiacImage = document.getElementById("zodiac");

  const dayArray = [...Array(32).keys()].slice(1);
  const monthArray = [...Array(13).keys()].slice(1);
  const yearArray = [
    ...Array(20)
      .fill()
      .map((year, index) => index + 1990),
  ];

  const setDate = (array, parent) => {
    array.forEach((element) =>
      parent.insertAdjacentHTML(
        "beforeend",
        `<option value="${element}">${element}</option>`
      )
    );
  };

  setDate(dayArray, selectors[0]);
  setDate(monthArray, selectors[1]);
  setDate(yearArray, selectors[2]);

  const showButtonNext = () => {
    checkboxs.forEach((checkbox) => {
      checkbox.onchange = function () {
        if (this.checked) {
          let checkboxParent = this.closest(".form__step");
          checkboxParent
            .querySelector(".form__btn_next")
            .classList.add("active");
        }
      };
    });

    selectors.forEach((select) => {
      select.onchange = function () {
        if (
          selectors[0].value == 0 ||
          selectors[1].value == 0 ||
          selectors[2].value == 0
        ) {
          formAlert.hidden = false;
        } else {
          formAlert.hidden = true;
          zodiacImage.innerHTML = `<img src="./img/${selectMonth.value}.png" alt="zodiac" class="zodiac__image"/>`;
          let selectParent = this.closest(".form__step");
          selectParent.classList.add("correct");
          selectParent.querySelector(".form__btn_next").classList.add("active");
        }
      };
    });
  };

  showButtonNext();

  const updateFormSteps = () => {
    formSteps.forEach((formStep) => {
      formStep.classList.contains("active") &&
        formStep.classList.remove("active");
    });
    formSteps[formStepsNum].classList.add("active");
  };

  const updateProgressbar = () => {
    progressBar.value += 16;
  };

  const hiddenInfoShowProgress = () => {
    infoSection.hidden = true;
    progressBar.hidden = false;
  };

  let formStepsNum = 0;

  nextButton.forEach((button, index) => {
    if (index + 1 !== nextButton.length) {
      button.addEventListener("click", () => {
        formStepsNum++;
        hiddenInfoShowProgress();
        updateFormSteps();
        updateProgressbar();
      });
    } else {
      button.addEventListener("click", () => {
        let formSection = button.closest("#form");
        formSection.hidden = true;
        progressBar.hidden = true;

        showResult();
      });
    }
  });

  const showResult = () => {
    const result = document.getElementById("result");
    const resultProgressBar = document.getElementById("result__progress_wrap");
    const resultItem = document.querySelectorAll(".result__list_item");
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));
    let width = 0;

    result.hidden = false;

    const loadingProgress = setInterval(() => {
      if (width >= 100) {
        clearInterval(loadingProgress);
      } else {
        width++;
        resultProgressBar.innerHTML = `<div class="result__progress" style="width: ${width}%">${width}%</div>`;
      }
    }, 20);

    async function loadingContent() {
      for (let i = 0; i < resultItem.length; i++) {
        resultItem[i].hidden = false;
        await timer(300);
      }
    }
    loadingContent();
  };
});
