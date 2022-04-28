document.addEventListener("DOMContentLoaded", function (event) {
  const nextButton = document.querySelectorAll(".form__btn_next");
  const infoSection = document.getElementById("info");
  const progressBar = document.getElementById("progress");
  const formSteps = document.querySelectorAll(".form__step");
  const checkboxs = document.querySelectorAll("input[type=radio]");

  let formStepsNum = 0;

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
    progressBar.value += 20;
  };

  nextButton.forEach((btn) => {
    btn.addEventListener("click", () => {
      formStepsNum++;
      infoSection.hidden = true;
      progressBar.hidden = false;
      updateFormSteps();
      updateProgressbar();
    });
  });
});
