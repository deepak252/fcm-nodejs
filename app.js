const FCM = require("fcm-node");
const express = require("express")
require('dotenv').config();
const app = express();
const fcm = new FCM(`${process.env.SERVER_KEY}`);

const message = {
    "notification": {
        "title": "Test Notification",
        "body": "Body of notification"
    },
    "to": "/topics/meetings"
};

setInterval(() => {
    console.log("Sending Notification...");
    sendNotification();  
}, 10000);

app.get("/",(req,res)=>{
    
    // sendNotification();
    res.send("Thanks for using app");
});

app.listen(8000,()=>{
    console.log("Server is up and running on port: 8000");
})


function sendNotification(){
    fcm.send(message, (error, response) => {
        if (error) {
            console.log('sendNotification error: '+error);
        } else {
            console.log("Notificatoin sent successfully");
        }
    });
}
