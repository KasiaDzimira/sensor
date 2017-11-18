const firebase = require('firebase');
const firebaseConfig = require('../../config/firebase.config');

firebase.initializeApp(firebaseConfig);

class FirebaseActions {
    pushData(item) {
        const itemsRef = firebase.database().ref('sensors');

        itemsRef.push(item);
    }
}

module.exports = new FirebaseActions();