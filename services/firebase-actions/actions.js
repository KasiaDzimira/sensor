const firebase = require('firebase');
const firebaseConfig = require('../../config/firebase.config');

firebase.initializeApp(firebaseConfig);

class FirebaseActions {
    pushData(data, sensorId) {
        const itemsRef = firebase.database().ref().child('sensors');

        itemsRef.child(sensorId).child(Date.now()).set({ value: data });
    }
}

module.exports = new FirebaseActions();