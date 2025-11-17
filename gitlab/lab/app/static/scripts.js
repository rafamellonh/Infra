document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question");

  questions.forEach((q) => {
    const button = q.querySelector(".show-answer");
    const answerBox = q.querySelector(".answer");
    const correctValue = q.dataset.correct;

    button.addEventListener("click", () => {
      const selected = q.querySelector('input[type="radio"]:checked');

      answerBox.classList.remove("hidden", "correct", "incorrect", "info");

      if (!selected) {
        answerBox.textContent = "Selecione uma opção antes de mostrar a resposta. 🙂";
        answerBox.classList.add("info");
        return;
      }

      const labels = q.querySelectorAll("label");
      let correctText = "";
      labels.forEach((label) => {
        const input = label.querySelector("input[type='radio']");
        if (input && input.value === correctValue) {
          correctText = label.textContent.trim();
        }
      });

      if (selected.value === correctValue) {
        answerBox.textContent = "✅ Correto! " + correctText;
        answerBox.classList.add("correct");
      } else {
        answerBox.textContent =
          "❌ Não é essa. Resposta correta: " + correctText;
        answerBox.classList.add("incorrect");
      }
    });
  });
});
