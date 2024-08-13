// server.js
const express = require('express');
const firebase = require('firebase/app');
require('firebase/database');

const app = express();
const port = 3000;

// Configuração do Firebase
const firebaseConfig = {
  // Sua configuração do Firebase
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

app.use(express.json());

// Rota para obter dados
app.get('/dados', (req, res) => {
  database.ref('teste').once('value').then((snapshot) => {
    res.json(snapshot.val());
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

// Rota para adicionar dados
app.post('/dados', (req, res) => {
  const dados = req.body;
  database.ref('teste').set(dados).then(() => {
    res.json({ message: 'Dados gravados com sucesso!' });
  }).catch((error) => {
    res.status(500).json({ error: error.message });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
