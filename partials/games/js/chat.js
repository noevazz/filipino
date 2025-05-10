window.chatNamespace = {
    vars: {
        position: null,
        dialogue: null
    },

    increaseProgressBar: function (yourArrayLength, currentPosition) {
        const progressBar = document.getElementById("progressBar");
        const percentage = ((currentPosition) / (yourArrayLength)) * 100;
        progressBar.innerHTML = Math.ceil(percentage).toString() + "%";
        progressBar.style.width = Math.ceil(percentage).toString() + "%";
    },

    handleOptions: function (config) {
        document.getElementById("gameTitle").innerHTML = config.gameTitle;
        chatNamespace.vars.dialogue = config.gameData;
        chatNamespace.vars.position = 0;

        const chatContainer = document.getElementById("chat");
        const nextBtn = document.getElementById("nextBtn");

        nextBtn.addEventListener("click", () => {
            if (chatNamespace.vars.position < chatNamespace.vars.dialogue.length) {
                const { person, filipino, english } = chatNamespace.vars.dialogue[chatNamespace.vars.position];

                const messageDiv = document.createElement("div");
                messageDiv.className = `message d-flex flex-column ${person}`;

                messageDiv.innerHTML = `
                    <div class="card p-3">
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
