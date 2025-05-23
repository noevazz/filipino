const loadScriptNamespace = {
  load: function (url, nameSpaceName, config = null) {
    console.log(`nameSpaceName: ${nameSpaceName}`);
    // Check if the script already exists
    let existingScript = document.querySelector(`script[data-name="${url}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.setAttribute("data-name", url);
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
        if (window[nameSpaceName] && typeof window[nameSpaceName].handleOptions === "function") {
          console.log("function is now available");
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
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        img.src = "http://127.0.0.1:5500/" + url;
      } else {
        img.src = "http://noevazz.github.io/filipino/" + url;
      }
      myResolve(`loaded ${url}`);
    });
  }
  imageUrls.forEach((url) => {
    loadPromise(url).then((value) => {
      console.debug(value);
    });
  });
}
const words = {
  body: [
    { filipino: "bibig", imgURL: "img/body/bibig.svg", english: "mouth" },
    { filipino: "binti", imgURL: "img/body/binti.svg", english: "leg" },
    { filipino: "braso", imgURL: "img/body/braso.svg", english: "arm" },
    { filipino: "buto", imgURL: "img/body/buto.svg", english: "bone" },
    { filipino: "dila", imgURL: "img/body/dila.svg", english: "tongue" },
    { filipino: "ilong", imgURL: "img/body/ilong.svg", english: "nose" },
    { filipino: "kamay", imgURL: "img/body/kamay.svg", english: "hand" },
    { filipino: "mata", imgURL: "img/body/mata.svg", english: "eye" },
    { filipino: "paa", imgURL: "img/body/paa.svg", english: "foot" },
    { filipino: "puso", imgURL: "img/body/puso.svg", english: "heart" },
    { filipino: "tenga", imgURL: "img/body/tenga.svg", english: "ears" },
    { filipino: "ulo", imgURL: "img/body/ulo.svg", english: "head" },
  ],
  activities: [
    { filipino: "kumakain", imgURL: "img/kumakain.svg", english: "eating" },
    { filipino: "lumalangoy", imgURL: "img/lumalangoy.svg", english: "swimming" },
    { filipino: "nagbabasa", imgURL: "img/nagbabasa.svg", english: "reading" },
    { filipino: "naglalakad", imgURL: "img/naglalakad.svg", english: "walking" },
    { filipino: "nagluluto", imgURL: "img/nagluluto.svg", english: "cooking" },
    { filipino: "nagmamaneho", imgURL: "img/nagmamaneho.svg", english: "driving" },
    { filipino: "nagsusulat", imgURL: "img/nagsusulat.svg", english: "writing" },
    { filipino: "natutulog", imgURL: "img/natutulog.svg", english: "sleeping" },
    { filipino: "tumatakbo", imgURL: "img/tumatakbo.svg", english: "running" },
    { filipino: "umiinon", imgURL: "img/umiinon.svg", english: "drinking" },
  ],
  animals: [
    { filipino: "ahas", imgURL: "img/animals/ahas.svg", english: "snake" },
    { filipino: "aso", imgURL: "img/animals/aso.svg", english: "dog" },
    { filipino: "baboy", imgURL: "img/animals/baboy.svg", english: "pig" },
    { filipino: "baka", imgURL: "img/animals/baka.svg", english: "cow" },
    { filipino: "bubuyog", imgURL: "img/animals/bubuyog.svg", english: "bee" },
    { filipino: "daga", imgURL: "img/animals/daga.svg", english: "mouse" },
    { filipino: "elepante", imgURL: "img/animals/elepante.svg", english: "elephant" },
    { filipino: "gagamba", imgURL: "img/animals/gagamba.svg", english: "spider" },
    { filipino: "hipon", imgURL: "img/animals/hipon.svg", english: "shrimp" },
    { filipino: "ibon", imgURL: "img/animals/ibon.svg", english: "bird" },
    { filipino: "isda", imgURL: "img/animals/isda.svg", english: "fish" },
    { filipino: "kabayo", imgURL: "img/animals/kabayo.svg", english: "horse" },
    { filipino: "kambing", imgURL: "img/animals/kambing.svg", english: "goat" },
    { filipino: "kuneho", imgURL: "img/animals/kuneho.svg", english: "rabbit" },
    { filipino: "langaw", imgURL: "img/animals/langaw.svg", english: "fly" },
    { filipino: "lumba-lumba", imgURL: "img/animals/lumba-lumba.svg", english: "dolphin" },
    { filipino: "manok", imgURL: "img/animals/manok.svg", english: "chicken" },
    { filipino: "oso", imgURL: "img/animals/oso.svg", english: "bear" },
    { filipino: "pagong", imgURL: "img/animals/pagong.svg", english: "turtle" },
    { filipino: "panda", imgURL: "img/animals/panda.svg", english: "panda" },
    { filipino: "paruparo", imgURL: "img/animals/paruparo.svg", english: "butterfly" },
    { filipino: "pating", imgURL: "img/animals/pating.svg", english: "shark" },
    { filipino: "pusa", imgURL: "img/animals/pusa.svg", english: "cat" },
    { filipino: "pusit", imgURL: "img/animals/pusit.svg", english: "squid" },
    { filipino: "tandang", imgURL: "img/animals/tandang.svg", english: "rooster" },
    { filipino: "unggoy", imgURL: "img/animals/unggoy.svg", english: "monkey" },
  ],
  flavors: [
    { filipino: "maalat", english: "salty", imgURL: "img/flavors/maalat.svg" },
    { filipino: "maanghang", english: "spicy", imgURL: "img/flavors/maanghang.svg" },
    { filipino: "maasim", english: "sour", imgURL: "img/flavors/maasim.svg" },
    { filipino: "mapait", english: "bitter", imgURL: "img/flavors/mapait.svg" },
    { filipino: "matamis", english: "sweet", imgURL: "img/flavors/matamis.svg" },
  ],
  clothes: [
    { filipino: "bestida", english: "dress", imgURL: "img/clothes/bestida.svg" },
    { filipino: "bota", english: "boots", imgURL: "img/clothes/bota.svg" },
    { filipino: "damit", english: "clothes", imgURL: "img/clothes/damit.svg" },
    { filipino: "dyaket", english: "jacket", imgURL: "img/clothes/dyaket.svg" },
    { filipino: "guwantes", english: "gloves", imgURL: "img/clothes/guwantes.svg" },
    { filipino: "kamiseta", english: "shirt", imgURL: "img/clothes/kamiseta.svg" },
    { filipino: "kurbata", english: "tie", imgURL: "img/clothes/kurbata.svg" },
    { filipino: "medyas", english: "socks", imgURL: "img/clothes/medyas.svg" },
    { filipino: "palda", english: "skirt", imgURL: "img/clothes/palda.svg" },
    { filipino: "panloob", english: "underwear", imgURL: "img/clothes/panloob.svg" },
    { filipino: "pantalon", english: "pants", imgURL: "img/clothes/pantalon.svg" },
    { filipino: "salamin sa mata", english: "glasses", imgURL: "img/clothes/salamin_sa_mata.svg" },
    { filipino: "sandalyas", english: "Sandals", imgURL: "img/clothes/sandalyas.svg" },
    { filipino: "sapatos", english: "shoes", imgURL: "img/clothes/sapatos.svg" },
    { filipino: "shorts", english: "shorts", imgURL: "img/clothes/shorts.svg" },
    { filipino: "sinturon", english: "belt", imgURL: "img/clothes/sinturon.svg" },
    { filipino: "sumbrero", english: "hat", imgURL: "img/clothes/sumbrero.svg" },
    { filipino: "sweter", english: "sweater", imgURL: "img/clothes/sweter.svg" },
  ],
  food: [
    { filipino: "abukado", english: "avocado", imgURL: "img/food/abukado.svg" },
    { filipino: "bawang", english: "garlic", imgURL: "img/food/bawang.svg" },
    { filipino: "dalanghita", english: "tangerin", imgURL: "img/food/dalanghita.svg" },
    { filipino: "dayap", english: "lime", imgURL: "img/food/dayap.svg" },
    { filipino: "gatas", english: "milk", imgURL: "img/food/gatas.svg" },
    { filipino: "isaw ng manok", english: "chicken intestines", imgURL: "img/food/isaw.svg" },
    { filipino: "kabute", english: "mushroom", imgURL: "img/food/kabute.svg" },
    { filipino: "kalamansi", english: "calamansi", imgURL: "img/food/kalamansi.svg" },
    { filipino: "kamatis", english: "tomato", imgURL: "img/food/kamatis.svg" },
    { filipino: "kanin", english: "rice", imgURL: "img/food/kanin.svg" },
    { filipino: "kape", english: "coffee", imgURL: "img/food/kape.svg" },
    { filipino: "karot", english: "carrot", imgURL: "img/food/karot.svg" },
    { filipino: "kendi", english: "candy", imgURL: "img/food/kendi.svg" },
    { filipino: "keso", english: "cheese", imgURL: "img/food/keso.svg" },
    { filipino: "kiwi", english: "kiwi", imgURL: "img/food/kiwi.svg" },
    { filipino: "litsugas", english: "lettuce", imgURL: "img/food/litsugas.svg" },
    { filipino: "mais", english: "corn", imgURL: "img/food/mais.svg" },
    { filipino: "mangga", english: "mango", imgURL: "img/food/mangga.svg" },
    { filipino: "mani", english: "peanut", imgURL: "img/food/mani.svg" },
    { filipino: "mansanas", english: "apple", imgURL: "img/food/mansanas.svg" },
    { filipino: "melokoton", english: "peach", imgURL: "img/food/melokoton.svg" },
    { filipino: "niyog", english: "coconut", imgURL: "img/food/niyog.svg" },
    { filipino: "pakwan", english: "watermelon", imgURL: "img/food/pakwan.svg" },
    { filipino: "pinya", english: "pineapple", imgURL: "img/food/pinya.svg" },
    { filipino: "pipino", english: "cucumber", imgURL: "img/food/pipino.svg" },
    { filipino: "presa", english: "strawberry", imgURL: "img/food/presa.svg" },
    { filipino: "rambutan", english: "rambutan", imgURL: "img/food/rambutan.svg" },
    { filipino: "saging", english: "banana", imgURL: "img/food/saging.svg" },
    { filipino: "serbesa", english: "beer", imgURL: "img/food/serbesa.svg" },
    { filipino: "seresa", english: "cherry", imgURL: "img/food/seresa.svg" },
    { filipino: "sibuyas", english: "onion", imgURL: "img/food/sibuyas.svg" },
    { filipino: "sili", english: "chilli", imgURL: "img/food/sili.svg" },
    { filipino: "suka", english: "vinegar", imgURL: "img/food/suka.svg" },
    { filipino: "tinapay", english: "bread", imgURL: "img/food/tinapay.svg" },
    { filipino: "tsaa", english: "tea", imgURL: "img/food/tsaa.svg" },
    { filipino: "tubig", english: "water", imgURL: "img/food/tubig.svg" },
    { filipino: "ubas", english: "grapes", imgURL: "img/food/ubas.svg" },
    { filipino: "yelo", english: "ice", imgURL: "img/food/yelo.svg" },
  ],
  colors: [
    { filipino: "Abo/Abuhin", english: "Gray", imgURL: "img/colors/abo_abuhin.svg" },
    { filipino: "Asul", english: "Blue", imgURL: "img/colors/asul.svg" },
    { filipino: "Berde/Lunti", english: "Green", imgURL: "img/colors/berde_lunti.svg" },
    { filipino: "Dilaw", english: "Yellow", imgURL: "img/colors/dilaw.svg" },
    { filipino: "Itim", english: "Black", imgURL: "img/colors/itim.svg" },
    { filipino: "Kahel", english: "Orange", imgURL: "img/colors/kahel.svg" },
    { filipino: "Kayumanggi", english: "Brown", imgURL: "img/colors/kayumanggi.svg" },
    { filipino: "Lila/Ube", english: "Purple", imgURL: "img/colors/lila_ube.svg" },
    { filipino: "Pula", english: "Red", imgURL: "img/colors/pula.svg" },
    { filipino: "Puti", english: "White", imgURL: "img/colors/puti.svg" },
    { filipino: "Rosa", english: "Pink", imgURL: "img/colors/rosa.svg" },
  ],
  places: [
    { filipino: "bahay", english: "house", imgURL: "img/places/bahay.svg" },
    { filipino: "bangko", english: "bank", imgURL: "img/places/bangko.svg" },
    { filipino: "banyo", english: "bathroom", imgURL: "img/places/banyo.svg" },
    { filipino: "hotel", english: "hotel", imgURL: "img/places/hotel.svg" },
    { filipino: "lugsod/siyudad", english: "city", imgURL: "img/places/lungsod.svg" },
    { filipino: "paaralan", english: "school", imgURL: "img/places/paaralan.svg" },
    { filipino: "parke", english: "park", imgURL: "img/places/parke.svg" },
    { filipino: "restawran", english: "restaurant", imgURL: "img/places/restawran.svg" },
    { filipino: "simbahan/iglesia", english: "church", imgURL: "img/places/simbahan.svg" },
  ],
  instruments: [
    { filipino: "akurdyon", english: "accordion", imgURL: "img/instruments/akurdyon.svg" },
    { filipino: "biyulin", english: "violin", imgURL: "img/instruments/biyulin.svg" },
    { filipino: "gitara", english: "guitar", imgURL: "img/instruments/gitara.svg" },
    { filipino: "marakas", english: "maracas", imgURL: "img/instruments/marakas.svg" },
    { filipino: "mikropono", english: "microphone", imgURL: "img/instruments/mikropono.svg" },
    { filipino: "piyano", english: "piano", imgURL: "img/instruments/piyano.svg" },
    { filipino: "plawta", english: "flute", imgURL: "img/instruments/plawta.svg" },
    { filipino: "saksopon", english: "saxophone", imgURL: "img/instruments/saksopon.svg" },
    { filipino: "tambol", english: "drum", imgURL: "img/instruments/tambol.svg" },
    { filipino: "trombon", english: "trombone", imgURL: "img/instruments/trombon.svg" },
    { filipino: "trompeta", english: "trumpet", imgURL: "img/instruments/trompeta.svg" },
  ],
  seroToTen: [
    { filipino: "anim", english: "six", imgURL: "img/numbers0to10/anim.svg" },
    { filipino: "apat", english: "four", imgURL: "img/numbers0to10/apat.svg" },
    { filipino: "dalawa", english: "two", imgURL: "img/numbers0to10/dalawa.svg" },
    { filipino: "isa", english: "one", imgURL: "img/numbers0to10/isa.svg" },
    { filipino: "lima", english: "five", imgURL: "img/numbers0to10/lima.svg" },
    { filipino: "pito", english: "seven", imgURL: "img/numbers0to10/pito.svg" },
    { filipino: "sampu", english: "ten", imgURL: "img/numbers0to10/sampu.svg" },
    { filipino: "sero", english: "zero", imgURL: "img/numbers0to10/sero.svg" },
    { filipino: "siyam", english: "nine", imgURL: "img/numbers0to10/siyam.svg" },
    { filipino: "tatlo", english: "three", imgURL: "img/numbers0to10/tatlo.svg" },
    { filipino: "walo", english: "eight", imgURL: "img/numbers0to10/walo.svg" },
  ],
};
for (const [key, value] of Object.entries(words)) {
  preloadImages(value.map((item) => item.imgURL));
}

const games = {
  pronounsGroup1: [
    { filipino: "Ako", english: "I" },
    { filipino: "Ikaw/ka", english: "You" },
    { filipino: "Siya", english: "He/She" },
    { filipino: "Kami", english: "We (exclusive)" },
    { filipino: "Tayo", english: "We (inclusive)" },
    { filipino: "Kayo", english: "You (plural)" },
    { filipino: "Sila", english: "They" },
  ],
  pronounsGroup2: [
    { filipino: "Ko", english: "My/Mine" },
    { filipino: "Mo", english: "Your/Yours" },
    { filipino: "Niya", english: "His/Her/Hers" },
    {
      filipino: "Namin",
      english: "Our/Ours (exclusive)",
    },
    {
      filipino: "Atin",
      english: "Our/Ours (inclusive)",
    },
    {
      filipino: "Inyo",
      english: "Your/Yours (plural/singular polite)",
    },
    { filipino: "Nila", english: "Their/Theirs" },
  ],
  pronounsGroup3: [
    { filipino: "Sa Akin", english: "To me" },
    { filipino: "Sa Iyo", english: "To you" },
    { filipino: "Sa Kanya", english: "To him/her" },
    {
      filipino: "Sa Amin",
      english: "To us (exclusive)",
    },
    {
      filipino: "Sa Atin",
      english: "To us (inclusive)",
    },
    {
      filipino: "Sa Inyo",
      english: "To you (plural/singular polite)",
    },
    { filipino: "Sa Kanila", english: "To them" },
  ],
  uminffix: [
    { filipino: "takbo", english: "run" },
    { filipino: "tatakbo", english: "will run" },
    { filipino: "tumakbo", english: "ran" },
    { filipino: "tumatakbo", english: "running" },
    { filipino: "kain", english: "eat" },
    { filipino: "kakain", english: "will eat" },
    { filipino: "kumain", english: "ate" },
    { filipino: "kumakain", english: "eating" },
    { filipino: "inom", english: "drink" },
    { filipino: "iinom", english: "will drink" },
    { filipino: "uminom", english: "drank" },
    { filipino: "umiinom", english: "drinking" },
  ],
  greetings: [
    {
      filipino: "kumusta?",
      english: "how are you? (short version, used only with familiar people)",
    },
    {
      filipino: "kumusta ka?",
      english: "how are you? (used only with familiar people)",
    },
    {
      filipino: "kumusta po?",
      english: "how are you? (short version, it shows respect)",
    },
    {
      filipino: "kumusta po kayo?",
      english: "how are you? (extended version, it shows respect, works with singular and plural)",
    },
    {
      filipino: "kumusta po sila?",
      english: "how are you? (EXTREME respect, works with singular and plural)",
    },
    { filipino: "mabuti", english: "good/fine" },
    { filipino: "mabuti rin", english: "I'm fine too" },
    { filipino: "magandang umaga", english: "good morning" },
    { filipino: "magandang hapon", english: "good afternoon" },
    { filipino: "magandang gabi", english: "good night" },
  ],
  greetingTime: [
    {
      filipino: "Magandang madaling araw",
      english: "Good early morning  (Dawn – 12:00 AM to ~5:00 AM)",
    },
    {
      filipino: "Magandang umaga",
      english: "Good morning (Morning – ~5:00 AM to 11:59 AM)",
    },
    {
      filipino: "Magandang tanghali",
      english: "Good noon (Noon – 12:00 PM to ~1:00 PM)",
    },
    {
      filipino: "Magandang hapon",
      english: "Good afternoon (Afternoon – ~1:00 PM to 5:59 PM)",
    },
    {
      filipino: "Magandang gabi",
      english: "Good evening/night (Evening – ~6:00 PM to 11:59 PM)",
    },
    {
      filipino: "Magandang hatinggabi",
      english: "Good midnight (exactly 12 AM)",
    },
  ],
  elevenToNineteen: [
    { filipino: "labing-isa", english: "eleven" },
    { filipino: "labindalawa", english: "twelve" },
    { filipino: "labintatlo", english: "thirteen" },
    { filipino: "labingapat", english: "fourteen" },
    { filipino: "labinlima", english: "fifteen" },
    { filipino: "labing-anim", english: "sixteen" },
    { filipino: "labimpito", english: "seventeen" },
    { filipino: "labingwalo", english: "eighteen" },
    { filipino: "labinsiyam", english: "nineteen" },
  ],
  tens: [
    { filipino: "labing-isa", english: "eleven" },
    { filipino: "labindalawa", english: "twelve" },
    { filipino: "labintatlo", english: "thirteen" },
    { filipino: "labingapat", english: "fourteen" },
    { filipino: "labinlima", english: "fifteen" },
    { filipino: "labing-anim", english: "sixteen" },
    { filipino: "labimpito", english: "seventeen" },
    { filipino: "labingwalo", english: "eighteen" },
    { filipino: "labinsiyam", english: "nineteen" },
  ],
  hundres: [
    { filipino: "isang daan", english: "one hundred" },
    { filipino: "dalawang daan", english: "two hundred" },
    { filipino: "tatlong daan", english: "three hundred" },
    { filipino: "apat na daan", english: "four hundred" },
    { filipino: "limang daan", english: "five hundred" },
    { filipino: "anim na daan", english: "six hundred" },
    { filipino: "pitong daan", english: "seven hundred" },
    { filipino: "walong daan", english: "eight hundred" },
    { filipino: "siyam na daan", english: "nine hundred" },
  ],
  daysOfTheWeek: [
    { filipino: "Lunes", english: "Monday" },
    { filipino: "Martes", english: "Tuesday" },
    { filipino: "Miyerkules", english: "Wednesday" },
    { filipino: "Huwebes", english: "Thursday" },
    { filipino: "Biyernes", english: "Friday" },
    { filipino: "Sabado", english: "Saturday" },
    { filipino: "Linggo", english: "Sunday" },
  ],
  monthsOfTheYear: [
    { filipino: "Enero", english: "January" },
    { filipino: "Pebrero", english: "February" },
    { filipino: "Marso", english: "March" },
    { filipino: "Abril", english: "April" },
    { filipino: "Mayo", english: "May" },
    { filipino: "Hunyo", english: "June" },
    { filipino: "Hulyo", english: "July" },
    { filipino: "Agosto", english: "August" },
    { filipino: "Setyembre", english: "September" },
    { filipino: "Oktubre", english: "October" },
    { filipino: "Nobyembre", english: "November" },
    { filipino: "Disyembre", english: "December" },
  ],
  questions: [
    { filipino: "bakit", english: "why" },
    { filipino: "ano", english: "what" },
    { filipino: "saan", english: "where" },
    { filipino: "nasaan", english: "where (for locating people/things)" },
    { filipino: "sino", english: "who" },
    { filipino: "kailan", english: "when" },
    { filipino: "paano", english: "how (method)" },
    { filipino: "gaano", english: "how much (measure)" },
    { filipino: "magkano", english: "how much (cost)" },
    { filipino: "ilan", english: "how many (cunt)" },
    { filipino: "alin", english: "which" },
    { filipino: "kanino", english: "whose" },
  ],
};

const dictionary = {
  aba: "is an expression or interjection, not a formal word with a strict definition. It's used to express surprise, disbelief, admiration, or emphasis, similar to how we use 'oh', 'wow', 'hey', or 'well!' in English.",
  marunong: "'to know' or 'to have skill' in something.",
  naman:
    "It is a particle used to add contrast, emphasis, or a soft tone, depending on the context. It's often used when another person has spoken first, and you're responding or taking your turn. 'Ako naman si Andrea' works like saying 'Now it's my turn to answer (or introduce myself): I'm Andrea.'",
};

const dialogues = {
  questions: {
    dialogue: [
      { person: "personA", filipino: "🧑🏻‍🦱: Ano ang pangalan mo?", english: "What is your name?" },
      {
        person: "personB",
        filipino: "👱🏻‍♀️: Ako si Maria. Ikaw, ano ang pangalan mo?",
        english: "I'm Maria. And you, what's your name?",
      },
      { person: "personA", filipino: "🧑🏻‍🦱: Ako si John. Saan ka nakatira?", english: "I'm John. Where do you live?" },
      { person: "personB", filipino: "👱🏻‍♀️: Nakatira ako sa Maynila. Ikaw?", english: "I live in Manila. And you?" },
      {
        person: "personA",
        filipino: "🧑🏻‍🦱: Sa Cebu ako nakatira. Kailan ka pumunta sa Maynila?",
        english: "I live in Cebu. When did you go to Manila?",
      },
      {
        person: "personB",
        filipino: "👱🏻‍♀️: Noong isang taon pa. Bakit mo naitanong?",
        english: "Since last year. Why do you ask?",
      },
      {
        person: "personA",
        filipino: "🧑🏻‍🦱: Gusto ko kasing bumisita. Alin ang magandang puntahan doon?",
        english: "Because I want to visit. Which places are good to go there?",
      },
      {
        person: "personB",
        filipino: "👱🏻‍♀️: Marami! Pumunta ka sa Intramuros. Paano ka pupunta rito?",
        english: "Many! You should visit Intramuros. How will you get here?",
      },
      { person: "personA", filipino: "🧑🏻‍🦱: Baka sumakay ako ng eroplano.", english: "Maybe I’ll take a plane." },
    ],
    _dictionary: {},
  },
  simpleConversation: {
    dialogue: [
      { person: "personA", filipino: "👨🏻: Magandang umaga po", english: "Good morning" },
      { person: "personB", filipino: "👩🏽: Aba, marunong ka ba ng Tagalog?", english: "Wow, do you know tagalog?" },
      { person: "personA", filipino: "👨🏻: Kaunti lang po", english: "Just a little" },
      {
        person: "personB",
        filipino: "👩🏽: Taga-saan ka?, Taga-Pilipino?",
        english: "Where are you from?, from the Phillipines?",
      },
      {
        person: "personA",
        filipino: "👨🏻: Hindi po, taga-Mexico po 🇲🇽, estudyante po ako rito.",
        english: "no, I am from Mexico, I am a student here.",
      },
      { person: "personB", filipino: "👩🏽: Talaga?", english: "really?" },
      { person: "personA", filipino: "👨🏻: opo", english: "yes" },
      { person: "personB", filipino: "👩🏽: Ano'ng pangalan mo?", english: "what is your name?" },
      { person: "personA", filipino: "👨🏻: Ako po ay si Noe", english: "I am Noe" },
      { person: "personB", filipino: "👩🏽: Ako naman si Andrea", english: "I'm Andrea" },
      { person: "personA", filipino: "👨🏻: Kinagagalak ko kayong makilala", english: "I'm glad to meet you" },
      { person: "personB", filipino: "👩🏽: Ako rin", english: "I'm glad to meet you too" },
      { person: "personA", filipino: "👨🏻: Paalam na po", english: "Good-bye" },
      { person: "personB", filipino: "👩🏽: O sige, Magkita ulit tayo!", english: "All right, See you again" },
    ],
    _dictionary: {
      aba: dictionary.aba,
      marunong: dictionary.marunong,
      naman: dictionary.naman
    },
  },
};

const noHints = "no hints, this one is easy!";

const sentences = {
  questions_what: [
    {
      filipino: "Ano po ?",
      english: "What?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "Ano po ito ?",
      english: "What is this?",
      completeIndex: [0, 2],
      hint: noHints,
    },
    {
      filipino: "Ano po iyan ?",
      english: "What is that? (something near by)",
      completeIndex: [0, 2],
      hint: "Use iyan when something is near by",
    },
    {
      filipino: "Ano po iyon ?",
      english: "What is that? (something further away)",
      completeIndex: [0, 2],
      hint: "Use iyon when something is further away",
    },
    {
      filipino: "Ano ang nangyari?",
      english: "What happened?",
      completeIndex: [0],
      hint: noHints,
    },
  ],
  questions_who: [
    {
      filipino: "Sino po?",
      english: "Who?",
      completeIndex: [0],
      hint: noHints,
    },
    {
      filipino: "Sino po ito ?",
      english: "Who is this?",
      completeIndex: [0, 2],
      hint: "be polite",
    },
    {
      filipino: "Sino po iyan ?",
      english: "Who is that? (someone near by)",
      completeIndex: [0],
      hint: "Use iyan when someone is near by",
    },
    {
      filipino: "Sino po iyan ?",
      english: "Who is that? (someone further away)",
      completeIndex: [0],
      hint: "Use iyon when someone is further away",
    },
    {
      filipino: "Sino ang kasama mo ?",
      english: "Who was with you?",
      completeIndex: [0, 3],
      hint: "Use the possesive personal pronoun",
    },
  ],
  questions_when: [
    {
      filipino: "kailan po ?",
      english: "when?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "kailan po ito ?",
      english: "when is this?",
      completeIndex: [0, 2],
      hint: noHints,
    },
    {
      filipino: "kailan po iyan ?",
      english: "when is that? (near you)",
      completeIndex: [0, 2],
      hint: "<ul><li>'Iyan' refers to something near the person being spoken to, but not near the speaker.</li><li>English equivalent: 'When is that (near you)?'</li><li>Example: You're on the phone and the other person mentions an event. You ask: 'Kailan po iyan' (When is that [thing you're referring to]?)</li></ul>",
    },
    {
      filipino: "kailan po iyon ?",
      english: "when is that? (over there/far from both of us)",
      completeIndex: [0, 2],
      hint: "<ul><li>'Iyon' refers to something far from both the speaker and the person being spoken to.</li><li>English equivalent: 'When is that (over there/far from both of us)?'</li><li>You're talking about a festival in a distant town that neither of you are attending. 'Kailan po iyon?'</li></ul>",
    },
    {
      filipino: "Kailan ito nangyari?",
      english: "When did it happen?",
      completeIndex: [0, 1],
      hint: "Use the word for 'this'.",
    },
  ],
  questions_where: [
    {
      filipino: "saan po ?",
      english: "where?",
      completeIndex: [0, 2],
      hint: "be polite",
    },
    {
      filipino: "saan po ito ?",
      english: "where is this?",
      completeIndex: [0, 1, 2],
      hint: "be polite",
    },
    {
      filipino: "saan po iyan ?",
      english: "where is that? (near the person you're speaking to)",
      completeIndex: [0, 2],
      hint: "<ul><li>'Iyan' = that (near the person you're speaking to)</li><li>So this means: 'Where is that (thing near you)?'</li><li>Example: You're on a video call, and the other person shows you a restaurant. You ask: 'Saan po iyan?' (Where is that [near you]?)</li></ul>",
    },
    {
      filipino: "saan po iyon ?",
      english: "where is that? (far from both of you)",
      completeIndex: [0, 1, 2],
      hint: "<ul><li>'Iyon' = that (far from both of you)</li><li>So this means: 'Where is that (thing far from both of us)?'</li><li>Example: You're talking about a place neither of you are at, like a famous landmark. You ask: 'Saan po iyon?' (Where is that [far from both of us]?)</li></ul>",
    },
    {
      filipino: "Saan ito naganap?",
      english: "Where did it happen?",
      completeIndex: [0, 1],
      hint: "Use the word for 'this'.",
    },
    {
      filipino: "Saan mo ba gustong pumunta?",
      english: "Where you wanna go?",
      completeIndex: [0, 1],
      hint: "Use the possesive personal pronoun.",
    },
  ],
  questions_why: [
    {
      filipino: "Bakit po ?",
      english: "Why?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "Bakit po ito ?",
      english: "Why this?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "Bakit po iyan ?",
      english: "Why? (near the person you're talking to)",
      completeIndex: [0, 1],
      hint: "<ul> <li><strong>'Iyan'</strong> = that (near the person you're talking to)</li> <li>So this means: <strong>'Why is that (thing near you)?'</strong></li> <li>Example: You're asking someone about a document they're holding. You say: <strong>'Bakit po iyan?'</strong> (Why is that [thing near you] like that?)</li> </ul>",
    },
    {
      filipino: "Bakit po iyon ?",
      english: "Why? (far from both of you)",
      completeIndex: [0, 1],
      hint: "<ul> <li><strong>'Iyon'</strong> = that (far from both of you)</li> <li>So this means: <strong>'Why is that (thing far from both of us)?'</strong></li> <li>Example: You're talking about a strange event in another city you both saw on the news. You ask: <strong>'Bakit po iyon?'</strong> (Why is that [far-away thing] like that?)</li> </ul>",
    },
    {
      filipino: "Bakit hindi mo alam?",
      english: "Why don't you know?",
      completeIndex: [0, 2],
      hint: "Use the possesive personal pronoun",
    },
  ],
  questions_which: [
    {
      filipino: "alin po ?",
      english: "which?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "alin po ito ?",
      english: "which this?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "alin po iyan ?",
      english: "which? (near the person you're talking to)",
      completeIndex: [0, 1],
      hint: "<ul> <li><strong>'Iyan'</strong> = that (near the person you're talking to)</li> <li>So this means: <strong>'Which one is that (thing near you)?'</strong></li> <li>Example: You're choosing from several options the other person is pointing to. You ask: <strong>'Alin po iyan?'</strong> (Which one is that [near you]?)</li> </ul>",
    },
    {
      filipino: "alin po iyon ?",
      english: "which? (far from both of you)",
      completeIndex: [0, 1],
      hint: "<ul> <li><strong>'Iyon'</strong> = that (far from both of you)</li> <li>So this means: <strong>'Which one is that (thing far from both of us)?'</strong></li> <li>Example: You're both looking at a picture of something far away or not physically present. You ask: <strong>'Alin po iyon?'</strong> (Which one is that [far from both of us]?)</li> </ul>",
    },
    {
      filipino: "Alin sa mga ito ang totoo?",
      english: "Which of these is true?",
      completeIndex: [0, 2],
      hint: "Use the word to make plural.",
    },
    {
      filipino: "Alin ang paborito mo?",
      english: "Which is your favorite?",
      completeIndex: [0, 2],
      hint: "",
    },
  ],
  questions_whose: [
    {
      filipino: "kanino po ?",
      english: "to whom?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "kanino po ito ?",
      english: "to whom is this?",
      completeIndex: [0, 1],
      hint: "be polite",
    },
    {
      filipino: "kanino po iyan ?",
      english: "to whom is that? (near the person you're talking to)",
      completeIndex: [0, 1],
      hint: "<ul><li><strong>'Iyan'</strong> = that (near the person you're talking to)</li><li>So this means: <strong>'To whom is that (thing near you)?'</strong></li><li>Example: The other person is holding a book. You ask: <strong>'Kanino po iyan?'</strong> (To whom is that [near you]?)</li></ul>",
    },
    {
      filipino: "kanino po iyon ?",
      english: "to whom is that? (far from both of you)",
      completeIndex: [0, 1],
      hint: "<ul><li><strong>'Iyon'</strong> = that (far from both of you)</li><li>So this means: <strong>'To whom is that (thing far from both of us)?'</strong></li><li>Example: You're both looking at a bag across the room. You ask: <strong>'Kanino po iyon?'</strong> (To whom is that [far from both of us]?)</li></ul>",
    },
  ],
  questions_how: [
    {
      filipino: "Paano ito nagsimula?",
      english: "How did it start?",
      completeIndex: [0, 1],
      hint: "Use the word for 'this'.",
    },
    {
      filipino: "Paano po iyan ginagawa?",
      english: "How is that done? (near the person you're talking to)",
      completeIndex: [0, 2],
      hint: "<ul><li><strong>'Iyan'</strong> = that (near the person you're talking to)</li><li>So this means: <strong>'How is that done?'</strong></li><li>Example: You're asking how to do something the other person is currently doing.</li></ul>",
    },
    {
      filipino: "Paano po iyon nangyari?",
      english: "How did that happen? (far from both of you)",
      completeIndex: [0, 2],
      hint: "<ul><li><strong>'Iyon'</strong> = that (far from both of you)</li><li>So this means: <strong>'How did that happen?'</strong></li><li>Example: You're referring to a past event that neither of you were directly involved in.</li></ul>",
    },
    {
      filipino: "Paano po tayo makakarating doon?",
      english: "How do we get there? (inclusive 'we')",
      completeIndex: [0, 2],
      hint: "Use 'tayo' for 'we' (including the person you're talking to).",
    },
  ],

  common: [
    {
      filipino: "paalam",
      english: "goodbye",
      completeIndex: [-1],
      hint: noHints,
    },
    {
      filipino: "tsaa na may asukal",
      english: "tea with sugar",
      completeIndex: [1],
      hint: "The most common ligatures are: 'na'  used when the word ends in a consonant, 'ng' used when the word ends in a vowel. HOWEVER,  'ng' is used when you're linking a noun and an adjective directly BUT 'may asukal' is a full phrase ('has sugar) not a single word/adejctive, therefore 'na' is used used to connect the noun ('tsaa') with the whole descriptive phrase.",
    },
    {
      filipino: "Siya ay si Noe",
      english: "This is Noe / He is Noe",
      completeIndex: [0, 2],
      hint: "Use the pronoun for he/she. Remember that personal nouns use 'si'",
    },
    {
      filipino: "ang aking nanay ay mula sa Mexico",
      english: "my mom is from Mexico",
      completeIndex: [0, 3, 6],
      hint: "use the inverse structure with ay, do not use tildes",
    },
    {
      filipino: "ako ay mula sa Mexico",
      english: "I am from Mexico",
      completeIndex: [0, 1],
      hint: "You don't need 'ang' when the subject is a personal pronoun like siya (he/she), ako (I), or sila (they).",
    },
    {
      filipino: "aking babaeng kapatid",
      english: "my sister",
      completeIndex: [-1], // All words replaced with inputs when -1
      hint: "'aking' means 'my'. 'kapatid' means 'sibling'. 'My sister' is an incomplete sentence (there's not predicate) so you do not need to use 'ang'.",
    },
    {
      filipino: "aking lalaking kapatid",
      english: "my brother",
      completeIndex: [1],
      hint: "aking means my, lalaki means man. also remember that in Filipino, when you connect a modifier (like an adjective or descriptive word, e.g male + sibling) to the word it modifies, you often need a ligature to make the sentence flow better. The most common ligatures are: 'na'  used when the word ends in a consonant, 'ng' used when the word ends in a vowel",
    },
    {
      filipino: "aking lalaking kapatid at aking babaeng kapatid",
      english: "my brother and my sister",
      completeIndex: [0, 3, 4],
      hint: "at means and",
    },
    {
      filipino: "magkano ang halaga nito ?",
      english: "How much is this",
      completeIndex: [3],
      hint: "'ito' means 'this', used to point something directly (ito ang libro/this book). 'nito' shows ownership or relationship, this is called genitive (possessive), but in simple words  it shows that something belongs to or is related to something else ('price' belong to 'this').",
    },
  ],
};

const image_clicks = {
  body: [
    "braso", //arm
    "ulo", //head
    "kamay", //hand
    "binti", //leg
    "paa", //foot
    "mata", //eye
    "ilong", //nose
    "bibig", //mouth
    "tainga", //ear
  ],
};

window.routerNamespace = {
  currentPath: "#/",
  routes_obj: {
    "#/": {
      path: "partials/home.html",
      navbarName: "Home",
      icon: "bi-house-fill",
    },
    "#/vowels": {
      path: "partials/vowels.html",
      navbarName: "Vowels",
      icon: "bi-book",
    },
    "#/alphabet": {
      path: "partials/alphabet.html",
      navbarName: "Alphabet",
      icon: "bi-book",
    },
    "#/pronouns": {
      dropdown: {
        navbarName: "Pronouns",
        accordionName: "pronouns",
        links: [
          {
            key: "#/pronouns-overview",
            path: "partials/pronouns/overview.html",
            navbarName: "Overview",
            icon: "bi-book",
          },
          {
            key: "#/pronouns-group1",
            path: "partials/pronouns/pronounsgroup1.html",
            navbarName: "Pronouns Ang Group",
            icon: "bi-book",
          },
          {
            key: "#/pronouns-group2",
            path: "partials/pronouns/pronounsgroup2.html",
            navbarName: "Pronouns Ng Group",
            icon: "bi-book",
          },
          {
            key: "#/pronouns-group3",
            path: "partials/pronouns/pronounsgroup3.html",
            navbarName: "Pronouns Sa Group",
            icon: "bi-book",
          },
          { key: "#/pronouns-kita", path: "partials/pronouns/kita.html", navbarName: "Kita", icon: "bi-book" },
          {
            key: "#/pronouns-game-group1",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Game Ang Group | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.pronounsGroup1), gameTitle: "Game Group 1 | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/pronouns-game-pairs-group1",
            path: "partials/games/html/pairs.html",
            navbarName: "Game Ang Group | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.pronounsGroup1), gameTitle: "Game Group 1 | options" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/pronouns-game-group2",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Game Ng Group | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.pronounsGroup2), gameTitle: "Game Group 2 | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/pronouns-game-pairs-group2",
            path: "partials/games/html/pairs.html",
            navbarName: "Game Ng Group | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.pronounsGroup2), gameTitle: "Game Group 2 | options" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/pronouns-game-group3",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Game Sa Group | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.pronounsGroup3), gameTitle: "Game Group 3 | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/pronouns-game-pairs-group3",
            path: "partials/games/html/pairs.html",
            navbarName: "Game Sa Group | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.pronounsGroup3), gameTitle: "Game Group 3 | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
        ],
      },
      icon: "bi-collection",
    },
    "#/rootandaffixes": {
      dropdown: {
        navbarName: "Roots & Affixes",
        accordionName: "rootandaffixes",
        links: [
          {
            key: "#/rootandaffixes-overview",
            path: "partials/rootsandaffixes/overview.html",
            navbarName: "Overview",
            icon: "bi-book",
          },
          {
            key: "#/rootandaffixes-um-inffix-game",
            path: "partials/games/html/pairs.html",
            navbarName: "Game Um Inffix | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.uminffix), gameTitle: "Game | UM Infix" },
              nameSpace: "pairsNamespace",
            },
          },
        ],
      },
      icon: "bi-collection",
    },
    "#/markers": {
      path: "partials/markers.html",
      navbarName: "Markers",
      icon: "bi-book",
    },
    "#/verbs": {
      path: "partials/verbs.html",
      navbarName: "Verbs",
      icon: "bi-book",
    },
    "#/objectanfactorfocusverbs": {
      path: "partials/objectanfactorfocusverbs.html",
      navbarName: "Object/Actor Focus Verbs",
      icon: "bi-book",
    },
    "#/particles": {
      dropdown: {
        navbarName: "Particles",
        accordionName: "particles",
        links: [
          {
            key: "#/particles-overview",
            path: "partials/particles/overview.html",
            navbarName: "Overview",
            icon: "bi-book",
          },
          {
            key: "#/particles-ay",
            path: "partials/particles/ay.html",
            navbarName: "Ay",
            icon: "bi-book",
          },
          {
            key: "#/particles-ba",
            path: "partials/particles/ba.html",
            navbarName: "Ba",
            icon: "bi-book",
          },
        ],
      },
      icon: "bi-collection",
    },
    "#/sentencestructure": {
      dropdown: {
        navbarName: "Sentence Structure",
        accordionName: "sentencestructure",
        links: [
          {
            key: "#/sentencestructure-overview",
            path: "partials/sentencestructure.html",
            navbarName: "Overview",
            icon: "bi-book",
          },
          {
            key: "#/sentencestructure-game",
            path: "partials/games/html/completesentence.html",
            navbarName: "Complete the sentence",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.common, gameTitle: "Complete the sentence" },
              nameSpace: "completeSentenceNamespace",
            },
          },
        ],
      },
      icon: "bi-collection",
    },
    "#/greetings": {
      dropdown: {
        navbarName: "Greetings",
        accordionName: "greetings",
        links: [
          {
            key: "#/greetings-overview",
            path: "partials/greetings/overview.html",
            navbarName: "Overview",
            icon: "bi-book",
          },
          {
            key: "#/greetings-introduce-yourself",
            path: "partials/greetings/introduceyourself.html",
            navbarName: "Introduce Yourself",
            icon: "bi-book",
          },
          {
            key: "#/greetings-game",
            path: "partials/games/html/pairs.html",
            navbarName: "Greetings | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.greetings), gameTitle: "Greetings | Pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/greetings-game-time",
            path: "partials/games/html/pairs.html",
            navbarName: "Greetings Depending On Time | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: {
                gameData: structuredClone(games.greetingTime),
                gameTitle: "Greetings Depending On Time | Pairs",
              },
              nameSpace: "pairsNamespace",
            },
          },
        ],
      },
      icon: "bi-collection",
    },
    "#/miscellaneous": {
      dropdown: {
        navbarName: "Miscellaneous",
        accordionName: "miscellaneous",
        links: [
          {
            key: "#/misc-family",
            path: "partials/misc/family.html",
            navbarName: "Family",
            icon: "bi-book",
          },
          {
            key: "#/misc-rid-din",
            path: "partials/misc/rindin.html",
            navbarName: "How To Say 'Also'",
            icon: "bi-book",
          },
          {
            key: "#/misc-may-wala",
            path: "partials/misc/maywala.html",
            navbarName: "May/Wala",
            icon: "bi-book",
          },
        ],
      },
    },
    "#/numbers": {
      dropdown: {
        navbarName: "Numbers",
        accordionName: "numbers",
        links: [
          {
            key: "#/numbers-numbers",
            path: "partials/numbers.html",
            navbarName: "Overview",
            icon: "bi-book",
          },
          {
            key: "#/numbers-game-0to10-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Game 0 to 10 | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(words.seroToTen), gameTitle: "Game 0 to 10 | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/numbers-game-0to10-images",
            path: "partials/games/html/images.html",
            navbarName: "Game 0 to 10 | images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.seroToTen), gameTitle: "Game 0 to 10 | images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/numbers-game-11to19",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Game 11 to 19 | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.elevenToNineteen), gameTitle: "Game 11 to 19 | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/numbers-game-tens",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Game Tens | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.tens), gameTitle: "Game Tens | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/numbers-game-hundreds",
            path: "partials/games/html/pairs.html",
            navbarName: "Game Hundreds | Pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.hundres), gameTitle: "Game Hundreds | Pairs" },
              nameSpace: "pairsNamespace",
            },
          },
        ],
      },
      icon: "bi-collection",
    },

    "#/vocabulary": {
      dropdown: {
        navbarName: "Vocabulary Games",
        accordionName: "vocabulary",
        links: [
          {
            key: "#/vocabulary-game-dialogue-simple-chat",
            path: "partials/games/html/chat.html",
            navbarName: "Simple Chat | Dialogue",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/chat.js",
              config: { gameData: dialogues.simpleConversation, gameTitle: "Simple Chat | Dialogue" },
              nameSpace: "chatNamespace",
            },
          },
          {
            key: "#/vocabulary-game-activities-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Activities | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.activities), gameTitle: "Activities | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-activities-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Activities | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.activities), gameTitle: "Activities | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-activities-images",
            path: "partials/games/html/images.html",
            navbarName: "Activities | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.activities), gameTitle: "Activities | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-instruments-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Instruments | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.instruments), gameTitle: "Instruments | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-instruments-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Instruments | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.instruments), gameTitle: "Instruments | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-instruments-images",
            path: "partials/games/html/images.html",
            navbarName: "Instruments | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.instruments), gameTitle: "Instruments | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-body-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Body | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.body), gameTitle: "Body | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-body-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Body | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.body), gameTitle: "Body | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-body-images",
            path: "partials/games/html/images.html",
            navbarName: "Body | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.body), gameTitle: "Body | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-body-click",
            path: "partials/games/html/body.html",
            navbarName: "Body | Click",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/clickobject.js",
              config: { gameData: image_clicks.body, gameTitle: "Body | Click" },
              nameSpace: "clickobjectNamespace",
            },
          },
          {
            key: "#/vocabulary-game-animals-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Animals | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.animals), gameTitle: "Animals | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-animals-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Animals | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.animals), gameTitle: "Animals | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-animals-images",
            path: "partials/games/html/images.html",
            navbarName: "Animals | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.animals), gameTitle: "Animals | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-clothes-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Clothes | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.clothes), gameTitle: "Clothes | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-clothes-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Clothes | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.clothes), gameTitle: "Clothes | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-clothes-images",
            path: "partials/games/html/images.html",
            navbarName: "Clothes | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.clothes), gameTitle: "Clothes | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-food-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Food | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.food), gameTitle: "Food | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-food-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Food | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.food), gameTitle: "Food | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-food-images",
            path: "partials/games/html/images.html",
            navbarName: "Food | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.food), gameTitle: "Food | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-colors-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Colors | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.colors), gameTitle: "Colors | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-colors-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Colors | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.colors), gameTitle: "Colors | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-colors-images",
            path: "partials/games/html/images.html",
            navbarName: "Colors | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.colors), gameTitle: "Colors | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-colors-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Colors | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(words.colors), gameTitle: "Colors | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-places-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Places | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.places), gameTitle: "Places | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-places-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Places | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.places), gameTitle: "Places | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-places-images",
            path: "partials/games/html/images.html",
            navbarName: "Places | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.places), gameTitle: "Places | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-places-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Places | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(words.places), gameTitle: "Places | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-flavors-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Flavors | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(words.flavors), gameTitle: "Flavors | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-flavors-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Flavors | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(words.flavors), gameTitle: "Flavors | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-flavors-images",
            path: "partials/games/html/images.html",
            navbarName: "Flavors | Images",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/images.js",
              config: { gameData: structuredClone(words.flavors), gameTitle: "Flavors | Images" },
              nameSpace: "imagesNamespace",
            },
          },
          {
            key: "#/vocabulary-game-flavors-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Flavors | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(words.flavors), gameTitle: "Flavors | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-dow-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Days Of The Week | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(games.daysOfTheWeek), gameTitle: "Days Of The Week | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-dow-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Days Of The Week | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.daysOfTheWeek), gameTitle: "Days Of The Week | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-moty-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Months Of The Year | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(games.monthsOfTheYear), gameTitle: "Months Of The Year | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-moty-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Months Of The Year | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.monthsOfTheYear), gameTitle: "Months Of The Year | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-answers",
            path: "partials/games/html/answers.html",
            navbarName: "Questions | answers",
            icon: "bi-book-fill",
            game: {
              script: "partials/games/js/answers.js",
              config: { gameData: structuredClone(games.questions), gameTitle: "Questions | answers" },
              nameSpace: "wordsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-options",
            path: "partials/games/html/questionoptions.html",
            navbarName: "Questions | options",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/questionoptions.js",
              config: { gameData: structuredClone(games.questions), gameTitle: "Questions | options" },
              nameSpace: "questionOptionsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-pairs",
            path: "partials/games/html/pairs.html",
            navbarName: "Questions | pairs",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/pairs.js",
              config: { gameData: structuredClone(games.questions), gameTitle: "Questions | pairs" },
              nameSpace: "pairsNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-how",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-How | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_how, gameTitle: "Questions-How | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-what",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-What | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_what, gameTitle: "Questions-What | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-when",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-When | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_when, gameTitle: "Questions-When | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-where",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-where | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_where, gameTitle: "Questions-Where | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-which",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-Which | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_which, gameTitle: "Questions-Which | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-who",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-Who | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_who, gameTitle: "Questions-who | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-whose",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-Whose | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_whose, gameTitle: "Questions-Whose | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-complete-why",
            path: "partials/games/html/completesentence.html",
            navbarName: "Questions-Why | Complete",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/completesentence.js",
              config: { gameData: sentences.questions_why, gameTitle: "Questions-Why | Complete" },
              nameSpace: "completeSentenceNamespace",
            },
          },
          {
            key: "#/vocabulary-game-questions-dialogue",
            path: "partials/games/html/chat.html",
            navbarName: "Questions | Dialogue",
            icon: "bi-controller",
            game: {
              script: "partials/games/js/chat.js",
              config: { gameData: dialogues.questions, gameTitle: "What | Dialogue" },
              nameSpace: "chatNamespace",
            },
          },
        ],
      },
      icon: "bi-collection",
    },
    "#/songs": {
      dropdown: {
        navbarName: "Songs",
        accordionName: "songs",
        links: [
          {
            key: "#/songs-pasilyo",
            path: "partials/songs/pasilyo.html",
            navbarName: "Pasilyo",
            icon: "bi-file-earmark-music",
          },
          {
            key: "#/songs-filipinas",
            path: "partials/songs/filipinas.html",
            navbarName: "Filipinas",
            icon: "bi-file-earmark-music",
          },
        ],
      },
      icon: "bi-file-earmark-music",
    },
    "#/about": {
      path: "partials/about.html",
      navbarName: "About",
      icon: "bi-info-circle",
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
    return location.hash || "#/";
  },
  createPronounsNavItem: function (obj) {
    const createElement = (tag, attrs = {}, children = []) => {
      const el = document.createElement(tag);
      for (const [key, value] of Object.entries(attrs)) {
        if (key === "class") el.className = value;
        else if (key === "style") el.style.cssText = value;
        else if (key === "key") el.href = value;
        else el.setAttribute(key, value);
        if (el.tagName === "A") {
          el.dataset.bsDismiss = "offcanvas";
          el.setAttribute("data-link", "");
        }
      }
      children.forEach((child) => {
        if (typeof child === "string") {
          el.appendChild(document.createTextNode(child));
        } else {
          el.appendChild(child);
        }
      });
      return el;
    };

    const listItems = obj.dropdown.links;

    const ulList = createElement(
      "ul",
      { class: "list-unstyled" },
      listItems.map((item) =>
        createElement("li", { class: "nav-item" }, [
          createElement(
            "a",
            {
              class: "nav-link text-truncate hover-text-primary",
              href: item.key,
              onclick: item.onclick,
              "data-bs-dismiss": "offcanvas",
            },
            [
              createElement("i", { class: `fs-5 ${item.icon}` }),
              createElement("span", { class: "ms-1 d-inline text-wrap" }, [item.navbarName]),
            ],
          ),
        ]),
      ),
    );

    const li = createElement("li", { class: "nav-item container-fluid w- p-0" }, [
      createElement("div", { class: "accordion p-0 m-0", id: `${obj.dropdown.accordionName}Accordion` }, [
        createElement("div", { class: "accordion-item border-0" }, [
          createElement("h2", { class: "accordion-header" }, [
            createElement(
              "button",
              {
                class: "accordion-button collapsed nav-link text-truncate p-3",
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": `#collapse${obj.dropdown.accordionName}`,
                "aria-expanded": "false",
                "aria-controls": `collapse${obj.dropdown.accordionName}`,
              },
              [
                createElement(
                  "span",
                  {
                    style: "text-decoration: none",
                    class: "hover-text-primary text-primary",
                  },
                  [
                    createElement("i", { class: "fs-5 bi-collection" }),
                    createElement("span", { class: "ms-1 d-sm-inline" }, [obj.dropdown.navbarName]),
                  ],
                ),
              ],
            ),
          ]),
          createElement(
            "div",
            {
              id: `collapse${obj.dropdown.accordionName}`,
              class: "accordion-collapse collapse",
              "data-bs-parent": `#${obj.dropdown.accordionName}Accordion`,
            },
            [createElement("div", { class: "accordion-body" }, [ulList])],
          ),
        ]),
      ]),
    ]);

    return li;
  },
  createSimpleNavItem: function (routeObj, route) {
    const li = document.createElement("li");
    li.classList.add("nav-item", "d-block");
    li.style.display = "block";
    li.style.width = "100%";
    const a = document.createElement("a");
    a.classList.add("nav-link", "text-truncate", "hover-text-primary");
    a.href = route;
    a.dataset.bsDismiss = "offcanvas";
    const i = document.createElement("i");
    i.classList.add("fs-5", routeObj.icon);
    const span = document.createElement("span");
    span.classList.add("ms-1", "d-inline", "text-wrap");
    span.innerHTML = routeObj.navbarName;

    li.appendChild(a);
    a.appendChild(i);
    a.appendChild(span);

    a.setAttribute("data-link", "");
    return li;
  },
  generate_sidebar: function () {
    Object.keys(routerNamespace.routes_obj).forEach((route) => {
      const navbar = document.getElementById("sidebarUl");
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
      document.querySelectorAll(".nav-link,a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === path || a.textContent === path);
      });
    }
    const path = routerNamespace.getHashRoute();
    const route = routerNamespace.get_flat_routes()[path].path || routerNamespace.get_flat_routes()["#/"].path;
    swap = htmx.ajax("GET", route, { target: "#mainSection", swap: "innerHTML" });
    highlightActiveLink(path);
    routerNamespace.currentPath = path;
    swap.then(
      (value) => {
        console.log(`Swap completed for ${route}`);
        if (routerNamespace.get_flat_routes()[path].game) {
          console.log("loading game script");
          loadScriptNamespace.load(
            routerNamespace.get_flat_routes()[path].game.script,
            routerNamespace.get_flat_routes()[path].game.nameSpace,
            routerNamespace.get_flat_routes()[path].game.config,
          );
        }
      },
      (error) => {
        console.log("Oops! something happend during the swap");
        console.log(error);
      },
    );

    // I want to run the next code only when the get above is donde
  },
  setRouter: function () {
    routerNamespace.generate_sidebar();

    // Detectar clics en enlaces (incluyendo dropdowns)
    document.body.addEventListener("click", (e) => {
      const link = e.target.closest("a[data-link], .dropdown-btn");
      if (link) {
        e.preventDefault();
        location.hash = link.getAttribute("href") || `#${link.textContent.toLowerCase().replace(/\s+/g, "-")}`;
      }
    });
    // Detectar cambios en el hash (atrás/adelante, navegación)
    window.addEventListener("hashchange", window.routerNamespace.navigate);
    // Load initial view
    window.routerNamespace.navigate();
  },
};

routerNamespace.setRouter();
