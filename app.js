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
}, 1800000);

app.get("/",(req,res)=>{
    
    // sendNotification();
    res.send("Thanks for using app");
});

var port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is up and running on port: ${port}`);
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
