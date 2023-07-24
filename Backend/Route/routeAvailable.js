require('dotenv').config();
const axios = require('axios');

// Définition des routes
const routes = [
  '/stamp',
  '/stamp/search/RPN',
  '/stamp/latest/3',
  '/stamp/period/8980256/9288325',
  '/stamp/date/072023',
  '/certificate',
  '/certificate/search/ball',
  '/certificate/latest/2',
  '/certificate/period/9288824/9316266',
  '/certificate/date/072023',
  '/block/timestamp/9288325'
];

async function checkRoute(route) {
  try {
    // const response = await axios.get(`http://localhost:8000/${route}`);
    const response = await axios.get(`${process.env.URL}${route}`);
    console.log(`La route ${route} est accessible. Réponse du serveur :`, response.data);
  } catch (error) {
    console.error(`Erreur lors de l'accès à la route ${route}:`, error.message);
  }
}

async function testBackend() {
  try {
    // const response = await axios.get('http://localhost:8000/');
    const response = await axios.get(`${process.env.URL}`);
    console.log('Le serveur est fonctionnel. Réponse du serveur :', response.data);

    for (const route of routes) {
      await checkRoute(route);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du serveur:', error.message);
  }
}

testBackend();