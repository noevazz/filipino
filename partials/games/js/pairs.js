window.pairsNamespace = {
  vars: {
    selectedFilipino: null,
    selectedEnglish: null,
    shuffledFilipino: [],
    shuffledEnglish: [],
    options: null,
  },
  shuffle: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  disableOpts: function (disable) {
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
  },
  handleOptions: function (config) {
    document.getElementById("gameTitle").innerHTML = config.gameTitle;
    pairsNamespace.vars.options = structuredClone(config.gameData);
    shuffledFilipino = pairsNamespace.shuffle([...pairsNamespace.vars.options]);
    shuffledEnglish = pairsNamespace.shuffle([...pairsNamespace.vars.options]);
    const filipinoColumn = document.getElementById('filipino-options');
    const englishColumn = document.getElementById('english-options');
  
    filipinoColumn.innerHTML = '';
    englishColumn.innerHTML = '';
  
    shuffledFilipino.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'option-item mb-2 p-2 border text-center card shadow';
      div.textContent = item.filipino;
      div.setAttribute('data-filipino', item.filipino);
      div.setAttribute('data-english', item.english);
      div.style.cursor = 'pointer';
      div.onclick = () => pairsNamespace.select(div, 'filipino');
      filipinoColumn.appendChild(div);
    });
  
    shuffledEnglish.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'option-item mb-2 p-2 border text-center card shadow';
      div.textContent = item.english;
      div.setAttribute('data-filipino', item.filipino);
      div.setAttribute('data-english', item.english);
      div.style.cursor = 'pointer';
      div.onclick = () => pairsNamespace.select(div, 'english');
      englishColumn.appendChild(div);
    });
  },


  select: function (div, language) {
  if (language === 'filipino') {
    if (pairsNamespace.vars.selectedFilipino != null && pairsNamespace.vars.selectedFilipino !== div) {
      pairsNamespace.vars.selectedFilipino.classList.remove('bg-primary', 'text-white');
    }
    pairsNamespace.vars.selectedFilipino = div;
  } else {
    if (pairsNamespace.vars.selectedEnglish != null && pairsNamespace.vars.selectedEnglish !== div) {
      pairsNamespace.vars.selectedEnglish.classList.remove('bg-primary', 'text-white');
    }
    pairsNamespace.vars.selectedEnglish = div;
  }

  div.classList.add('bg-primary', 'text-white');

  if (pairsNamespace.vars.selectedFilipino && pairsNamespace.vars.selectedEnglish) {
    pairsNamespace.disableOpts(true);

    const btn_filipinoValue = pairsNamespace.vars.selectedFilipino.getAttribute('data-english');
    const btn_englishValue = pairsNamespace.vars.selectedEnglish.getAttribute('data-english');

    const englishItem = pairsNamespace.vars.options.find(
      (option) => option.english === btn_englishValue,
    );
    let feedback = document.getElementById('feedback');

    if (btn_filipinoValue === btn_englishValue) {
      feedback.textContent = '✅ Correct!';
      feedback.className = 'text-success';
      if (pairsNamespace.vars.options.length != 1)
        confetti({ particleCount: 50 })
      else
        confetti({ particleCount: 300 })
      setTimeout(() => {
        pairsNamespace.vars.selectedEnglish.remove(); // since I am removing the elements here I do not need to call handleOptions again
        pairsNamespace.vars.selectedFilipino.remove();
        pairsNamespace.vars.options.splice(pairsNamespace.vars.options.indexOf(englishItem), 1);
        pairsNamespace.vars.selectedFilipino = null;
        pairsNamespace.vars.selectedEnglish = null;
        feedback.textContent = '';
        if (pairsNamespace.vars.options.length === 0) {
          const myModal = new bootstrap.Modal(
            document.getElementById('modalGame'),
          );
          myModal.show();
        }
        pairsNamespace.disableOpts(false);
      }, 1000);
    } else {
      feedback.textContent = '❌ Incorrect! Try again.';
      feedback.className = 'text-danger';
      setTimeout(() => {
        feedback.textContent = '';
        pairsNamespace.vars.selectedFilipino.classList.remove('bg-primary', 'text-white');
        pairsNamespace.vars.selectedEnglish.classList.remove('bg-primary', 'text-white');
        pairsNamespace.vars.selectedEnglish = null;
        pairsNamespace.vars.selectedFilipino = null;
        pairsNamespace.disableOpts(false);
      }, 1000);
    }
  }
}

}


