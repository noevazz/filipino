window.imagesNamespace = {
  vars: {
    position: 0,
    config: null,
  },
  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  next: function() {
    const currentOption = imagesNamespace.vars.config[imagesNamespace.vars.position];
    const wrongAnswers = imagesNamespace.vars.config.filter(p => p.imgURL !== currentOption.imgURL).map(p => p.imgURL);

    const opts = imagesNamespace.shuffle([currentOption.imgURL, ...imagesNamespace.shuffle(wrongAnswers).slice(0, 2)]);

    document.getElementById('question').textContent = `Which image represents "${currentOption.filipino}"?`;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    opts.forEach(option => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-primary my-2';
      const img = document.createElement('img');

      img.src = option;
      img.alt = 'Option Image';
      img.style.width = '100px';
      img.style.height = '100px';

      button.appendChild(img);
      button.onclick = () => imagesNamespace.checkAnswerImages(option, currentOption.imgURL, imagesNamespace.vars.config);
      optionsContainer.appendChild(button);
    });
  },
  handleOptions: function (config) {
    document.getElementById("gameTitle").innerHTML = config.gameTitle;
    imagesNamespace.vars.config = structuredClone(imagesNamespace.shuffle(config.gameData));
    imagesNamespace.vars.position = 0;
    imagesNamespace.next()
  },
  increaseProgressBar: function (yourArrayLength, currentPosition) {
    const progressBar = document.getElementById("progressBar");
    const percentage = ((currentPosition) / (yourArrayLength)) * 100;
    progressBar.innerHTML = Math.ceil(percentage).toString() + "%";
    progressBar.style.width = Math.ceil(percentage).toString() + "%";
  },

  checkAnswerImages: function (selected, correct, config) {
    const feedback = document.getElementById('feedback');
    const optionsContainer = document.getElementById('options');

    const buttons = optionsContainer.getElementsByTagName('button');
    Array.from(buttons).forEach(button => (button.disabled = true));

    if (selected === correct) {
      feedback.textContent = '✅ Correct!';
      feedback.className = 'text-success';
      if (imagesNamespace.vars.position != config.length - 1) confetti({ particleCount: 50 });
      else confetti({ particleCount: 300 });
      imagesNamespace.increaseProgressBar(imagesNamespace.vars.config.length, imagesNamespace.vars.position+1);
      setTimeout(() => {
        imagesNamespace.vars.position += 1;
        if (imagesNamespace.vars.position == config.length) {
          imagesNamespace.vars.position = 0;
          var myModal = new bootstrap.Modal(document.getElementById('modalGame'));
          myModal.show();
        } else {
          imagesNamespace.next(config);
          feedback.textContent = '';
        }
      }, 1000);
    } else {
      feedback.textContent = '❌ Wrong! Try again.';
      feedback.className = 'text-danger';
      setTimeout(() => {
        Array.from(buttons).forEach(button => (button.disabled = false));
        feedback.textContent = '';
      }, 1000);
    }
  },
};
