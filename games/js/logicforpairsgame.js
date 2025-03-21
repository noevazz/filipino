let selectedFilipino = null;
let selectedEnglish = null;
let shuffledFilipino = [];
let shuffledEnglish = [];
let options;

const feedback = document.getElementById('feedback');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function disableOpts(disable) {
  const filipinoColumn = document.getElementById('filipino-options');
  const englishColumn = document.getElementById('english-options');
  if (disable) {
    Array.from(filipinoColumn.childNodes).forEach(
      (elem) => (elem.style.pointerEvents = 'none'),
    );
    Array.from(englishColumn.childNodes).forEach(
      (elem) => (elem.style.pointerEvents = 'none'),
    );
    return;
  }
  Array.from(filipinoColumn.childNodes).forEach(
    (elem) => (elem.style.pointerEvents = 'auto'),
  );
  Array.from(englishColumn.childNodes).forEach(
    (elem) => (elem.style.pointerEvents = 'auto'),
  );
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
    const div = document.createElement('div');
    div.className = 'option-item mb-2 p-2 border';
    div.textContent = item.filipino;
    div.setAttribute('data-filipino', item.filipino);
    div.setAttribute('data-english', item.english);
    div.style.cursor = 'pointer';
    div.classList.add('hover:bg-primary', 'hover:text-white');
    div.onclick = () => select_PAIRGAME(div, 'filipino');
    filipinoColumn.appendChild(div);
  });

  shuffledEnglish.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'option-item mb-2 p-2 border'; // Use Bootstrap classes for styling
    div.textContent = item.english;
    div.setAttribute('data-filipino', item.filipino);
    div.setAttribute('data-english', item.english);
    div.style.cursor = 'pointer';
    div.onclick = () => select_PAIRGAME(div, 'english');
    englishColumn.appendChild(div);
  });
}

function select_PAIRGAME(div, language) {
  if (language === 'filipino') {
    if (selectedFilipino != null && selectedFilipino !== div) {
      selectedFilipino.classList.remove('bg-primary', 'text-white');
    }
    selectedFilipino = div;
  } else {
    if (selectedEnglish != null && selectedEnglish !== div) {
      selectedEnglish.classList.remove('bg-primary', 'text-white');
    }
    selectedEnglish = div;
  }

  div.classList.add('bg-primary', 'text-white');

  if (selectedFilipino && selectedEnglish) {
    disableOpts(true);

    const btn_filipinoValue = selectedFilipino.getAttribute('data-english');
    const btn_englishValue = selectedEnglish.getAttribute('data-english');

    const englishItem = options.find(
      (option) => option.english === btn_englishValue,
    );

    if (btn_filipinoValue === btn_englishValue) {
      feedback.textContent = '✅ Correct!';
      feedback.className = 'text-success';
      setTimeout(() => {
        selectedEnglish.remove(); // since I am removing the elements here I do not need to call handleOptions again
        selectedFilipino.remove();
        options.splice(options.indexOf(englishItem), 1);
        console.log(options);
        selectedFilipino = null;
        selectedEnglish = null;
        feedback.textContent = '';
        if (options.length === 0) {
          const myModal = new bootstrap.Modal(
            document.getElementById('modalElement'),
          );
          myModal.show();
        }
        disableOpts(false);
      }, 1000);
    } else {
      feedback.textContent = '❌ Incorrect! Try again.';
      feedback.className = 'text-danger';
      setTimeout(() => {
        feedback.textContent = '';
        selectedFilipino.classList.remove('bg-primary', 'text-white');
        selectedEnglish.classList.remove('bg-primary', 'text-white');
        selectedEnglish = null;
        selectedFilipino = null;
        disableOpts(false);
      }, 1000);
    }
  }
}
