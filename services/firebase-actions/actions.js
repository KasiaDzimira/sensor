const firebase = require('firebase');
const firebaseConfig = require('../../config/firebase.config');

firebase.initializeApp(firebaseConfig);

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'katarzyna.dzimira95@gmail.com',
        pass: 'wyszatyce75'
    }
});

const SMSAPI = require('smsapi');
const smsapi = new SMSAPI();

function sendMessage(message, phone) {
    return smsapi.message
        .sms()
        .from('Info')
        .to(phone)
        .message(message)
        .execute();
}

function displayResult(result){
    console.log(result);
}

function displayError(err){
    console.error(err);
}

class FirebaseActions {
    pushData(data, sensorId) {
        const itemsRef = firebase.database().ref().child('sensors');

        console.log(sensorId, Date.now().toString(), data);
        var promise = itemsRef.child(sensorId).child(Date.now().toString()).set({ value: data });

        promise.catch(e => {
            console.log(e.message)
        });
    }

    sendSms(alertType, sensorId) {
        firebase.database().ref('alerts').on('value', data => {
            var alerts = data.val();

            Object.keys(alerts).map(key => {
                if (alerts[key].type === alertType) {
                    firebase.database().ref('users').on('value', data => {
                        let users = data.val();
                        let content = alerts[key].content;

                        Object.keys(users).map(key => {
                            var sensors = users[key].sensors;

                            for (var sensor in sensors) {
                                if (sensor === sensorId) {
                                    var mailOptions = {
                                        from: 'katarzyna.dzimira95@gmail.com',
                                        to: users[key].email,
                                        subject: 'Temperature monitoring system: ' + alertType,
                                        text: alertType + ' for sensor: ' + sensorId + ' Place: ' + sensors[sensor].place + '. Message:' + content
                                    };

                                    smsapi.authentication
                                        .login('katarzyna.dzimira95@gmail.com', 'Wyszatyce.75')
                                        .then(sendMessage(alertType + ' for sensor: ' + sensorId + ' Place: ' + sensors[sensor].place + ' Message:' + content, users[key].phone))
                                        .then(displayResult)
                                        .catch(displayError);

                                    transporter.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error)
                                        } else {
                                            console.log(info)
                                        }
                                    });
                                }
                            }
                        })
                    });
                }
            })
        })
    }
}

module.exports = new FirebaseActions();