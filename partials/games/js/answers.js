window.wordsNamespace = {
  handleOptions: function (config) {
    document.getElementById("gameTitle").innerHTML = config.gameTitle;
    const answers = document.getElementById('answers');
    answers.classList.add('d-flex', 'flex-wrap', 'justify-content-center'); // Add this somewhere before the loop

  
    config.gameData.forEach((item) => {
      const div = document.createElement('div');
      const spanFilipino = document.createElement('span');
      const spanEnglish = document.createElement('span');
    
      div.className = 'm-2 p-4 card shadow text-center d-flex flex-column align-items-center';
      div.style.width = '200px';
      if (item.imgURL !== undefined) {
        div.style.height = '200px';
      } else {
        div.style.height = '100px';
      }
      div.style.justifyContent = 'space-between';
    
      spanFilipino.className = "badge rounded-pill bg-primary";
      spanEnglish.className = "badge rounded-pill bg-success";
      spanFilipino.innerHTML = item.filipino;
      spanEnglish.innerHTML = item.english;
    
      if (item.imgURL !== undefined) {
        const img = document.createElement('img');
        img.src = item.imgURL;
        img.className = "mx-auto d-block";
        img.style.width = "50%";
        div.appendChild(img);
      }
    
      div.appendChild(spanFilipino);
      div.appendChild(spanEnglish);
      answers.appendChild(div);
    });
    
  },
};
