/* style.css */
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f0f8ff;
    flex-direction: column;
}

.container {
    text-align: center;
    width: 100%;
}

h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 20px;
}

.player-form {
    margin-bottom: 20px;
}

.player-form input {
    font-size: 1.2rem;
    padding: 5px;
    margin-right: 10px;
    text-align: center;
    width: 200px;
    border: 1px solid #ff6347;
    border-radius: 5px;
}

.player-form button {
    font-size: 1.2rem;
    padding: 5px 15px;
    cursor: pointer;
    border: none;
    background-color: #ff6347;
    color: white;
    border-radius: 5px;
}

.player-form button:hover {
    background-color: #ff4500;
}

/* Player List Styling */
#player-list {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap; /* Permite que as caixas se movam para a próxima linha */
    justify-content: center; /* Centraliza as caixas */
    gap: 20px; /* Espaçamento entre os jogadores */
}

.player {
    margin: 15px;
    padding: 20px;
    border: 2px solid #ff6347;
    border-radius: 10px;
    width: 250px;
    background-color: #fff5e6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombrinha para dar mais destaque */
    text-align: center;
    transition: transform 0.2s ease;
}

.player:hover {
    transform: scale(1.05); /* Aumenta um pouco a caixa quando o mouse passa em cima */
}

.npc-list {
    margin-top: 15px;
}

.npc {
    margin: 10px;
    padding: 15px;
    border: 2px solid #ff6347;
    border-radius: 10px;
    width: 220px;
    background-color: #fff5e6;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombrinha para destacar o NPC */
}

.npc input {
    font-size: 1.2rem;
    padding: 5px;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
    border: 1px solid #ff6347;
    border-radius: 5px;
}

/* Mudanças na aparência dos corações */
.hearts {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.heart {
    opacity: 0.2; /* Corações vazios são mais transparentes */
    color: #808080; /* Cor cinza para os corações vazios */
    transition: opacity 0.3s ease-in-out, color 0.3s ease-in-out; /* Transições suaves */
}

.heart.active {
    opacity: 1; /* Corações preenchidos têm opacidade total */
    color: #ff6347; /* Cor vermelha para os corações preenchidos */
}

.controls button {
    font-size: 1.5rem;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    border: none;
    background-color: #ff6347;
    color: white;
    border-radius: 5px;
}

.controls button:hover {
    background-color: #ff4500;
}

/* Estilos do botão Remover Jogador (agora abaixo do nome) */
.player button {
    margin-top: 10px;
}

.controls button,
.player-form button {
    margin-top: 10px;
}

/* Estilos para os botões de Adicionar e Remover NPC */
.npc button {
    font-size: 1.2rem;
    padding: 8px 16px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid #ff6347; /* Borda sutil para combinar com o esquema de cores */
    background-color: #fff;  /* Fundo branco para um visual mais clean */
    color: #ff6347;  /* Cor do texto para combinar com o esquema */
    border-radius: 5px;  /* Bordas arredondadas */
    transition: background-color 0.3s ease;  /* Transição suave para mudança de cor */
}

.npc button:hover {
    background-color: #ff6347;  /* Fundo vermelho quando o mouse passar */
    color: white;  /* Texto branco quando o mouse passar */
}

.npc button:active {
    background-color: #ff4500;  /* Fundo mais intenso ao pressionar */
}
