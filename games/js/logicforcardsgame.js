function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let position = 0;
let config;


function langButton (reference) {
  reference.innerHTML == "filipino" ? reference.innerHTML = 'english' : reference.innerHTML = 'filipino';
  if (typeof position != null)
    position = 0;
  if (typeof window[currentGoTo] === 'function') {
    window[currentGoTo](reference.innerHTML);
  } else {
    console.log("did not found currentToGO")
  }
}


function handleOptions(config, languageInGame = 'filipino') {
  document.getElementById('toggle-lang').innerHTML = languageInGame;
  const currentOption = config[position];
  const oppositeLang = languageInGame;
  const wrongAnswers = config
    .filter((p) => p.english !== currentOption.english)
    .map((p) => p[oppositeLang]);
  
  const opts = shuffle([
    currentOption[oppositeLang],
    ...shuffle(wrongAnswers).slice(0, 2),
  ]);

  document.getElementById('question').textContent = languageInGame === 'english'
    ? `What is the meaning of "${currentOption.filipino}"?`
    : `Translate this word to Filipino: "${currentOption.english}"`;
  
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  opts.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-primary my-2';
    button.textContent = option;
    button.onclick = () => checkAnswer(option, currentOption[oppositeLang], config);
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selected, correct, config) {
  const feedback = document.getElementById('feedback');
  const optionsContainer = document.getElementById('options');

  // Disable all buttons to prevent further clicks
  const buttons = optionsContainer.getElementsByTagName('button');
  Array.from(buttons).forEach((button) => (button.disabled = true));

  if (selected === correct) {
    feedback.textContent = '✅ Correct!';
    feedback.className = 'text-success';
    setTimeout(() => {
      position += 1;
      if (position == config.length) {
          position = 0;
        var myModal = new bootstrap.Modal(
          document.getElementById('modalElement'),
        );
        myModal.show();
      } else {
        handleOptions(config);
        feedback.textContent = '';
      }
    }, 1000);
  } else {
    feedback.textContent = '❌ Wrong! Try again.';
    feedback.className = 'text-danger';
    // Re-enable the buttons after 1 second
    setTimeout(() => {
      Array.from(buttons).forEach((button) => (button.disabled = false)); // Re-enable buttons
      feedback.textContent = '';
    }, 1000);
  }
}
