const sensor = require('ds18x20');
const FirebaseActions = require('./services/firebase-actions/actions');
const TemperatureSensorDataTransformer = require('./services/sensor-data/temperature-sensor-data-transformer');

function readData() {
    sensor.getAll(function (err, tempObj) {
        console.log(tempObj);
    });
}

setInterval(readData, 1000);
