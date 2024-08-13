// Importar e configurar o Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js';

// Sua configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCEn61MWWDCEe02m8zc0_InP7RVlHq1PbE",
    authDomain: "csbet-00001.firebaseapp.com",
    projectId: "csbet-00001",
    storageBucket: "csbet-00001.appspot.com",
    messagingSenderId: "379404731204",
    appId: "1:379404731204:web:94eb3e29df6c0a6c214d11",
    databaseURL: "https://csbet-00001-default-rtdb.firebaseio.com/"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para gerar botões numerados
document.getElementById('gerarNumeros').addEventListener('click', function() {
    const numerosContainer = document.getElementById('numerosContainer');
    
    if (numerosContainer.style.display === 'none' || numerosContainer.style.display === '') {
        // Gera os botões se ainda não foram gerados
        if (numerosContainer.children.length === 0) {
            for (let i = 0; i <= 100; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.addEventListener('click', function() {
                    button.classList.toggle('selected');
                });
                numerosContainer.appendChild(button);
            }
        }
        numerosContainer.style.display = 'flex'; // Mostra os botões
    } else {
        numerosContainer.style.display = 'none'; // Esconde os botões
    }
});

// Impede quebras de linha no textarea
document.getElementById('nomeCliente').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// Função para salvar dados no Firebase
document.getElementById('salvar').addEventListener('click', function() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const selectedButtons = document.querySelectorAll('#numerosContainer button.selected');
    
    if (nomeCliente) {
        let numerosSelecionados = [];
        selectedButtons.forEach(button => {
            numerosSelecionados.push(button.textContent);
        });

        // Construa a mensagem com o nome e os números selecionados
        let mensagem = `Cliente: ${nomeCliente}    N° selecionados: ${numerosSelecionados.join(', ')}\nSalvo com Sucesso!`;
        alert(mensagem);

        // Enviar dados para o Firebase
        const newRecordRef = ref(database, 'clientes/' + Date.now()); // Usa um timestamp como ID único
        set(newRecordRef, {
            nome: nomeCliente,
            numeros: numerosSelecionados
        }).then(() => {
            console.log('Dados gravados com sucesso!');
        }).catch((error) => {
            console.error('Erro ao gravar dados: ', error);
        });
    } else {
        alert('Por favor, insira o nome do cliente.');
    }
});
