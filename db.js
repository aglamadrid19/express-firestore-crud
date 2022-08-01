const initializeApp = require("firebase/app").initializeApp;
const getFirestore = require("firebase/firestore").getFirestore;
const config = require('./config')

const firebaseApp = initializeApp(config.firebaseconfig);

const db = getFirestore(firebaseApp);

module.exports = db;
