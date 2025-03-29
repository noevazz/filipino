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
  
  function handleOptionsImages(config) {
    const currentOption = config[position];
    const wrongAnswers = config.filter((p) => p.english !== currentOption.english).map((p) => p.english);
    
    const opts = shuffle([
      currentOption.english,
      ...shuffle(wrongAnswers).slice(0, 2)
    ]);
  
    document.getElementById('question').textContent = `Which image represents "${currentOption.filipino}"?`;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
  
    opts.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-primary my-2';
      
      const img = document.createElement('img');
      img.src = option;
      img.alt = 'Option Image';
      img.style.width = '100px';
      img.style.height = '100px';
      
      button.appendChild(img);
      button.onclick = () => checkAnswer(option, currentOption.english, config);
      optionsContainer.appendChild(button);
    });
  }
  
  function checkAnswer(selected, correct, config) {
    const feedback = document.getElementById('feedback');
    const optionsContainer = document.getElementById('options');
  
    const buttons = optionsContainer.getElementsByTagName('button');
    Array.from(buttons).forEach((button) => (button.disabled = true));
  
    if (selected === correct) {
      feedback.textContent = '✅ Correct!';
      feedback.className = 'text-success';
      if (position != config.length - 1)
        confetti({ particleCount: 50 });
      else
        confetti({ particleCount: 300 });
      
      setTimeout(() => {
        position += 1;
        if (position == config.length) {
          position = 0;
          var myModal = new bootstrap.Modal(
            document.getElementById('modalElement')
          );
          myModal.show();
        } else {
            handleOptionsImages(config);
          feedback.textContent = '';
        }
      }, 1000);
    } else {
      feedback.textContent = '❌ Wrong! Try again.';
      feedback.className = 'text-danger';
      setTimeout(() => {
        Array.from(buttons).forEach((button) => (button.disabled = false));
        feedback.textContent = '';
      }, 1000);
    }
  }
  