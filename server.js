const sensor = require('ds18x20');
const FirebaseActions = require('./services/firebase-actions/actions');

function readData() {
    var listOfDeviceIds = sensor.list();

    if (listOfDeviceIds.length === 0) {
        console.log('No sensor found!');
    } else {
        for (var i = 0, len = listOfDeviceIds.length; i < len; i++) {
            FirebaseActions.pushData(sensor.get(listOfDeviceIds[i]), listOfDeviceIds[i]);
        }
    }
}

setInterval(readData, 60000);
