const loadScriptNamespace = {
  load: function (url, nameSpaceName, config = null) {
    console.log(`nameSpaceName: ${nameSpaceName}`);
    // Check if the script already exists
    let existingScript = document.querySelector(`script[data-name="${url}"]`);

    if (!existingScript) {
      const script = document.createElement('script');
      script.setAttribute('data-name', url);
      script.src = url;
      document.head.appendChild(script);
      script.onload = () => {
        console.log(`Loaded ${url}`);
        window[nameSpaceName].handleOptions(config);
      };
    } else {
      console.log(`script ${url} already exist.`);
      const interval = setInterval(() => {
        /*if the script hasn’t finished loading yet (even though the <script> tag exists),
        then window[nameSpaceName] will be undefined, and handleOptions doesn't get called,
        that's why Im adding an interval to check once the function is available */
        if (window[nameSpaceName] && typeof window[nameSpaceName].handleOptions === 'function') {
          console.log('function is now available');
          clearInterval(interval);
          window[nameSpaceName].handleOptions(config);
        }
      }, 50);
    }
  },
};

function preloadImages(imageUrls) {
  function loadPromise(url) {
    return new Promise(function (myResolve, MyReject) {
      const img = new Image();
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        img.src = 'http://127.0.0.1:5500/' + url;
      } else {
        img.src = 'http://noevazz.github.io/filipino/' + url;
      }
      myResolve(`loaded ${url}`);
    });
  }
  imageUrls.forEach(url => {
    loadPromise(url).then(value => {
      console.log(value);
    });
  });
}
const words = {
  activities: [
    { filipino: 'nagluluto', imgURL: 'img/nagluluto.svg', english: 'cooking' },
    { filipino: 'kumakain', imgURL: 'img/kumakain.svg', english: 'eating' },
    { filipino: 'tumatakbo', imgURL: 'img/tumatakbo.svg', english: 'running' },
    { filipino: 'nagbabasa', imgURL: 'img/nagbabasa.svg', english: 'reading' },
    { filipino: 'umiinon', imgURL: 'img/umiinon.svg', english: 'drinking' },
    { filipino: 'nagsusulat', imgURL: 'img/nagsusulat.svg', english: 'writing' },
    { filipino: 'lumalangoy', imgURL: 'img/lumalangoy.svg', english: 'swimming' },
    { filipino: 'naglalakad', imgURL: 'img/naglalakad.svg', english: 'walking' },
    { filipino: 'natutulog', imgURL: 'img/natutulog.svg', english: 'sleeping' },
    { filipino: 'nagmamaneho', imgURL: 'img/nagmamaneho.svg', english: 'driving' },
  ],
  animals: [
    { filipino: 'aso', imgURL: 'img/animals/aso.svg', english: 'dog' },
    { filipino: 'pusa', imgURL: 'img/animals/pusa.svg', english: 'cat' },
    { filipino: 'ibon', imgURL: 'img/animals/ibon.svg', english: 'bird' },
    { filipino: 'isda', imgURL: 'img/animals/isda.svg', english: 'fish' },
    { filipino: 'baboy', imgURL: 'img/animals/baboy.svg', english: 'pig' },
    { filipino: 'baka', imgURL: 'img/animals/baka.svg', english: 'cow' },
    { filipino: 'kabayong', imgURL: 'img/animals/kabayong.svg', english: 'horse' },
    { filipino: 'kuneho', imgURL: 'img/animals/kuneho.svg', english: 'rabbit' },
    { filipino: 'unggoy', imgURL: 'img/animals/unggoy.svg', english: 'monkey' },
    { filipino: 'manok', imgURL: 'img/animals/manok.svg', english: 'chicken' },
    { filipino: 'kambing', imgURL: 'img/animals/kambing.svg', english: 'goat' },
    { filipino: 'elepante', imgURL: 'img/animals/elepante.svg', english: 'elephant' },
    { filipino: 'ahas', imgURL: 'img/animals/ahas.svg', english: 'snake' },
    { filipino: 'gagamba', imgURL: 'img/animals/gagamba.svg', english: 'spider' },
    { filipino: 'paruparo', imgURL: 'img/animals/paruparo.svg', english: 'butterfly' },
    { filipino: 'pating', imgURL: 'img/animals/pating.svg', english: 'shark' },
    { filipino: 'pagong', imgURL: 'img/animals/pagong.svg', english: 'turtle' },
    { filipino: 'hipon', imgURL: 'img/animals/hipon.svg', english: 'shrimp' },
    { filipino: 'tandang', imgURL: 'img/animals/tandang.svg', english: 'rooster' },
    { filipino: 'pusit', imgURL: 'img/animals/pusit.svg', english: 'squid' },
  ],
  clothes: [
    { filipino: 'sapatos', english: 'shoes', imgURL: 'img/clothes/sapatos.svg' },
    { filipino: 'damit', english: 'clothes', imgURL: 'img/clothes/damit.svg' },
    { filipino: 'kamiseta', english: 'shirt', imgURL: 'img/clothes/kamiseta.svg' },
    { filipino: 'pantalon', english: 'pants', imgURL: 'img/clothes/pantalon.svg' },
    { filipino: 'bestida', english: 'dress', imgURL: 'img/clothes/bestida.svg' },
    { filipino: 'palda', english: 'skirt', imgURL: 'img/clothes/palda.svg' },
    { filipino: 'medyas', english: 'socks', imgURL: 'img/clothes/medyas.svg' },
    { filipino: 'sumbrero', english: 'hat', imgURL: 'img/clothes/sumbrero.svg' },
    { filipino: 'dyaket', english: 'jacket', imgURL: 'img/clothes/dyaket.svg' },
    { filipino: 'kurbata', english: 'tie', imgURL: 'img/clothes/kurbata.svg' },
    { filipino: 'salamin sa mata', english: 'glasses', imgURL: 'img/clothes/salamin_sa_mata.svg' },
    { filipino: 'sinturon', english: 'belt', imgURL: 'img/clothes/sinturon.svg' },
    { filipino: 'guwantes', english: 'gloves', imgURL: 'img/clothes/guwantes.svg' },
    { filipino: 'bota', english: 'boots', imgURL: 'img/clothes/bota.svg' },
    { filipino: 'sweter', english: 'sweater', imgURL: 'img/clothes/sweter.svg' },
    { filipino: 'shorts', english: 'shorts', imgURL: 'img/clothes/shorts.svg' },
    { filipino: 'panloob', english: 'underwear', imgURL: 'img/clothes/panloob.svg' },
    { filipino: 'sandalyas', english: 'Sandals', imgURL: 'img/clothes/sandalyas.svg' },
  ],
  food: [
    { filipino: 'tinapay', english: 'bread', imgURL: 'img/food/tinapay.svg' },
    { filipino: 'kanin', english: 'rice', imgURL: 'img/food/kanin.svg' },
    { filipino: 'mansanas', english: 'apple', imgURL: 'img/food/mansanas.svg' },
    { filipino: 'gatas', english: 'milk', imgURL: 'img/food/gatas.svg' },
    { filipino: 'tubig', english: 'water', imgURL: 'img/food/tubig.svg' },
    { filipino: 'itlog', english: 'egg', imgURL: 'img/food/itlog.svg' },
    { filipino: 'serbesa', english: 'beer', imgURL: 'img/food/serbesa.svg' },
    { filipino: 'saging', english: 'banana', imgURL: 'img/food/saging.svg' },
  ],
  colors: [
    { filipino: 'Pula', english: 'Red', imgURL: 'img/colors/pula.svg' },
    { filipino: 'Asul', english: 'Blue', imgURL: 'img/colors/asul.svg' },
    { filipino: 'Dilaw', english: 'Yellow', imgURL: 'img/colors/dilaw.svg' },
    { filipino: 'Berde/Lunti', english: 'Green', imgURL: 'img/colors/berde_lunti.svg' },
    { filipino: 'Kahel', english: 'Orange', imgURL: 'img/colors/kahel.svg' },
    { filipino: 'Lila/Ube', english: 'Purple', imgURL: 'img/colors/lila_ube.svg' },
    { filipino: 'Rosa', english: 'Pink', imgURL: 'img/colors/rosa.svg' },
    { filipino: 'Itim', english: 'Black', imgURL: 'img/colors/itim.svg' },
    { filipino: 'Puti', english: 'White', imgURL: 'img/colors/puti.svg' },
    { filipino: 'Abo/Abuhin', english: 'Gray', imgURL: 'img/colors/abo_abuhin.svg' },
    { filipino: 'Kayumanggi', english: 'Brown', imgURL: 'img/colors/kayumanggi.svg' },
  ],
};
preloadImages(words.activities.map(item => item.imgURL));
preloadImages(words.animals.map(item => item.imgURL));
preloadImages(words.clothes.map(item => item.imgURL));
preloadImages(words.food.map(item => item.imgURL));
preloadImages(words.colors.map(item => item.imgURL));

const games = {
  pronounsGroup1: [
    { filipino: 'Ako', english: 'I' },
    { filipino: 'Ikaw/ka', english: 'You' },
    { filipino: 'Siya', english: 'He/She' },
    { filipino: 'Kami', english: 'We (exclusive)' },
    { filipino: 'Tayo', english: 'We (inclusive)' },
    { filipino: 'Kayo', english: 'You (plural)' },
    { filipino: 'Sila', english: 'They' },
  ],
  pronounsGroup2: [
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
  pronounsGroup3: [
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
  uminffix: [
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
  greetings: [
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
  greetingTime: [
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
  seroToTen: [
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
  elevenToNineteen: [
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
  tens: [
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
  hundres: [
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
  daysOfTheWeek: [
    { filipino: 'Lunes', english: 'Monday' },
    { filipino: 'Martes', english: 'Tuesday' },
    { filipino: 'Miyerkules', english: 'Wednesday' },
    { filipino: 'Huwebes', english: 'Thursday' },
    { filipino: 'Biyernes', english: 'Friday' },
    { filipino: 'Sabado', english: 'Saturday' },
    { filipino: 'Linggo', english: 'Sunday' },
  ],
  monthsOfTheYear: [
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
};

window.routerNamespace = {
  currentPath: '#/',
  routes_obj: {
    '#/': {
      path: 'partials/home.html',
      navbarName: 'Home',
      icon: 'bi-house-fill',
    },
    '#/vowels': {
      path: 'partials/vowels.html',
      navbarName: 'Vowels',
      icon: 'bi-book',
    },
    '#/alphabet': {
      path: 'partials/alphabet.html',
      navbarName: 'Alphabet',
      icon: 'bi-book',
    },
    '#/pronouns': {
      dropdown: {
        navbarName: 'Pronouns',
        accordionName: 'pronouns',
        links: [
          {
            key: '#/pronouns-overview',
            path: 'partials/pronouns/overview.html',
            navbarName: 'Overview',
            icon: 'bi-book',
          },
          {
            key: '#/pronouns-group1',
            path: 'partials/pronouns/pronounsgroup1.html',
            navbarName: 'Pronouns Ang Group',
            icon: 'bi-book',
          },
          {
            key: '#/pronouns-group2',
            path: 'partials/pronouns/pronounsgroup2.html',
            navbarName: 'Pronouns Ng Group',
            icon: 'bi-book',
          },
          {
            key: '#/pronouns-group3',
            path: 'partials/pronouns/pronounsgroup3.html',
            navbarName: 'Pronouns Sa Group',
            icon: 'bi-book',
          },
          { key: '#/pronouns-kita', path: 'partials/pronouns/kita.html', navbarName: 'Kita', icon: 'bi-book' },
          {
            key: '#/pronouns-game-group1',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Game Ang Group | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: games.pronounsGroup1,
              config: { gameData: structuredClone(games.pronounsGroup1), gameTitle: 'Game Group 1 | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/pronouns-game-group2',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Game Ng Group | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: games.pronounsGroup2,
              config: { gameData: structuredClone(games.pronounsGroup2), gameTitle: 'Game Group 2 | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/pronouns-game-group3',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Game Sa Group | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: games.pronounsGroup3,
              config: { gameData: structuredClone(games.seroToTen), gameTitle: 'Game Group 3 | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
        ],
      },
      icon: 'bi-collection',
    },
    '#/rootandaffixes': {
      dropdown: {
        navbarName: 'Roots & Affixes',
        accordionName: 'rootandaffixes',
        links: [
          {
            key: '#/rootandaffixes-overview',
            path: 'partials/rootsandaffixes/overview.html',
            navbarName: 'Overview',
            icon: 'bi-book',
          },
          {
            key: '#/rootandaffixes-um-inffix-game',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Game Um Inffix | Pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(games.uminffix), gameTitle: 'Game | UM Infix' },
              nameSpace: 'pairsNamespace',
            },
          },
        ],
      },
      icon: 'bi-collection',
    },
    '#/markers': {
      path: 'partials/markers.html',
      navbarName: 'Markers',
      icon: 'bi-book',
    },
    '#/verbs': {
      path: 'partials/verbs.html',
      navbarName: 'Verbs',
      icon: 'bi-book',
    },
    '#/objectanfactorfocusverbs': {
      path: 'partials/objectanfactorfocusverbs.html',
      navbarName: 'Object/Actor Focus Verbs',
      icon: 'bi-book',
    },
    '#/sentencestructure': {
      path: 'partials/sentencestructure.html',
      navbarName: 'Sentences Structure',
      icon: 'bi-book',
    },
    '#/greetings': {
      dropdown: {
        navbarName: 'Greetings',
        accordionName: 'greetings',
        links: [
          {
            key: '#/greetings-overview',
            path: 'partials/greetings/overview.html',
            navbarName: 'Overview',
            icon: 'bi-book',
          },
          {
            key: '#/greetings-game',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Greetings | Pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(games.greetings), gameTitle: 'Greetings | Pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
          {
            key: '#/greetings-game-time',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Greetings Depending On Time | Pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: {
                gameData: structuredClone(games.greetingTime),
                gameTitle: 'Greetings Depending On Time | Pairs',
              },
              nameSpace: 'pairsNamespace',
            },
          },
        ],
      },
      icon: 'bi-collection',
    },
    '#/introduce-yourself': {
      path: 'partials/introduceyourself.html',
      navbarName: 'Introduce Yourself',
      icon: 'bi-book',
    },
    '#/numbers': {
      dropdown: {
        navbarName: 'Numbers',
        accordionName: 'numbers',
        links: [
          {
            key: '#/numbers-numbers',
            path: 'partials/numbers.html',
            navbarName: 'Overview',
            icon: 'bi-book',
          },
          {
            key: '#/numbers-game-0to10',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Game 0 to 10 | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: { gameData: structuredClone(games.seroToTen), gameTitle: 'Game 0 to 10 | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/numbers-game-11to19',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Game 11 to 19 | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: { gameData: structuredClone(games.elevenToNineteen), gameTitle: 'Game 11 to 19 | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/numbers-game-tens',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Game Tens | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: { gameData: structuredClone(games.tens), gameTitle: 'Game Tens | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/numbers-game-hundreds',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Game Hundreds | Pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(games.hundres), gameTitle: 'Game Hundreds | Pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
        ],
      },
      icon: 'bi-collection',
    },

    '#/vocabulary': {
      dropdown: {
        navbarName: 'Vocabulary Games',
        accordionName: 'vocabulary',
        links: [
          {
            key: '#/vocabulary-game-activities-pairs',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Vocabulary | pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(words.activities), gameTitle: 'Vocabulary | pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-activities-images',
            path: 'partials/games/html/images.html',
            navbarName: 'Vocabulary | Images',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/images.js',
              config: { gameData: structuredClone(words.activities), gameTitle: 'Vocabulary | Images' },
              nameSpace: 'imagesNamespace',
            },
          },
          {
            key: '#/vocabulary-game-animals-pairs',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Animals | pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(words.animals), gameTitle: 'Animals | pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-animals-images',
            path: 'partials/games/html/images.html',
            navbarName: 'Animals | Images',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/images.js',
              config: { gameData: structuredClone(words.animals), gameTitle: 'Animals | Images' },
              nameSpace: 'imagesNamespace',
            },
          },
          {
            key: '#/vocabulary-game-clothes-pairs',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Clothes | pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(words.clothes), gameTitle: 'Clothes | pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-clothes-images',
            path: 'partials/games/html/images.html',
            navbarName: 'Clothes | Images',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/images.js',
              config: { gameData: structuredClone(words.clothes), gameTitle: 'Clothes | Images' },
              nameSpace: 'imagesNamespace',
            },
          },
          {
            key: '#/vocabulary-game-food-pairs',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Food | pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(words.food), gameTitle: 'Food | pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-food-images',
            path: 'partials/games/html/images.html',
            navbarName: 'Food | Images',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/images.js',
              config: { gameData: structuredClone(words.food), gameTitle: 'Food | Images' },
              nameSpace: 'imagesNamespace',
            },
          },
          {
            key: '#/vocabulary-game-colors-pairs',
            path: 'partials/games/html/pairs.html',
            navbarName: 'Colors | pairs',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/pairs.js',
              config: { gameData: structuredClone(words.colors), gameTitle: 'Colors | pairs' },
              nameSpace: 'pairsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-colors-images',
            path: 'partials/games/html/images.html',
            navbarName: 'Colors | Images',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/images.js',
              config: { gameData: structuredClone(words.colors), gameTitle: 'Colors | Images' },
              nameSpace: 'imagesNamespace',
            },
          },
          {
            key: '#/vocabulary-game-colors-options',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Colors | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: { gameData: structuredClone(words.colors), gameTitle: 'Colors | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-dow-options',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Days Of The Week | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: { gameData: structuredClone(games.daysOfTheWeek), gameTitle: 'Days Of The Week | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
          {
            key: '#/vocabulary-game-moty-options',
            path: 'partials/games/html/questionoptions.html',
            navbarName: 'Months Of The Year | options',
            icon: 'bi-controller',
            game: {
              script: 'partials/games/js/questionoptions.js',
              config: { gameData: structuredClone(games.monthsOfTheYear), gameTitle: 'Months Of The Year | options' },
              nameSpace: 'questionOptionsNamespace',
            },
          },
        ],
      },
      icon: 'bi-collection',
    },
    '#/songs': {
      dropdown: {
        navbarName: 'Songs',
        accordionName: 'songs',
        links: [
          {
            key: '#/songs-pasilyo',
            path: 'partials/songs/pasilyo.html',
            navbarName: 'Pasilyo',
            icon: 'bi-file-earmark-music',
          },
        ],
      },
      icon: 'bi-file-earmark-music',
    },
    '#/about': {
      path: 'partials/about.html',
      navbarName: 'About',
      icon: 'bi-info-circle',
    },
  },
  get_flat_routes: function () {
    let flatRoutes = {};
    for (const [key, value] of Object.entries(routerNamespace.routes_obj)) {
      flatRoutes[key] = { path: value.path };
      // If dropdown exists, add links too
      if (value.dropdown?.links) {
        for (const link of value.dropdown.links) {
          flatRoutes[link.key] = { path: link.path, game: link.game };
        }
      }
    }
    return flatRoutes;
  },

  getHashRoute: function () {
    return location.hash || '#/';
  },
  createPronounsNavItem: function (obj) {
    const createElement = (tag, attrs = {}, children = []) => {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) {
        if (key === 'class') el.className = value;
        else if (key === 'style') el.style.cssText = value;
        else if (key === 'key') el.href = value;
        else el.setAttribute(key, value);
        if (el.tagName === 'A') {
          el.dataset.bsDismiss = 'offcanvas';
          el.setAttribute('data-link', '');
        }
      }
      children.forEach(child => {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else {
          el.appendChild(child);
        }
      });
      return el;
    };

    const listItems = obj.dropdown.links;

    const ulList = createElement(
      'ul',
      { class: 'list-unstyled' },
      listItems.map(item =>
        createElement('li', { class: 'nav-item' }, [
          createElement(
            'a',
            {
              class: 'nav-link text-truncate hover-text-primary',
              href: item.key,
              onclick: item.onclick,
              'data-bs-dismiss': 'offcanvas',
            },
            [
              createElement('i', { class: `fs-5 ${item.icon}` }),
              createElement('span', { class: 'ms-1 d-inline text-wrap' }, [item.navbarName]),
            ],
          ),
        ]),
      ),
    );

    const li = createElement('li', { class: 'nav-item container-fluid w- p-0' }, [
      createElement('div', { class: 'accordion p-0 m-0', id: `${obj.dropdown.accordionName}Accordion` }, [
        createElement('div', { class: 'accordion-item border-0' }, [
          createElement('h2', { class: 'accordion-header' }, [
            createElement(
              'button',
              {
                class: 'accordion-button collapsed nav-link text-truncate p-3',
                type: 'button',
                'data-bs-toggle': 'collapse',
                'data-bs-target': `#collapse${obj.dropdown.accordionName}`,
                'aria-expanded': 'false',
                'aria-controls': `collapse${obj.dropdown.accordionName}`,
              },
              [
                createElement(
                  'span',
                  {
                    style: 'text-decoration: none',
                    class: 'hover-text-primary text-primary',
                  },
                  [
                    createElement('i', { class: 'fs-5 bi-collection' }),
                    createElement('span', { class: 'ms-1 d-sm-inline' }, [obj.dropdown.navbarName]),
                  ],
                ),
              ],
            ),
          ]),
          createElement(
            'div',
            {
              id: `collapse${obj.dropdown.accordionName}`,
              class: 'accordion-collapse collapse',
              'data-bs-parent': `#${obj.dropdown.accordionName}Accordion`,
            },
            [createElement('div', { class: 'accordion-body' }, [ulList])],
          ),
        ]),
      ]),
    ]);

    return li;
  },
  createSimpleNavItem: function (routeObj, route) {
    const li = document.createElement('li');
    li.classList.add('nav-item', 'd-block');
    li.style.display = 'block';
    li.style.width = '100%';
    const a = document.createElement('a');
    a.classList.add('nav-link', 'text-truncate', 'hover-text-primary');
    a.href = route;
    a.dataset.bsDismiss = 'offcanvas';
    const i = document.createElement('i');
    i.classList.add('fs-5', routeObj.icon);
    const span = document.createElement('span');
    span.classList.add('ms-1', 'd-inline', 'text-wrap');
    span.innerHTML = routeObj.navbarName;

    li.appendChild(a);
    a.appendChild(i);
    a.appendChild(span);

    a.setAttribute('data-link', '');
    return li;
  },
  generate_sidebar: function () {
    Object.keys(routerNamespace.routes_obj).forEach(route => {
      const navbar = document.getElementById('sidebarUl');
      const routeObj = routerNamespace.routes_obj[route];
      if (routeObj.dropdown) {
        navbar.appendChild(routerNamespace.createPronounsNavItem(routeObj));
      } else {
        // If it is not dropdown then just create a normal item
        navbar.appendChild(routerNamespace.createSimpleNavItem(routeObj, route));
      }
    });
  },
  navigate: function () {
    function highlightActiveLink(path) {
      document.querySelectorAll('.nav-link,a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === path || a.textContent === path);
      });
    }
    const path = routerNamespace.getHashRoute();
    const route = routerNamespace.get_flat_routes()[path].path || routerNamespace.get_flat_routes()['#/'].path;
    swap = htmx.ajax('GET', route, { target: '#mainSection', swap: 'innerHTML' });
    highlightActiveLink(path);
    routerNamespace.currentPath = path;
    swap.then(
      value => {
        console.log(`Swap completed for ${route}`);
        if (routerNamespace.get_flat_routes()[path].game) {
          console.log('loading game script');
          loadScriptNamespace.load(
            routerNamespace.get_flat_routes()[path].game.script,
            routerNamespace.get_flat_routes()[path].game.nameSpace,
            routerNamespace.get_flat_routes()[path].game.config,
          );
        }
      },
      error => {
        console.log('Oops! something happend during the swap');
        console.log(error);
      },
    );

    // I want to run the next code only when the get above is donde
  },
  setRouter: function () {
    routerNamespace.generate_sidebar();

    // Detectar clics en enlaces (incluyendo dropdowns)
    document.body.addEventListener('click', e => {
      const link = e.target.closest('a[data-link], .dropdown-btn');
      if (link) {
        e.preventDefault();
        location.hash = link.getAttribute('href') || `#${link.textContent.toLowerCase().replace(/\s+/g, '-')}`;
      }
    });
    // Detectar cambios en el hash (atrás/adelante, navegación)
    window.addEventListener('hashchange', window.routerNamespace.navigate);
    // Load initial view
    window.routerNamespace.navigate();
  },
};

routerNamespace.setRouter();
