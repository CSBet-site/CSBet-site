const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCEn61MWWDCEe02m8zc0_InP7RVlHq1PbE",
  authDomain: "csbet-00001.firebaseapp.com",
  projectId: "csbet-00001",
  storageBucket: "csbet-00001.appspot.com",
  messagingSenderId: "379404731204",
  appId: "1:379404731204:web:94eb3e29df6c0a6c214d11",
  databaseURL: "https://csbet-00001-default-rtdb.firebaseio.com/" // Adicione a URL do seu banco de dados aqui
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const writeData = async () => {
  try {
    await set(ref(database, 'teste/mensagem'), {
      mensagem: 'Consegui Caraiii'
    });
    console.log('Dados gravados com sucesso!');
  } catch (error) {
    console.error('Erro ao gravar dados:', error);
  }
};

const readData = async () => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'teste/mensagem'));
    if (snapshot.exists()) {
      console.log('Dados lidos:', snapshot.val());
    } else {
      console.log('Nenhum dado encontrado.');
    }
  } catch (error) {
    console.error('Erro ao ler dados:', error);
  }
};

writeData();
readData();
