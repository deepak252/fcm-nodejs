const Express = require("express")
const firebase = require("./firebase_init")
const Meeting = require("./models/meeting")
const FirestoreService = require("./services/firestore_service")
const NotificationService = require("./services/notification_service")
const WpMeetingService = require("./services/wp_meeting_service")

const app = Express();
require('dotenv').config();

var port = process.env.PORT || 3000;
var wp_meetings = [];
var firestore_meetings = [];

setInterval(async () => {
    console.log("Starting app2...");

    wp_meetings = await WpMeetingService.fetchMeetings();
    firestore_meetings = await FirestoreService.fetchMeetings();
    // console.log('wp_meetings: ' + wp_meetings);
    // console.log("firestore_meetings: " + firestore_meetings);
    // console.log("Done1");

    for (var i = 0; i < firestore_meetings.length; i++) {
        for (var j = 0; j < wp_meetings.length; j++) {
            if (firestore_meetings[i] == wp_meetings[j]) {          // Firestore_Meeting already exist in WP_Meetings
                // console.log("Meeting exists: " + firestore_meetings[i]);
                break;
            } else if (j == wp_meetings.length - 1) {        // Delete Firestore_Meeting from database
                // console.log("Meeting not exists: " + firestore_meetings[i]);
                await FirestoreService.deleteMeeting({ topic: firestore_meetings[i] }) //add new meeting to database
            }
        }
    }
    // console.log("Done2");

    for (var i = 0; i < wp_meetings.length; i++) {
        for (var j = 0; j < firestore_meetings.length; j++) {
            if (wp_meetings[i] == firestore_meetings[j]) {          // Meeting already exist in database
                // console.log("WP_Meeting: " + wp_meeting);
                // console.log("Meeting exists: " + wp_meetings[i]);
                break;
            } else if (j == firestore_meetings.length - 1) {        // New meeting found , add new meeting to database
                // console.log("Meeting not exists: " + wp_meetings[i]);
                await FirestoreService.addMeeting({ topic: wp_meetings[i] }) //add new meeting to database
                await NotificationService.sendNotification({ title: wp_meetings[i], body: "New meeting" }); // Send notificaton for new meeting
            }
        }
    }
    // console.log("Done3");

}, 120000);


app.get("/", (req, res) => {
    // sendNotification();
    res.send("<h1>Firestore, Nodejs, FCM</h1>");
});


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})

