function updateOnpageChange() {
  if (typeof position !== 'undefined') {
    position = 0;
  }
  if (typeof selectedFilipino !== 'undefined') {
    selectedFilipino = null;
  }
  if (typeof selectedEnglish !== 'undefined') {
    selectedEnglish = null;
  }
  if (typeof shuffledFilipino !== 'undefined') {
    shuffledFilipino = [];
  }
  if (typeof shuffledEnglish !== 'undefined') {
    shuffledEnglish = [];
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function loadScript(scriptName, functionName = null, config = null) {
  // Check if the script already exists
  let existingScript = document.querySelector(
    `script[data-name="${scriptName}"]`,
  );

  if (!existingScript) {
    const script = document.createElement('script');
    script.setAttribute('data-name', scriptName);
    script.src = scriptName; // Load script from URL
    script.async = true;

    script.onload = () => {
      if (typeof window[functionName] === 'function') {
        window[functionName](config);
      }
    };

    script.onerror = () => console.error(`Error loading script: ${scriptName}`);

    document.head.appendChild(script);
  } else {
    console.log(`script ${scriptName} already exist.`);
    // If script already exists, execute handleOptions immediately
    if (typeof window[functionName] === 'function') {
      window[functionName](config);
    }
  }
}

fetch('sidebar.html')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('sideBar').innerHTML = data;
    const link = document.getElementById('homeLink');
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    ) {
      link.href = '/';
    } else {
      link.href = '/filipino';
    }
  });

function goToHome() {
  fetch('homeContent.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
  updateOnpageChange();
}
function goToVowels() {
  fetch('vowels.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
  updateOnpageChange();
}
function goToGreetings() {
  fetch('greetings.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      loadScript('togglepopover.js');
    });
  updateOnpageChange();
}
function goToPronouns() {
  updateOnpageChange();
  fetch('pronouns.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
}
function goToPronounsGroup1() {
  updateOnpageChange();
  fetch('pronounsgroup1.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
}
function goToPronounsGameGroup1() {
  updateOnpageChange();
  fetch('pronounsgamegroup1.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      let options = [
        { filipino: 'Ako', english: 'I' },
        { filipino: 'Ikaw/ka', english: 'You' },
        { filipino: 'Siya', english: 'He/She' },
        { filipino: 'Kami', english: 'We (exclusive)' },
        { filipino: 'Tayo', english: 'We (inclusive)' },
        { filipino: 'Kayo', english: 'You (plural)' },
        { filipino: 'Sila', english: 'They' },
      ];
      shuffleArray(options);
      loadScript('logicforcardsgame.js', 'handleOptions', options);
    });
  fetch('modalCompleted.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
    });
}
function openAbout() {
  fetch('modalabout.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
      let myModal = new bootstrap.Modal(
        document.getElementById('modalElement'),
      );
      myModal.show();
    });
}
function goToIntroduceYourself() {
  updateOnpageChange();
  fetch('introduceyourself.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      loadScript('togglepopover.js');
    });
}
function goToVocabulary() {
  updateOnpageChange();
  fetch('vocabulary.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
}
function goToAlphabet() {
  updateOnpageChange();
  fetch('alphabet.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
}
function goToNumbers() {
  updateOnpageChange();
  fetch('numbers.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
    });
}
function goToNumbersGame0to10() {
  updateOnpageChange();
  fetch('numbersgame0to10.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      let options = [
        { filipino: 'sero', english: 'zero' },
        { filipino: 'isa', english: 'one' },
        { filipino: 'dalawa', english: 'two' },
        { filipino: 'tatlo', english: 'three' },
        { filipino: 'apat', english: 'four' },
        { filipino: 'lima', english: 'five' },
        { filipino: 'anim', english: 'six' },
        { filipino: 'pito', english: 'seven' },
        { filipino: 'walo', english: 'eight' },
        { filipino: 'siyam', english: 'nine' },
        { filipino: 'sampu', english: 'ten' },
      ];
      shuffleArray(options);
      loadScript('logicforcardsgame.js', 'handleOptions', options);
    });
  fetch('modalCompleted.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
    });
}
function goToNumbersGame11to19() {
  updateOnpageChange();
  fetch('numbersgame11to19.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      let options = [
        { filipino: 'labing-isa', english: 'eleven' },
        { filipino: 'labindalawa', english: 'twelve' },
        { filipino: 'labintatlo', english: 'thirteen' },
        { filipino: 'labingapat', english: 'fourteen' },
        { filipino: 'labinlima', english: 'fifteen' },
        { filipino: 'labing-anim', english: 'sixteen' },
        { filipino: 'labimpito', english: 'seventeen' },
        { filipino: 'labingwalo', english: 'eighteen' },
        { filipino: 'labinsiyam', english: 'nineteen' },
      ];
      shuffleArray(options);
      loadScript('logicforcardsgame.js', 'handleOptions', options);
    });
  fetch('modalCompleted.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
    });
}
function goToNumbersGameHUNDREDS() {
  updateOnpageChange();
  fetch('numbersgamehundreds.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      let options = [
        { filipino: 'isang daan', english: 'one hundred' },
        { filipino: 'dalawang daan', english: 'two hundred' },
        { filipino: 'tatlong daan', english: 'three hundred' },
        { filipino: 'apat na daan', english: 'four hundred' },
        { filipino: 'limang daan', english: 'five hundred' },
        { filipino: 'anim na daan', english: 'six hundred' },
        { filipino: 'pitong daan', english: 'seven hundred' },
        { filipino: 'walong daan', english: 'eight hundred' },
        { filipino: 'siyam na daan', english: 'nine hundred' },
      ];
      shuffleArray(options);
      loadScript('logicforpairsgame.js', 'handleOptions_PAIR_GAME', options);
    });
  fetch('modalCompleted.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
    });
}
function goToNumbersGameTENS() {
  updateOnpageChange();
  fetch('numbersgametens.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      let options = [
        { filipino: 'dalawampu', english: 'twenty' },
        { filipino: 'tatlumpu', english: 'thirty' },
        { filipino: 'apatnapu', english: 'forty' },
        { filipino: 'limampu', english: 'fifty' },
        { filipino: 'pitumpu', english: 'seventy' },
        { filipino: 'walumpu', english: 'eighty' },
        { filipino: 'siyamnapu', english: 'ninety' },
      ];
      shuffleArray(options);
      loadScript('logicforcardsgame.js', 'handleOptions', options);
    });
  fetch('modalCompleted.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
    });
}
function goToColorsGame() {
  updateOnpageChange();
  fetch('colorsgame.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('mainSection').innerHTML = data;
      let options = [
        { filipino: 'Pula', english: 'Red' },
        { filipino: 'Asul', english: 'Blue' },
        { filipino: 'Dilaw', english: 'Yellow' },
        { filipino: 'Berde/Lunti', english: 'Green' },
        { filipino: 'Kahel', english: 'Orange' },
        { filipino: 'Lila/Ube', english: 'Purple' },
        { filipino: 'Rosa', english: 'Pink' },
        { filipino: 'Itim', english: 'Black' },
        { filipino: 'Puti', english: 'White' },
        { filipino: 'Abo/Abuhin', english: 'Gray' },
        { filipino: 'Kayumanggi', english: 'Brown' },
      ];
      shuffleArray(options);
      loadScript('logicforcardsgame.js', 'handleOptions', options);
    });
  fetch('modalCompleted.html')
    .then((response) => response.text())
    .then((data) => {
      document.getElementById('modalElement').innerHTML = data;
    });
}
goToHome();

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
  document
    .getElementById('themeToggleIcon')
    .classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
}

function toggleTheme() {
  const htmlElement = document.documentElement;
  const iconElement = document.getElementById('themeToggleIcon');

  if (htmlElement.getAttribute('data-bs-theme') === 'dark') {
    htmlElement.removeAttribute('data-bs-theme');
    localStorage.setItem('theme', 'light');
    iconElement.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
  } else {
    htmlElement.setAttribute('data-bs-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    iconElement.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
  }
}
