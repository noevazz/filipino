let selectedFilipino = null;
let selectedEnglish = null;
let shuffledFilipino = [];
let shuffledEnglish = [];
let options;

const feedback = document.getElementById('feedback'); // Get the feedback element

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function handleOptions_PAIR_GAME(opts) {
  options = opts;
  shuffledFilipino = shuffle([...options]);
  shuffledEnglish = shuffle([...options]);
  const filipinoColumn = document.getElementById('filipino-options');
  const englishColumn = document.getElementById('english-options');

  filipinoColumn.innerHTML = '';
  englishColumn.innerHTML = '';
  shuffledFilipino.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary mb-2';
    btn.textContent = item.filipino;
    btn.setAttribute('data-filipino', item.filipino);
    btn.setAttribute('data-english', item.english);
    btn.onclick = () => select_PAIRGAME(btn, 'filipino');
    filipinoColumn.appendChild(btn);
  });

  shuffledEnglish.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-primary mb-2';
    btn.textContent = item.english;
    btn.setAttribute('data-filipino', item.filipino);
    btn.setAttribute('data-english', item.english);
    btn.onclick = () => select_PAIRGAME(btn, 'english');
    englishColumn.appendChild(btn);
  });
}

function select_PAIRGAME(btn, language) {
  if (language === 'filipino') {
    if (selectedFilipino != null && selectedFilipino != btn) {
      selectedFilipino.classList.remove('active');
    }
    selectedFilipino = btn;
  } else {
    if (selectedEnglish != null && selectedEnglish != btn) {
      selectedEnglish.classList.remove('active');
    }
    selectedEnglish = btn;
  }

  btn.classList.add('active');

  if (selectedFilipino && selectedEnglish) {
    const btn_filipinoValue = selectedFilipino.getAttribute('data-english');
    const btn_englishValue = selectedEnglish.getAttribute('data-english');

    const englishItem = options.find(
      (option) => option.english === btn_englishValue,
    );

    if (btn_filipinoValue === btn_englishValue) {
      feedback.textContent = '✅ Correct!';
      feedback.className = 'text-success';
      selectedEnglish.remove(); // since I am removing the elements here I do not need to call handleOptions again
      selectedFilipino.remove();
      options.splice(options.indexOf(englishItem), 1);
      selectedFilipino = null;
      selectedEnglish = null;
      setTimeout(() => {
        feedback.textContent = '';
      }, 1000);
      if (options.length === 0) {
        const myModal = new bootstrap.Modal(
          document.getElementById('modalElement'),
        );
        myModal.show();
      }
    } else {
      feedback.textContent = '❌ Incorrect! Try again.';
      feedback.className = 'text-danger';
      setTimeout(() => {
        feedback.textContent = '';
        selectedFilipino.classList.remove('active');
        selectedEnglish.classList.remove('active');
        if (language === 'filipino') {
          selectedEnglish = null;
        } else selectedFilipino = null;
      }, 1000);
    }
  }
}
