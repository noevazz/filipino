function preloadImages(imageUrls) {
  imageUrls.forEach(url => {
    const img = new Image();
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      img.src = 'http://127.0.0.1:5500/' + url;
    } else {
      img.src = 'http://noevazz.github.io/filipino/' + url;
    }
  });
}
const words = {
  activities: [
    { filipino: 'nagluluto', imgURL: 'img/nagluluto.svg', english: "cooking" },
    { filipino: 'kumakain', imgURL: 'img/kumakain.svg', english: "eating" },
    { filipino: 'tumatakbo', imgURL: 'img/tumatakbo.svg', english: "running" },
    { filipino: 'nagbabasa', imgURL: 'img/nagbabasa.svg', english: "reading" },
    { filipino: 'umiinon', imgURL: 'img/umiinon.svg', english: "drinking" },
    { filipino: 'nagsusulat', imgURL: 'img/nagsusulat.svg', english: "writing" },
    { filipino: 'lumalangoy', imgURL: 'img/lumalangoy.svg', english: "swimming" },
  ],
  animals: [
    { filipino: 'aso', imgURL: 'img/animals/aso.svg', english: "dog" },
    { filipino: 'pusa', imgURL: 'img/animals/pusa.svg', english: "cat" },
    { filipino: 'ibon', imgURL: 'img/animals/ibon.svg', english: "bird" },
    { filipino: 'isda', imgURL: 'img/animals/isda.svg', english: "fish" },
    { filipino: 'baboy', imgURL: 'img/animals/baboy.svg', english: "pig" },
    { filipino: 'baka', imgURL: 'img/animals/baka.svg', english: "cow" },
    { filipino: 'kabayong', imgURL: 'img/animals/kabayong.svg', english: "horse" },
    { filipino: 'kuneho', imgURL: 'img/animals/kuneho.svg', english: "rabbit" },
    { filipino: 'unggoy', imgURL: 'img/animals/unggoy.svg', english: "monkey" },
    { filipino: 'manok', imgURL: 'img/animals/manok.svg', english: "chicken" },
    { filipino: 'kambing', imgURL: 'img/animals/kambing.svg', english: "goat" },
    { filipino: 'elepante', imgURL: 'img/animals/elepante.svg', english: "elephant" },
    { filipino: 'ahas', imgURL: 'img/animals/ahas.svg', english: "snake" },
    { filipino: 'gagamba', imgURL: 'img/animals/gagamba.svg', english: "spider" },
    { filipino: 'paruparo', imgURL: 'img/animals/paruparo.svg', english: "butterfly" },
    { filipino: 'pating', imgURL: 'img/animals/pating.svg', english: "shark" },
    { filipino: 'pagong', imgURL: 'img/animals/pagong.svg', english: "turtle" },
    { filipino: 'hipon', imgURL: 'img/animals/hipon.svg', english: "shrimp" },
    { filipino: 'tandang', imgURL: 'img/animals/tandang.svg', english: "rooster" },
    { filipino: 'pusit', imgURL: 'img/animals/pusit.svg', english: "squid" },
  ],
  clothes: [
    { filipino: "sapatos", english: "shoes", imgURL: "img/clothes/sapatos.svg" },
    { filipino: "damit", english: "clothes", imgURL: "img/clothes/damit.svg" },
    { filipino: "kamiseta", english: "shirt", imgURL: "img/clothes/kamiseta.svg" },
    { filipino: "pantalon", english: "pants", imgURL: "img/clothes/pantalon.svg" },
    { filipino: "bestida", english: "dress", imgURL: "img/clothes/bestida.svg" },
    { filipino: "palda", english: "skirt", imgURL: "img/clothes/palda.svg" },
    { filipino: "medyas", english: "socks", imgURL: "img/clothes/medyas.svg" },
    { filipino: "sumbrero", english: "hat", imgURL: "img/clothes/sumbrero.svg" },
    { filipino: "dyaket", english: "jacket", imgURL: "img/clothes/dyaket.svg" },
    { filipino: "kurbata", english: "tie", imgURL: "img/clothes/kurbata.svg" },
    { filipino: "salamin sa mata", english: "glasses", imgURL: "img/clothes/salamin_sa_mata.svg" },
    { filipino: "sinturon", english: "belt", imgURL: "img/clothes/sinturon.svg" },
    { filipino: "guwantes", english: "gloves", imgURL: "img/clothes/guwantes.svg" },
    { filipino: "bota", english: "boots", imgURL: "img/clothes/bota.svg" },
    { filipino: "sweter", english: "sweater", imgURL: "img/clothes/sweter.svg" },
    { filipino: "shorts", english: "shorts", imgURL: "img/clothes/shorts.svg" },
    { filipino: "panloob", english: "underwear", imgURL: "img/clothes/panloob.svg" },
    { filipino: "sandalyas", english: "Sandals", imgURL: "img/clothes/sandalyas.svg" }
  ],
};
preloadImages(words.activities.map(item => item.imgURL));
preloadImages(words.animals.map(item => item.imgURL));
preloadImages(words.clothes.map(item => item.imgURL));

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
function loadScript(scriptName, functionName = null, config = null, languageInGame = null) {
  // Check if the script already exists
  let existingScript = document.querySelector(`script[data-name="${scriptName}"]`);

  if (!existingScript) {
    const script = document.createElement('script');
    script.setAttribute('data-name', scriptName);
    script.src = scriptName; // Load script from URL
    script.async = true;

    script.onload = () => {
      if (typeof window[functionName] === 'function') {
        window[functionName](config, languageInGame);
      }
    };

    script.onerror = () => console.error(`Error loading script: ${scriptName}`);

    document.head.appendChild(script);
  } else {
    console.log(`script ${scriptName} already exist.`);
    // If script already exists, execute handleOptions immediately
    if (typeof window[functionName] === 'function') {
      window[functionName](config, languageInGame);
    }
  }
}

function fetchPage(fileName, elementID, callBack = null) {
  window.currentGoTo = fetchPage.caller.name;
  updateOnpageChange();
  fetch(fileName)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementID).innerHTML = data;
      if (typeof callBack == 'function' && callBack != null) callBack(); // always at the end cause some callbacks make use of elements on data
    });
}
function fetchForGame(optionsObject, scriptName, functionName, languageInGame = null) {
  loadScript(scriptName, functionName, shuffleArray(optionsObject), languageInGame);
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
function goToRootsAndAffixes() {
  fetchPage('rootandaffixes.html', 'mainSection');
}
function goToGameUmInfix() {
  fetchPage('games/html/uminfix.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'takbo', english: 'run' },
        { filipino: 'tatakbo', english: 'will run' },
        { filipino: 'tumakbo', english: 'ran' },
        { filipino: 'tumatakbo', english: 'running' },
        { filipino: 'kain', english: 'eat' },
        { filipino: 'kakain', english: 'will eat' },
        { filipino: 'kumain', english: 'ate' },
        { filipino: 'kumakain', english: 'eating' },
        { filipino: 'inom', english: 'drink' },
        { filipino: 'iinom', english: 'will drink' },
        { filipino: 'uminom', english: 'drank' },
        { filipino: 'umiinom', english: 'drinking' },
      ],
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToSentenceStructure() {
  fetchPage('sentencestructure.html', 'mainSection');
}
function goToMarkers() {
  fetchPage('markers.html', 'mainSection', () => loadScript('togglepopover.js', 'togglepopover'));
}
function goToGreetings() {
  fetchPage('greetings.html', 'mainSection', () => loadScript('togglepopover.js', 'togglepopover'));
}
function goToGameGreetingDepending() {
  fetchPage('games/html/greetingsdependingontime.html', 'mainSection', () => {
    fetchForGame(
      [
        {
          filipino: 'Magandang madaling araw',
          english: 'Good early morning  (Dawn – 12:00 AM to ~5:00 AM)',
        },
        {
          filipino: 'Magandang umaga',
          english: 'Good morning (Morning – ~5:00 AM to 11:59 AM)',
        },
        {
          filipino: 'Magandang tanghali',
          english: 'Good noon (Noon – 12:00 PM to ~1:00 PM)',
        },
        {
          filipino: 'Magandang hapon',
          english: 'Good afternoon (Afternoon – ~1:00 PM to 5:59 PM)',
        },
        {
          filipino: 'Magandang gabi',
          english: 'Good evening/night (Evening – ~6:00 PM to 11:59 PM)',
        },
        {
          filipino: 'Magandang hatinggabi',
          english: 'Good midnight (exactly 12 AM)',
        },
      ],
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToPronouns() {
  fetchPage('pronounsoverview.html', 'mainSection');
}
function goToPronounsGroup1() {
  fetchPage('pronounsgroup1.html', 'mainSection');
}
function goToPronounsGroup2() {
  fetchPage('pronounsgroup2.html', 'mainSection');
}
function goToPronounsGroup3() {
  fetchPage('pronounsgroup3.html', 'mainSection');
}
function goToPronounsGameGroup1(languageInGame = 'filipino') {
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
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToPronounsGameGroup2(languageInGame = 'filipino') {
  fetchPage('games/html/pronounsgamegroup2.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'Ko', english: 'My/Mine' },
        { filipino: 'Mo', english: 'Your/Yours' },
        { filipino: 'Niya', english: 'His/Her/Hers' },
        {
          filipino: 'Namin',
          english: 'Our/Ours (exclusive)',
        },
        {
          filipino: 'Atin',
          english: 'Our/Ours (inclusive)',
        },
        {
          filipino: 'Inyo',
          english: 'Your/Yours (plural/singular polite)',
        },
        { filipino: 'Nila', english: 'Their/Theirs' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToPronounsGameGroup3(languageInGame = 'filipino') {
  fetchPage('games/html/pronounsgamegroup3.html', 'mainSection', () => {
    fetchForGame(
      [
        { filipino: 'Sa Akin', english: 'To me' },
        { filipino: 'Sa Iyo', english: 'To you' },
        { filipino: 'Sa Kanya', english: 'To him/her' },
        {
          filipino: 'Sa Amin',
          english: 'To us (exclusive)',
        },
        {
          filipino: 'Sa Atin',
          english: 'To us (inclusive)',
        },
        {
          filipino: 'Sa Inyo',
          english: 'To you (plural/singular polite)',
        },
        { filipino: 'Sa Kanila', english: 'To them' },
      ],
      'games/js/logicforcardsgame.js',
      'handleOptions',
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function openAbout() {
  fetch('modalabout.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('modalElement').innerHTML = data;
      let myModal = new bootstrap.Modal(document.getElementById('modalElement'));
      myModal.show();
    });
}
function goToIntroduceYourself() {
  fetchPage('introduceyourself.html', 'mainSection', () => loadScript('togglepopover.js', 'togglepopover'));
}
function goToNumbers() {
  fetchPage('numbers.html', 'mainSection');
}
function goToNumbersGame0to10(languageInGame = 'filipino') {
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
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToNumbersGame11to19(languageInGame = 'filipino') {
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
      languageInGame,
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
function goToGreetingsGame() {
  fetchPage('games/html/numbersgamehundreds.html', 'mainSection', () => {
    fetchForGame(
      [
        {
          filipino: 'kumusta?',
          english: 'how are you? (short version, used only with familiar people)',
        },
        {
          filipino: 'kumusta ka?',
          english: 'how are you? (used only with familiar people)',
        },
        {
          filipino: 'kumusta po?',
          english: 'how are you? (short version, it shows respect)',
        },
        {
          filipino: 'kumusta po kayo?',
          english: 'how are you? (extended version, it shows respect, works with singular and plural)',
        },
        {
          filipino: 'kumusta po sila?',
          english: 'how are you? (EXTREME respect, works with singular and plural)',
        },
        { filipino: 'mabuti', english: 'good/fine' },
        { filipino: 'mabuti rin', english: "I'm fine too" },
        { filipino: 'magandang umaga', english: 'good morning' },
        { filipino: 'magandang hapon', english: 'good afternoon' },
        { filipino: 'magandang gabi', english: 'good night' },
      ],
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToNumbersGameTENS(languageInGame = 'filipino') {
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
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToActivitesVocabulary() {
  fetchPage('games/html/activitiesvocabulary.html', 'mainSection', () => {
    fetchForGame(
      words.activities,
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToActivitesVocabularyImages() {
  fetchPage('games/html/activitiesvocabularyimages.html', 'mainSection', () => {
    fetchForGame(words.activities, 'games/js/imagesgame.js', 'handleOptionsImages');
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToAnimalsGameCards() {
  fetchPage('games/html/animalscards.html', 'mainSection', () => {
    fetchForGame(
      words.animals,
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToAnimalsGameImages() {
  fetchPage('games/html/animalsimages.html', 'mainSection', () => {
    fetchForGame(words.animals, 'games/js/imagesgame.js', 'handleOptionsImages');
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToClothes() {
  fetchPage('games/html/clothes.html', 'mainSection', () => {
    fetchForGame(
      words.clothes,
      'games/js/logicforpairsgame.js',
      'handleOptions_PAIR_GAME',
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToClothesImages() {
  fetchPage('games/html/clothesimages.html', 'mainSection', () => {
    fetchForGame(words.clothes, 'games/js/imagesgame.js', 'handleOptionsImages');
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToColorsGame(languageInGame = 'filipino') {
  fetchPage('games/html/colorsgame.html', 'mainSection', () => {
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
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToDaysOfTheWeek(languageInGame = 'filipino') {
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
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
function goToMonthsOfTheYear(languageInGame = 'filipino') {
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
      languageInGame,
    );
  });
  fetchPage('modalCompleted.html', 'modalElement');
}
goToHome();
