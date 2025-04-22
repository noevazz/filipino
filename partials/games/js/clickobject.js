window.clickobjectNamespace = {
  vars: {
    gameData: null,
    position: 0,
  },
  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  next: function () {
    document.getElementById("question").textContent = `Which part represents "${
      clickobjectNamespace.vars.gameData[clickobjectNamespace.vars.position]
    }"?`;
  },
  checkAnswer: function (input) {
    const feedback = document.getElementById("feedback");
    if (clickobjectNamespace.vars.position == clickobjectNamespace.vars.gameData.length) {
        feedback.textContent = input;
        feedback.className = "text-success";
        return;
    }
    if (input == clickobjectNamespace.vars.gameData[clickobjectNamespace.vars.position]) {
      feedback.textContent = "✅ Correct!";
      feedback.className = "text-success";
      clickobjectNamespace.vars.position += 1;

      if (clickobjectNamespace.vars.position != clickobjectNamespace.vars.gameData.length) confetti({ particleCount: 50 });
      else confetti({ particleCount: 300 });

      setTimeout(() => {
        if (clickobjectNamespace.vars.position == clickobjectNamespace.vars.gameData.length) {
            var myModal = new bootstrap.Modal(document.getElementById('modalGame'));
            myModal.show();
        } else {
            clickobjectNamespace.next();
            feedback.textContent = '';
        }
      }, 1000);

      
    } else {
        feedback.textContent = '❌ Wrong! Try again.';
        feedback.className = 'text-danger';
        setTimeout(() => {
          feedback.textContent = '';
        }, 1000);
    }
  },

  handleOptions: function (config) {
    clickobjectNamespace.vars.gameData = clickobjectNamespace.shuffle(config.gameData);
    clickobjectNamespace.vars.position = 0;
    document.getElementById("gameTitle").innerHTML = config.gameTitle;
    clickobjectNamespace.setStyles();
    clickobjectNamespace.next();

    config.gameData.forEach((element) => {
      const figure = document.getElementById(element);
      figure.addEventListener("click", function () {
        clickobjectNamespace.checkAnswer(figure.id);
      });
    });
  },
  setStyles: function () {
    const style = document.createElement("style");
    style.textContent =
      clickobjectNamespace.vars.gameData.map((id) => `#${id}:hover`).join(",\n") +
      ` {
            filter: drop-shadow(-1px -1px 2px red) drop-shadow(1px 1px 2px yellow);
            cursor: pointer;
        }`;
    console.log(style);
    document.head.appendChild(style);
  },
};
