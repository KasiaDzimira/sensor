const sensor = require('ds18x20');
const FirebaseActions = require('./services/firebase-actions/actions');

let sended = [];
let isFinding = false;

function sendMessage(sensorId, alertType) {
    FirebaseActions.sendSms(alertType, sensorId);

    // for (var send in sended) {
    //     if (sended[send].sensorId === sensorId && sended[send].alertType === alertType) {
    //         sended.remove(send, 1);
    //     }
    // }
}

function readData() {
    var listOfDeviceIds = sensor.list();

    if (listOfDeviceIds.length === 0) {
        console.log('No sensor found!');
    } else {
        for (let i = 0, len = listOfDeviceIds.length; i < len; i++) {
            let deviceId = listOfDeviceIds[i];
            let temperature = sensor.get(deviceId);

            if (temperature > 24 && temperature < 35) {

                let sensorId = deviceId;
                let alertType = 'WARNING';

                // for (var send in sended) {
                //     if (sended[send].sensorId === sensorId && sended[send].alertType === alertType) {
                //         isFinding = true;
                //     }
                // }

                // if (!isFinding) {
                //     sended.push({sensorId: sensorId, alertType: alertType});
                //     setInterval(
                // );
                // isFinding = true;
                sendMessage(sensorId, alertType);
            }

            if (temperature >= 35) {

                let sensorId = deviceId;
                let alertType = 'DANGER';

                sendMessage(sensorId, alertType);
            }

            FirebaseActions.pushData(sensor.get(deviceId), deviceId);
        }
    }
}

setInterval(readData, 60000);
