document.addEventListener("DOMContentLoaded", function (event) {
  const infoSection = document.getElementById("info");

  const formProgressBar = document.getElementById("form__progress");
  const formSteps = document.querySelectorAll(".form__step");
  const nextButton = document.querySelectorAll(".form__btn_next");
  const formAlert = document.getElementById("form__alert");
  const zodiacImage = document.getElementById("zodiac");
  const checkboxs = document.querySelectorAll("input[type=radio]");
  const selectors = document.querySelectorAll("select");

  const processing = document.getElementById("processing");
  const processingProgressBar = document.getElementById(
    "processing__progress_wrap"
  );
  const processingItem = document.querySelectorAll(".processing__list_item");

  const result = document.getElementById("result");
  const resultTable = document.getElementById("result__table");
  const resultCallBnt = document.querySelector(".result__call");
  const loadingResult = document.getElementById("loading_result");

  const dayArray = [...Array(32).keys()].slice(1);
  const monthArray = [...Array(13).keys()].slice(1);
  const yearArray = [
    ...Array(20)
      .fill()
      .map((year, index) => index + 1990),
  ];

  const setDateSelect = (array, parent) => {
    array.forEach((element) =>
      parent.insertAdjacentHTML(
        "beforeend",
        `<option value="${element}">${element}</option>`
      )
    );
  };

  setDateSelect(dayArray, selectors[0]);
  setDateSelect(monthArray, selectors[1]);
  setDateSelect(yearArray, selectors[2]);

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

  const nextFormStep = () => {
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
          formProgressBar.hidden = true;

          showProcessing();
          hideProcessing();
        });
      }
      const updateFormSteps = () => {
        formSteps.forEach((formStep) => {
          formStep.classList.contains("active") &&
            formStep.classList.remove("active");
        });
        formSteps[formStepsNum].classList.add("active");
      };

      const updateProgressbar = () => {
        formProgressBar.value += 12.5;
      };

      const hiddenInfoShowProgress = () => {
        infoSection.hidden = true;
        formProgressBar.hidden = false;
      };
    });
  };

  nextFormStep();

  const showProcessing = () => {
    processing.hidden = false;

    let width = 0;
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    function loadingProgress() {
      setInterval(() => {
        if (width >= 100) {
          clearInterval(loadingProgress);
        } else {
          width++;
          processingProgressBar.innerHTML = `<div class="processing__progress" style="width: ${width}%">${width}%</div>`;
        }
      }, 20);
    }
    async function loadingContent() {
      for (let i = 0; i < processingItem.length; i++) {
        processingItem[i].hidden = false;
        await timer(300);
      }
    }
    loadingProgress();
    loadingContent();
  };

  const hideProcessing = () => {
    setTimeout(() => {
      processing.hidden = true;
      result.hidden = false;
    }, 3500);
  };

  resultCallBnt.addEventListener("click", () => {
    loadingResult.hidden = false;
    fetch("https://swapi.dev/api/people/1/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        for (let key in data) {
          loadingResult.hidden = true;
          resultTable.insertAdjacentHTML(
            "beforeend",
            `<tr>
          <td>${key}</td>
          <td>${data[key]}</td>
        </tr>`
          );
        }
      });
  });
});
