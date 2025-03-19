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
  return array;
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

function fetchPage(fileName, elementID, callBack = null) {
  updateOnpageChange();
  fetch(fileName)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementID).innerHTML = data;
      if (typeof callBack == 'function' && callBack != null) callBack(); // always at the end cause some callbacks make use of elements on data
    });
}
function fetchForGame(optionsObject, scriptName, functionName) {
  loadScript(scriptName, functionName, shuffleArray(optionsObject));
}

function goToHome() {
  fetchPage('homeContent.html', 'mainSection');
}
function goToVowels() {
  fetchPage('vowels.html', 'mainSection');
}
function goToAlphabet() {
  fetchPage('alphabet.html', 'mainSection');
}
function goToGreetings() {
  fetchPage('greetings.html', 'mainSection', () =>
    loadScript('togglepopover.js'),
  );
}
function goToPronouns() {
  fetchPage('pronouns.html', 'mainSection');
}
function goToPronounsGroup1() {
  fetchPage('pronounsgroup1.html', 'mainSection');
}
function goToPronounsGameGroup1() {
  fetchPage('games/html/pronounsgamegroup1.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'Ako', english: 'I' },
        { filipino: 'Ikaw/ka', english: 'You' },
        { filipino: 'Siya', english: 'He/She' },
        { filipino: 'Kami', english: 'We (exclusive)' },
        { filipino: 'Tayo', english: 'We (inclusive)' },
        { filipino: 'Kayo', english: 'You (plural)' },
        { filipino: 'Sila', english: 'They' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
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
  fetchPage('introduceyourself.html', 'mainSection', () =>
    loadScript('togglepopover.js'),
  );
}
function goToNumbers() {
  fetchPage('numbers.html', 'mainSection');
}
function goToNumbersGame0to10() {
  fetchPage('games/html/numbersgame0to10.html', 'mainSection', () => {
    fetchForGame(
      [
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
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToNumbersGame11to19() {
  fetchPage('games/html/numbersgame11to19.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'labing-isa', english: 'eleven' },
        { filipino: 'labindalawa', english: 'twelve' },
        { filipino: 'labintatlo', english: 'thirteen' },
        { filipino: 'labingapat', english: 'fourteen' },
        { filipino: 'labinlima', english: 'fifteen' },
        { filipino: 'labing-anim', english: 'sixteen' },
        { filipino: 'labimpito', english: 'seventeen' },
        { filipino: 'labingwalo', english: 'eighteen' },
        { filipino: 'labinsiyam', english: 'nineteen' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToNumbersGameHUNDREDS() {
  fetchPage('games/html/numbersgamehundreds.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'isang daan', english: 'one hundred' },
        { filipino: 'dalawang daan', english: 'two hundred' },
        { filipino: 'tatlong daan', english: 'three hundred' },
        { filipino: 'apat na daan', english: 'four hundred' },
        { filipino: 'limang daan', english: 'five hundred' },
        { filipino: 'anim na daan', english: 'six hundred' },
        { filipino: 'pitong daan', english: 'seven hundred' },
        { filipino: 'walong daan', english: 'eight hundred' },
        { filipino: 'siyam na daan', english: 'nine hundred' },
      ],
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToNumbersGameTENS() {
  fetchPage('games/html/numbersgametens.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'labing-isa', english: 'eleven' },
        { filipino: 'labindalawa', english: 'twelve' },
        { filipino: 'labintatlo', english: 'thirteen' },
        { filipino: 'labingapat', english: 'fourteen' },
        { filipino: 'labinlima', english: 'fifteen' },
        { filipino: 'labing-anim', english: 'sixteen' },
        { filipino: 'labimpito', english: 'seventeen' },
        { filipino: 'labingwalo', english: 'eighteen' },
        { filipino: 'labinsiyam', english: 'nineteen' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToColorsGame() {
  fetchPage('colorsgame.html', 'mainSection', () => {
    fetchForGame(
      [
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
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToDaysOfTheWeek() {
  fetchPage('games/html/daysoftheweek.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'Lunes', english: 'Monday' },
        { filipino: 'Martes', english: 'Tuesday' },
        { filipino: 'Miyerkules', english: 'Wednesday' },
        { filipino: 'Huwebes', english: 'Thursday' },
        { filipino: 'Biyernes', english: 'Friday' },
        { filipino: 'Sabado', english: 'Saturday' },
        { filipino: 'Linggo', english: 'Sunday' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToMonthsOfTheYear() {
  fetchPage('games/html/monthsoftheyear.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'Enero', english: 'January' },
        { filipino: 'Pebrero', english: 'February' },
        { filipino: 'Marso', english: 'March' },
        { filipino: 'Abril', english: 'April' },
        { filipino: 'Mayo', english: 'May' },
        { filipino: 'Hunyo', english: 'June' },
        { filipino: 'Hulyo', english: 'July' },
        { filipino: 'Agosto', english: 'August' },
        { filipino: 'Setyembre', english: 'September' },
        { filipino: 'Oktubre', english: 'October' },
        { filipino: 'Nobyembre', english: 'November' },
        { filipino: 'Disyembre', english: 'December' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
goToHome();
