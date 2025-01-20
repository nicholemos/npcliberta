let playerCount = 0;  // Contador de jogadores

// Função para criar um novo jogador
function createPlayer(playerName) {
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player');
    playerContainer.id = `player${playerCount}`;

    const playerTitle = document.createElement('h2');
    playerTitle.innerText = playerName;

    // Lista de NPCs desse jogador
    const npcList = document.createElement('div');
    npcList.classList.add('npc-list');
    playerContainer.appendChild(playerTitle);
    playerContainer.appendChild(npcList);

    // Botões para adicionar NPCs
    const addNpcButton = document.createElement('button');
    addNpcButton.innerText = 'Adicionar NPC';
    addNpcButton.addEventListener('click', () => createNpc(playerContainer, npcList));

    playerContainer.appendChild(addNpcButton);

    document.getElementById('player-list').appendChild(playerContainer);

    playerCount++;
}

// Função para criar um NPC para o jogador
function createNpc(playerContainer, npcList) {
    const npcContainer = document.createElement('div');
    npcContainer.classList.add('npc');
    
    // Campo para o nome do NPC
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Nome do NPC';

    // Criando os corações
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('hearts');
    const hearts = [];
    for (let i = 0; i < 7; i++) {
        const heart = document.createElement('span');
        heart.classList.add('heart');
        heart.innerText = '❤️';
        hearts.push(heart);
        heartsContainer.appendChild(heart);
    }

    // Botões para controlar os corações
    const controls = document.createElement('div');
    controls.classList.add('controls');
    
    const minusButton = document.createElement('button');
    minusButton.innerText = '-';
    const plusButton = document.createElement('button');
    plusButton.innerText = '+';

    controls.appendChild(minusButton);
    controls.appendChild(plusButton);

    let currentHearts = 0;  // Contagem de corações do NPC

    // Atualiza a visibilidade dos corações
    // Atualiza a visibilidade dos corações
function updateHearts() {
    hearts.forEach((heart, index) => {
        if (index < currentHearts) {
            heart.classList.add('active');  // Adiciona a classe 'active' para corações preenchidos
        } else {
            heart.classList.remove('active');  // Remove a classe 'active' para corações vazios
        }
    });
}

  // Lógica para os botões de controle de corações
    minusButton.addEventListener('click', () => {
        if (currentHearts > 0) {
            currentHearts--;
        }
        updateHearts();
    });

    plusButton.addEventListener('click', () => {
        if (currentHearts < hearts.length) {
            currentHearts++;
        }
        updateHearts();
    });

    updateHearts();

    // Botão para remover o NPC
    const removeNpcButton = document.createElement('button');
    removeNpcButton.innerText = 'Remover NPC';
    removeNpcButton.addEventListener('click', () => removeNpc(npcContainer));

    // Adiciona os elementos ao NPC
    npcContainer.appendChild(nameInput);
    npcContainer.appendChild(heartsContainer);
    npcContainer.appendChild(controls);
    npcContainer.appendChild(removeNpcButton);  // Adiciona o botão de remover NPC

    npcList.appendChild(npcContainer);
}

// Função para remover o NPC
function removeNpc(npcContainer) {
    npcContainer.remove();
}

// Função para remover o jogador
function removePlayer(playerContainer) {
    playerCount--;
    document.getElementById('player-list').removeChild(playerContainer);
}

// Lógica para adicionar um novo jogador
document.getElementById('addPlayer').addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value;
    if (playerName) {
        createPlayer(playerName);
        document.getElementById('playerName').value = ''; // Limpa o campo de nome
    }
});

// Lógica para remover o jogador
document.getElementById('removePlayer').addEventListener('click', () => {
    const playerList = document.getElementById('player-list');
    if (playerList.children.length > 0) {
        const lastPlayer = playerList.lastElementChild;
        removePlayer(lastPlayer);
    }
});
