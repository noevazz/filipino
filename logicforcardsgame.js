function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

let position = 0;

function handleOptions(config) {
  const currentOption = config[position];
  const wrongAnswers = config
    .filter((p) => p.english !== currentOption.english)
    .map((p) => p.english);
  const opts = shuffle([
    currentOption.english,
    ...shuffle(wrongAnswers).slice(0, 2),
  ]);

  document.getElementById(
    'question',
  ).textContent = `What is the meaning of "${currentOption.filipino}"?`;
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';

  opts.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'btn btn-outline-primary my-2';
    button.textContent = option;
    button.onclick = () => checkAnswer(option, currentOption.english, config);
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
