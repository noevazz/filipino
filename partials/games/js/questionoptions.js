/*
When you define a variable with const, let, or class outside of any
function but not explicitly on window, it won’t be added to the
window object, even if it seems "global."
*/

const sentences = [
  {filipino: "ang aking nanay ay mulasa Mexico", english: "my mom is from france", completeIndex: [0, 4]},
  {filipino: "aking babaeng kapatid", english: "my sister", completeIndex: [-1]} // user needs to provide all
]

window.questionOptionsNamespace = {
  vars: {
    position: 0,
    languageInGame: 'filipino',
    config: null
  },

  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  langButton: function (reference) {
    questionOptionsNamespace.shuffle(questionOptionsNamespace.vars.config);
    questionOptionsNamespace.vars.position = 0;
    reference.innerHTML == 'filipino' ? (reference.innerHTML = 'english') : (reference.innerHTML = 'filipino');
    questionOptionsNamespace.vars.languageInGame = reference.innerHTML;
    questionOptionsNamespace.next(questionOptionsNamespace.vars.config)
  },

  next: function (config) {
    const currentOption = config[questionOptionsNamespace.vars.position];
    const oppositeLang = questionOptionsNamespace.vars.languageInGame;
    const wrongAnswers = config.filter(p => p.english !== currentOption.english).map(p => p[oppositeLang]);

    const opts = questionOptionsNamespace.shuffle([
      currentOption[oppositeLang],
      ...questionOptionsNamespace.shuffle(wrongAnswers).slice(0, 2),
    ]);

    document.getElementById('question').textContent =
      questionOptionsNamespace.vars.languageInGame === 'english'
        ? `What is the meaning of "${currentOption.filipino}"?`
        : `Translate this word to Filipino: "${currentOption.english}"`;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    opts.forEach(option => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-primary my-2';
      button.textContent = option;
      button.onclick = () => questionOptionsNamespace.checkAnswerQuestions(option, currentOption[oppositeLang], config);
      optionsContainer.appendChild(button);
    });
  },

  handleOptions: function (config) {
    questionOptionsNamespace.vars.option = 0;
    document.getElementById("gameTitle").innerHTML = config.gameTitle;
    questionOptionsNamespace.vars.config = structuredClone(config.gameData);
    questionOptionsNamespace.vars.languageInGame = 'filipino';
    document.getElementById('toggle-lang').innerHTML = questionOptionsNamespace.vars.languageInGame;
    questionOptionsNamespace.next(questionOptionsNamespace.vars.config);
  },

  checkAnswerQuestions: function (selected, correct, config) {
    const feedback = document.getElementById('feedback');
    const optionsContainer = document.getElementById('options');

    // Disable all buttons to prevent further clicks
    const buttons = optionsContainer.getElementsByTagName('button');
    Array.from(buttons).forEach(button => (button.disabled = true));

    if (selected === correct) {
      feedback.textContent = '✅ Correct!';
      feedback.className = 'text-success';
      if (questionOptionsNamespace.vars.position != config.length - 1) confetti({ particleCount: 50 });
      else confetti({ particleCount: 300 });
      setTimeout(() => {
        questionOptionsNamespace.vars.position += 1;
        if (questionOptionsNamespace.vars.position == config.length) {
          questionOptionsNamespace.vars.position = 0;
          const myModal = new bootstrap.Modal(document.getElementById('modalGame'));
          myModal.show();
        } else {
          questionOptionsNamespace.next(config);
          feedback.textContent = '';
        }
      }, 1000);
    } else {
      feedback.textContent = '❌ Wrong! Try again.';
      feedback.className = 'text-danger';
      // Re-enable the buttons after 1 second
      setTimeout(() => {
        Array.from(buttons).forEach(button => (button.disabled = false)); // Re-enable buttons
        feedback.textContent = '';
      }, 1000);
    }
  },
};
