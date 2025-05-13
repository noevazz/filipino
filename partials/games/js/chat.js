window.chatNamespace = {
    vars: {
        position: null,
        dialogue: null
    },

    getCurrentTime: function () {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
      
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
      
        return `${hours}:${minutesFormatted} ${ampm}`;
    },

    increaseProgressBar: function (yourArrayLength, currentPosition) {
        const progressBar = document.getElementById("progressBar");
        const percentage = ((currentPosition) / (yourArrayLength)) * 100;
        progressBar.innerHTML = Math.ceil(percentage).toString() + "%";
        progressBar.style.width = Math.ceil(percentage).toString() + "%";
    },
    addDictionary: function (_dictionary) {
        const dictionary = document.getElementById("dictionary");
        const ul = document.createElement("lu");
        Object.entries(_dictionary).forEach(entry => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="fw-bold">${entry[0]}</span>: ${entry[1]}`
            ul.appendChild(li);
        });
        dictionary.appendChild(ul);
    },

    handleOptions: function (config) {
        document.getElementById("gameTitle").innerHTML = config.gameTitle;
        chatNamespace.vars.dialogue = config.gameData.dialogue;
        chatNamespace.vars.position = 0;
        chatNamespace.addDictionary(config.gameData._dictionary);

        const chatContainer = document.getElementById("chat");
        const nextBtn = document.getElementById("nextBtn");

        nextBtn.addEventListener("click", () => {
            if (chatNamespace.vars.position < chatNamespace.vars.dialogue.length) {
                const { person, filipino, english } = chatNamespace.vars.dialogue[chatNamespace.vars.position];

                const messageDiv = document.createElement("div");
                messageDiv.className = `message d-flex flex-column ${person}`;

                messageDiv.innerHTML = `
                    <div class="card p-3 notorious-shadow">
                    <small class="translation-muted fst-italic">✓ ${chatNamespace.getCurrentTime()}</small>
                    <p class="mb-1"><strong>${filipino}</strong></p>
                    <small class="translation-muted">${english}</small>
                    </div>
                `;

                chatContainer.appendChild(messageDiv);
                chatNamespace.vars.position++;
                if (chatNamespace.vars.position == chatNamespace.vars.dialogue.length)
                    confetti({ particleCount: 300 });
                chatNamespace.increaseProgressBar(chatNamespace.vars.dialogue.length, chatNamespace.vars.position);

                chatContainer.scrollTop = chatContainer.scrollHeight;

                if (chatNamespace.vars.position === chatNamespace.vars.dialogue.length) {
                    nextBtn.disabled = true;
                    nextBtn.textContent = "End of the conversation.";
                }
            }
        });
        nextBtn.click();
    },
};
