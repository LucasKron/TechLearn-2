document.querySelectorAll(".question-wrapper").forEach(function (wrapper) {
  wrapper.addEventListener("click", function () {
    const container = wrapper.closest(".accordion");
    const answer = container.querySelector(".answer-wrapper");
    const icon = container.querySelector("i");

    if (answer.style.display === "block") {
      answer.style.display = "none";
      icon.classList.remove("fa-minus");
      icon.classList.add("fa-plus");
    } else {
      answer.style.display = "block";
      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    }
    wrapper.classList.toggle("active");
    container.classList.toggle("expanded");
  });
});