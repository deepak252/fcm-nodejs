const FCM = require("fcm-node");
require('dotenv').config();
const fcm = new FCM(`${process.env.SERVER_KEY}`);


class NotificationService{
    static sendNotification({title, body}) {
        console.log("Sending Notification...");

        const notificationMessage = {
            "notification": {
                "title": title,
                "body": body
            },
            "to": "/topics/meetings"
        };
        return new Promise((resolve,reject)=>{
            fcm.send(notificationMessage, (error, response) => {
                if (error) {
                    console.log('sendNotification error: ' + error);
                    reject('sendNotification error: ' + error);
                } else {
                    console.log("Notificatoin sent successfully");
                    resolve("Notificatoin sent successfully");
                }
            })
        });
    }
}

module.exports = NotificationService;