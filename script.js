// Função para capitalizar a primeira letra do nome
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Função para adicionar um novo Player
function addPlayer() {
    const PlayerName = prompt("Digite o nome do novo Player:");
    if (PlayerName) {
        const playersDiv = document.getElementById("players");  // Corrigido para playersDiv

        // Cria o novo bloco para o Player
        const newPlayerDiv = document.createElement("div");
        newPlayerDiv.classList.add("person");
        newPlayerDiv.id = PlayerName.toLowerCase();

        newPlayerDiv.innerHTML = `
            <h2 id="Player-name-${PlayerName.toLowerCase()}">${PlayerName}</h2>
            <button onclick="editPlayerName('${PlayerName.toLowerCase()}')">Editar Nome</button>
            <button onclick="removePlayer('${PlayerName.toLowerCase()}')">Remover Player</button>
            <div class="NPCs">
                <!-- NPCs serão adicionadas aqui -->
            </div>
            <button onclick="addNPC('${PlayerName.toLowerCase()}')">Adicionar NPC</button>
        `;

        playersDiv.appendChild(newPlayerDiv);  // Corrigido para playersDiv

        // Criação do elemento de resultado para o novo Player
        const resultDiv = document.querySelector(".result");
        const resultParagraph = document.createElement("p");
        resultParagraph.id = `result-${PlayerName.toLowerCase()}`;
        resultParagraph.textContent = `${capitalize(PlayerName)}: Sem NPCs atribuídas.`;
        resultDiv.appendChild(resultParagraph);
    }
}

// Função para editar o nome do Player
function editPlayerName(PlayerId) {
    const PlayerNameElement = document.getElementById(`Player-name-${PlayerId}`);
    const newName = prompt("Digite o novo nome do Player:", PlayerNameElement.textContent);
    if (newName) {
        PlayerNameElement.textContent = newName;
        PlayerNameElement.id = `Player-name-${newName.toLowerCase()}`;
        const resultElement = document.getElementById(`result-${PlayerId}`);
        resultElement.id = `result-${newName.toLowerCase()}`;
    }
}

// Função para adicionar uma nova NPC
function addNPC(person) {
    console.log("PlayerId (person):", person); // Verifica o valor de person

    const newNPC = prompt("Digite o nome da nova NPC:", "Nova NPC");
    if (!newNPC) {
        alert("O nome da NPC não pode ser vazio!");
        return;
    }

    console.log("Nome da nova NPC:", newNPC);  // Verifica o nome da nova NPC

    const NPCId = `${person}-${newNPC.toLowerCase()}`;
    console.log("ID da NPC:", NPCId);  // Verifica se o ID da NPC está correto

    const PlayerDiv = document.getElementById(person);
    if (!PlayerDiv) {
        console.error(`Elemento de Player com ID ${person} não encontrado!`);
        return;
    }

    const newDiv = document.createElement("div");
    newDiv.classList.add("NPC");
    newDiv.id = NPCId;

    const title = document.createElement("h3");
    title.textContent = newNPC;
    newDiv.appendChild(title);

    const controlsDiv = document.createElement("div");
    controlsDiv.classList.add("controls");

    // Botão de decremento
    const decrementBtn = document.createElement("span");
    decrementBtn.classList.add("control-btn");
    decrementBtn.textContent = "-";
    decrementBtn.onclick = function () {
        decrementProgress(NPCId);
    };
    controlsDiv.appendChild(decrementBtn);

    // Criação da área de progresso (corações)
    const progressDiv = document.createElement("div");
    progressDiv.classList.add("progress");

    // Criação de 7 corações dinâmicos
    for (let i = 1; i <= 7; i++) {
        const heart = document.createElement("span");
        heart.classList.add("heart", "far", "fa-heart");  // Coração vazio
        heart.id = `${NPCId}-${i}`;
        progressDiv.appendChild(heart);
    }
    controlsDiv.appendChild(progressDiv);

    // Botão de incremento
    const incrementBtn = document.createElement("span");
    incrementBtn.classList.add("control-btn");
    incrementBtn.textContent = "+";
    incrementBtn.onclick = function () {
        incrementProgress(NPCId);
    };
    controlsDiv.appendChild(incrementBtn);

    // Botão de remoção da NPC
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn", "btn-danger", "remove-btn");
    removeBtn.textContent = "Remover NPC";
    removeBtn.onclick = function () {
        removeNPC(NPCId);
    };
    controlsDiv.appendChild(removeBtn);

    // Botão para editar o nome da NPC
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-warning", "edit-btn");
    editBtn.textContent = "Editar Nome da NPC";
    editBtn.onclick = function () {
        editNPCName(NPCId);
    };
    controlsDiv.appendChild(editBtn);

    newDiv.appendChild(controlsDiv);

    // Criação do resultado para a nova NPC
    const resultDiv = document.querySelector(".result");
    const resultParagraph = document.createElement("p");
    resultParagraph.id = `result-${NPCId}`;
    resultParagraph.textContent = `${capitalize(person)}: ${capitalize(newNPC)}: 0 pontos`;

    // Adiciona a nova NPC à lista de NPCs
    PlayerDiv.querySelector(".NPCs").appendChild(newDiv);

    // Adiciona o resultado da nova NPC
    resultDiv.appendChild(resultParagraph);

    // Verificar se a mensagem "Sem NPCs atribuídas" existe e removê-la
    const resultParagraphPlayer = document.getElementById(`result-${person}`);
    if (resultParagraphPlayer && resultParagraphPlayer.textContent.includes("Sem NPCs atribuídas")) {
        resultParagraphPlayer.remove();  // Remove a mensagem "Sem NPCs atribuídas"
    }
}

// Função para editar o nome da NPC
function editNPCName(NPCId) {
    console.log("NPCId:", NPCId);  // Verifica o ID da NPC para depuração

    const NPCTitle = document.querySelector(`#${NPCId} h3`);
    if (!NPCTitle) {
        console.error(`Não foi possível encontrar o título da NPC com ID ${NPCId}`);
        return;  // Impede que o código continue se não encontrar o elemento
    }

    const newNPCName = prompt("Digite o novo nome da NPC:", NPCTitle.textContent);
    if (newNPCName) {
        NPCTitle.textContent = newNPCName;
        const resultElement = document.getElementById(`result-${NPCId}`);
        resultElement.textContent = `${capitalize(NPCId.split('-')[0])}: ${capitalize(newNPCName)}: 0 pontos`;
    }
}

// Função para remover um Player
function removePlayer(PlayerId) {
    const PlayerDiv = document.getElementById(PlayerId);
    if (PlayerDiv) {
        PlayerDiv.remove(); // Remove o bloco do Player
    }

    // Também remove os resultados do progresso do Player
    const resultDiv = document.querySelector(".result");
    const resultParagraph = document.getElementById(`result-${PlayerId}`);
    if (resultParagraph) {
        resultDiv.removeChild(resultParagraph); // Remove o resultado do progresso
    }
}

// Função para remover uma NPC
function removeNPC(NPCId) {
    const NPCDiv = document.getElementById(NPCId);
    if (NPCDiv) {
        NPCDiv.remove(); // Remove o bloco da NPC
    }

    // Também remove os resultados do progresso da NPC
    const resultDiv = document.querySelector(".result");
    const resultParagraph = document.getElementById(`result-${NPCId}`);
    if (resultParagraph) {
        resultDiv.removeChild(resultParagraph); // Remove o resultado da NPC
    }
}

// Função para incrementar o progresso de uma NPC
function incrementProgress(NPC) {
    let progress = document.querySelectorAll(`#${NPC} .heart`);
    let resultElement = document.getElementById(`result-${NPC}`);

    if (!progress || !resultElement) {
        console.error(`Elemento não encontrado para a NPC: ${NPC}`);
        return;
    }

    let points = 0;

    // Verificando quantos corações preenchidos já existem e atualizando
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].classList.contains('far')) {
            progress[i].classList.remove('far'); // Coração vazio
            progress[i].classList.add('fas');   // Coração preenchido
            break;
        }
    }

    // Contando quantos corações preenchidos a pessoa tem
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].classList.contains('fas')) {
            points++;
        }
    }

    // Atualizando o resultado
    resultElement.textContent = `${capitalize(NPC.split('-')[0])}: ${capitalize(NPC.split('-')[1])}: ${points} pontos`;
}

// Função para decrementar o progresso de uma NPC
function decrementProgress(NPC) {
    let progress = document.querySelectorAll(`#${NPC} .heart`);
    let resultElement = document.getElementById(`result-${NPC}`);

    if (!progress || !resultElement) {
        console.error(`Elemento não encontrado para a NPC: ${NPC}`);
        return;
    }

    let points = 0;

    // Verificando quantos corações preenchidos existem e alterando o primeiro para vazio
    for (let i = progress.length - 1; i >= 0; i--) {
        if (progress[i].classList.contains('fas')) {
            progress[i].classList.remove('fas');  // Coração preenchido
            progress[i].classList.add('far');    // Coração vazio
            break;
        }
    }

    // Contando quantos corações preenchidos a pessoa tem
    for (let i = 0; i < progress.length; i++) {
        if (progress[i].classList.contains('fas')) {
            points++;
        }
    }

    // Atualizando o resultado
    resultElement.textContent = `${capitalize(NPC.split('-')[0])}: ${capitalize(NPC.split('-')[1])}: ${points} pontos`;
}
