window.completeSentenceNamespace = {
  vars: {
    current: 0,
    sentences: null,
    firstInput: null,
  },
  createStyledInput: function (index, word) {
    const input = document.createElement("input");
    input.type = "text";
    input.dataset.index = index;

    input.classList.add("form-control");
    input.style.display = "inline-block";
    input.style.width = `${word.length + 7}ch`; // ancho proporcional a los caracteres (+1 para espacio visual extra)
    input.style.margin = "0 4px 8px 4px";

    return input;
  },
  renderSentence: function () {
    document.getElementById("hint").textContent = "";
    document.getElementById("checkAnswers").disabled = false;
    document.getElementById("showAnswer").disabled = false;
    document.getElementById("showHint").disabled = false;
    const game = completeSentenceNamespace.sentences[completeSentenceNamespace.current];
    const words = game.filipino.split(" ");
    const container = document.getElementById("filipinoSentence");
    container.innerHTML = "";

    if (game.completeIndex[0] === -1) {
      for (let i = 0; i < words.length; i++) {
        const input = completeSentenceNamespace.createStyledInput(i, words[i]);
        if (i === 0) completeSentenceNamespace.vars.firstInput = input;
        container.appendChild(input);
      }
    } else {
      for (let i = 0; i < words.length; i++) {
        if (game.completeIndex.includes(i)) {
          const input = completeSentenceNamespace.createStyledInput(i, words[i]);
          container.appendChild(input);
          if (game.completeIndex[0] === i) completeSentenceNamespace.vars.firstInput = input;
        } else {
          const span = document.createElement("span");
          span.textContent = words[i];
          span.style.margin = "0 4px";
          container.appendChild(span);
        }
      }
    }

    document.getElementById("englishSentence").textContent = game.english;
    document.getElementById("result").textContent = "";
    completeSentenceNamespace.vars.firstInput.focus();
  },

  handleOptions: function (config) {
    document.getElementById("gameTitle").innerHTML = config.gameTitle;
    completeSentenceNamespace.current = 0;
    completeSentenceNamespace.sentences = config.gameData;
    completeSentenceNamespace.vars.firstInput = null;
    completeSentenceNamespace.renderSentence();
  },
  increaseProgressBar: function (yourArrayLength, currentPosition) {
    const progressBar = document.getElementById("progressBar");
    const percentage = ((currentPosition + 1) / (yourArrayLength + 1)) * 100;
    progressBar.innerHTML = Math.ceil(percentage).toString() + "%";
    progressBar.style.width = Math.ceil(percentage).toString() + "%";
  },
  showAnswer: function () {
    const game = completeSentenceNamespace.sentences[completeSentenceNamespace.current];
    const words = game.filipino.split(" ");
    const inputs = document.querySelectorAll("#filipinoSentence input");

    inputs.forEach((input) => {
      const index = parseInt(input.dataset.index);
      input.value = words[index];
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    });

    document.getElementById("result").textContent = "Answer shown.";
  },
  showHint: function () {
    document.getElementById("hint").textContent =
      "Hint: " + completeSentenceNamespace.sentences[completeSentenceNamespace.current].hint;
  },
  disableCurrentInputs: function () {
    const inputs = document.querySelectorAll("#filipinoSentence input");
    inputs.forEach((input) => {
      input.disabled = true;
    });
  },

  checkAnswers: function () {
    const game = completeSentenceNamespace.sentences[completeSentenceNamespace.current];
    const words = game.filipino.split(" ");
    const inputs = document.querySelectorAll("#filipinoSentence input");
    let correct = 0;

    inputs.forEach((input) => {
      const index = parseInt(input.dataset.index);
      if (input.value.trim().toLowerCase() === words[index].toLowerCase()) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        correct++;
      } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      }
    });

    document.getElementById("result").innerHTML =
      correct === inputs.length ? "✅ Correct!" : "❌ Some answers are incorrect.";
    setTimeout(() => {
      document.getElementById("result").textContent = "";
    }, 2000);

    if (correct === inputs.length) {
      document.getElementById("checkAnswers").disabled = true;
      document.getElementById("showAnswer").disabled = true;
      document.getElementById("showHint").disabled = true;
      completeSentenceNamespace.disableCurrentInputs();
      completeSentenceNamespace.current += 1;
      completeSentenceNamespace.increaseProgressBar(
        completeSentenceNamespace.sentences.length,
        completeSentenceNamespace.current,
      );
      if (completeSentenceNamespace.current < completeSentenceNamespace.sentences.length) {
        confetti({ particleCount: 50 });
        setTimeout(() => {
          completeSentenceNamespace.renderSentence();
        }, 2000);
      } else {
        confetti({ particleCount: 300 });
        setTimeout(() => {
          const myModal = new bootstrap.Modal(document.getElementById("modalGame"));
          myModal.show();
        }, 1000);
      }
    }
  },
};
