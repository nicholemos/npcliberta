document.addEventListener('DOMContentLoaded', () => {
  let playerCount = 0;
  const playerList = document.getElementById('player-list');

  // Cria um novo jogador
  function createPlayer(playerName) {
    const playerContainer = document.createElement('div');
    playerContainer.classList.add('player');
    playerContainer.id = `player${playerCount}`;

    const playerTitle = document.createElement('h2');
    playerTitle.innerText = playerName;
    playerContainer.appendChild(playerTitle);

    const npcList = document.createElement('div');
    npcList.classList.add('npc-list');
    playerContainer.appendChild(npcList);

    const addNpcButton = document.createElement('button');
    addNpcButton.innerText = 'Adicionar NPC';
    addNpcButton.addEventListener('click', () => createNpc(npcList));
    playerContainer.appendChild(addNpcButton);

    playerList.appendChild(playerContainer);
    playerCount++;
  }

  // Cria um NPC para um jogador
function createNpc(npcList) {
  const npcContainer = document.createElement('div');
  npcContainer.classList.add('npc');

  // Campo para nome do NPC
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Nome do NPC';
  npcContainer.appendChild(nameInput);

  // Container para os corações
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
  npcContainer.appendChild(heartsContainer);

  // Controles de afinidade (+ e -)
  const controlDiv = document.createElement('div');
  controlDiv.classList.add('controls');

  const minusButton = document.createElement('button');
  minusButton.innerText = '-';
  const plusButton = document.createElement('button');
  plusButton.innerText = '+';

  controlDiv.appendChild(minusButton);
  controlDiv.appendChild(plusButton);
  npcContainer.appendChild(controlDiv);

  let currentHearts = 0;
  const updateHearts = () => {
    hearts.forEach((heart, index) => {
      if (index < currentHearts) {
        heart.classList.add('active');
      } else {
        heart.classList.remove('active');
      }
    });
  };

  minusButton.addEventListener('click', () => {
    if (currentHearts > 0) currentHearts--;
    updateHearts();
  });
  plusButton.addEventListener('click', () => {
    if (currentHearts < hearts.length) currentHearts++;
    updateHearts();
  });
  updateHearts();

  // Botão para remover o NPC
  const removeNpcButton = document.createElement('button');
  removeNpcButton.innerText = 'Remover NPC';
  removeNpcButton.classList.add('remove-npc');
  removeNpcButton.addEventListener('click', () => npcContainer.remove());
  npcContainer.appendChild(removeNpcButton);

  // Botão para adicionar/trocar a imagem via URL
  const imageButton = document.createElement('button');
  imageButton.innerText = 'Adicionar Imagem';
  imageButton.classList.add('add-image-btn');
  npcContainer.appendChild(imageButton);

  imageButton.addEventListener('click', () => {
    const imageUrl = prompt("Digite a URL da imagem:");
    if (imageUrl) {
      npcContainer.style.backgroundImage = `url(${imageUrl})`;
      npcContainer.style.backgroundSize = 'cover';
      npcContainer.style.backgroundPosition = 'center';
    }
  });

  npcList.appendChild(npcContainer);
}

// Remove o último jogador adicionado
function removePlayer() {
    if (playerList.children.length > 0) {
      playerList.removeChild(playerList.lastElementChild);
      playerCount--;
    }
  }

  // Salva os dados dos jogadores e NPCs em um arquivo .txt
// Salva os dados dos jogadores e NPCs em um arquivo .txt
function saveData() {
  const data = [];
  document.querySelectorAll('.player').forEach(player => {
    const playerName = player.querySelector('h2').innerText;
    const npcs = [];
    player.querySelectorAll('.npc').forEach(npc => {
      const npcName = npc.querySelector('input').value;
      const npcHearts = npc.querySelectorAll('.heart.active').length;
      
      // Captura a URL da imagem, se houver
      let imageUrl = npc.style.backgroundImage;
      if (imageUrl && imageUrl !== 'none') {
        // Remove 'url("' e '")'
        imageUrl = imageUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      } else {
        imageUrl = '';
      }
      
      npcs.push({ name: npcName, hearts: npcHearts, image: imageUrl });
    });
    data.push({ player: playerName, npcs });
  });
  const textData = JSON.stringify(data, null, 2);
  const blob = new Blob([textData], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'progresso_npcs.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Carrega os dados a partir de um arquivo .txt e atualiza a tela
function loadData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      playerList.innerHTML = '';
      playerCount = 0;
      data.forEach(entry => {
        createPlayer(entry.player);
        const lastPlayer = playerList.lastElementChild;
        const npcList = lastPlayer.querySelector('.npc-list');
        entry.npcs.forEach(npc => {
          createNpc(npcList);
          const lastNpc = npcList.lastElementChild;
          lastNpc.querySelector('input').value = npc.name;
          const hearts = lastNpc.querySelectorAll('.heart');
          for (let i = 0; i < npc.hearts; i++) {
            hearts[i].classList.add('active');
          }
          // Se houver um link de imagem, aplica-o como background
          if (npc.image) {
            lastNpc.style.backgroundImage = `url(${npc.image})`;
            lastNpc.style.backgroundSize = 'cover';
            lastNpc.style.backgroundPosition = 'center';
          }
        });
      });
    } catch (error) {
      alert('Erro ao carregar o arquivo. Verifique se ele está no formato correto.');
    }
    // Permite carregar o mesmo arquivo novamente
    event.target.value = '';
  };
  reader.readAsText(file);
}

  // Eventos dos botões
  document.getElementById('addPlayer').addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value.trim();
    if (playerName) {
      createPlayer(playerName);
      document.getElementById('playerName').value = '';
    }
  });

  document.getElementById('removePlayer').addEventListener('click', removePlayer);
  document.getElementById('saveData').addEventListener('click', saveData);
  document.getElementById('loadData').addEventListener('change', loadData);
});
