const firebase = require('firebase-admin');
require("dotenv").config();

firebase.initializeApp({
    credential: firebase.credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT_KEY))
});

module.exports = firebase;

