let names = [];
let currentIndex = 0;
let winnerName = '';
let initialSpeed = 1; // Velocidade inicial em milissegundos
let minSpeed = 1; // Velocidade mínima em milissegundos
let decelerationRate = 1.095; // Taxa de desaceleração (aumenta a velocidade mínima)
let currentSpeed = initialSpeed;
let stopIndex = 0;
let intervalId;
let drawDuration = 9000; // Duração total do sorteio em milissegundos (9 segundos)

// Função para adicionar a classe ao botão de adicionar nomes
function addClassToAddNameButton() {
    const addNameBtn = document.getElementById('add-name-btn');
    addNameBtn.classList.add('class-for-add-name');
}

// Função para adicionar a classe ao botão de sortear
function addClassToSortearButton() {
    const sortearBtn = document.getElementById('sortear-btn');
    sortearBtn.classList.add('class-for-sortear');
}

// Atualize a função addNames para incluir a adição da classe ao botão
function addNames() {
    const nameInput = document.getElementById('name-input');
    const nameDisplay = document.getElementById('name-display');
    const nameArray = nameInput.value.split('\n').filter(name => name.trim() !== '');

    if (nameArray.length > 0) {
        names = [...names, ...nameArray];
        nameDisplay.innerHTML = ''; // Limpa a lista atual

        names.forEach((name) => {
            const nameItem = document.createElement('div');
            nameItem.className = 'name-item';
            nameItem.textContent = name;
            nameDisplay.appendChild(nameItem);
        });

        // Exibir a lista de nomes
        nameDisplay.style.display = 'grid'; // Ou 'block' se preferir
        
        nameInput.value = '';

        // Adiciona a classe ao botão de adicionar nomes
        addClassToAddNameButton();
    }
}

// Função para atualizar a exibição dos novos nomes
function updateNewDisplay() {
    const newDisplay = document.getElementById('new-name-display');
    newDisplay.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const nameIndex = (currentIndex + i) % names.length;
        const newNameItem = document.createElement('div');
        newNameItem.className = 'new-name-item';
        newNameItem.textContent = names[nameIndex];

        if (i === 4) { // Item do meio na nova lista
            newNameItem.classList.add('active');
        }

        newDisplay.appendChild(newNameItem);
    }
}

// Função para embaralhar o array de nomes
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para atualizar os nomes exibidos
function updateNames() {
    const nameItems = document.querySelectorAll('.name-item');
    const visibleItems = Array.from(nameItems).filter(item => item.style.display === 'block');

    visibleItems.forEach((item, index) => {
        const nameIndex = (currentIndex + index) % names.length;
        item.textContent = names[nameIndex];

        if (index === Math.floor(visibleItems.length / 2)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    currentIndex = (currentIndex + 1) % names.length;
}

// Atualize a função startDraw para incluir a adição da classe ao botão de sortear
function startDraw() {
    if (names.length < 9) {
        alert('Adicione pelo menos 9 nomes antes de sortear!');
        return;
    }

    // Adiciona a classe ao botão de sortear
    addClassToSortearButton();

    // Reproduzir o áudio
    const audio = document.getElementById('notification-audio');
    audio.play();

    // Oculta o container original e exibe o novo container
    document.getElementById('original-container').style.display = 'none';
    document.getElementById('new-container').style.display = 'block';

    shuffleArray(names);

    const nameItems = document.querySelectorAll('.name-item');
    currentIndex = 0;
    currentSpeed = initialSpeed; // Reinicia a velocidade para o valor inicial

    // Atualiza a visibilidade dos itens
    if (names.length > 9) {
        nameItems.forEach((item, index) => {
            item.style.display = index >= names.length - 9 ? 'block' : 'none';
        });
    } else {
        nameItems.forEach(item => {
            item.style.display = 'block';
        });
    }

    stopIndex = Math.floor(Math.random() * names.length);

    // Função para atualizar o sorteio
    function update() {
        updateNames();
        updateNewDisplay();

        // Diminui a velocidade
        currentSpeed = Math.max(minSpeed, currentSpeed * decelerationRate);

        // Atualiza o intervalo de tempo
        intervalId = setTimeout(update, currentSpeed);
    }

    // Limpa qualquer intervalo anterior antes de iniciar um novo
    if (intervalId) {
        clearTimeout(intervalId);
    }

    // Inicia o sorteio
    update();

    // Para o sorteio após a duração total
    setTimeout(() => {
        clearTimeout(intervalId);
        winnerName = document.querySelector('.new-name-item.active').textContent;
        showModal();
    }, drawDuration);
}

// Função para exibir o modal com o nome do ganhador
function showModal() {
    const modal = document.getElementById('winner-modal');
    const winnerText = document.getElementById('winner-text');
    winnerText.textContent = `O ganhador é: ${winnerName}`;
    modal.style.display = 'block';
    
    // Dispara o efeito de confete
    confetti({
        particleCount: 400,
        spread: 1000,
        origin: { y: 0.37 }
    });
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('winner-modal');
    modal.style.display = 'none';
}

// Função para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('winner-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}


// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('winner-modal');
    modal.style.display = 'none';
}

// Função para fechar o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('winner-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
