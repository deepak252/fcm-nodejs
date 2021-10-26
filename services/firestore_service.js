const firebase = require("../firebase_init");

const db = firebase.firestore();
const Meeting = db.collection("Meetings");

class FirestoreService{
    static async  fetchMeetings() {
        console.log("FirestoreService fetchingMeetings...");
        const snapshot = await Meeting.get();
        const ids = snapshot.docs.map((doc) => doc.id);
        // const dataList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const dataList = snapshot.docs.map((doc) => doc.data().topic);
        // console.log(dataList);
        return dataList;
        // console.log(ids);
    }

    static async addMeeting({topic}) {
        const meeting = {
            "topic": topic,
            // "time": "1:30"
        };
        await Meeting.add(meeting)
            .then(result => {
                console.log("Meeting added" + result);
            })
            .catch(error => {
                console.log("addMeeting error: " + error);
            });
    }
    
    static async deleteMeeting({topic}) {
        var meeting_query = Meeting.where("topic","==",topic)
        await meeting_query.get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                doc.ref.delete();
                console.log("Meeting deleted");
            });
        })
        .catch(error => {
            console.log("deleteMeeting error: " + error);
        });
    }

    
}

// async function crud() {
//     // await FirestoreService.addMeeting({topic: "Meet5"});
//     console.log(await FirestoreService.fetchMeetings());
    
//     // await FirestoreService.deleteMeeting({topic: "Meet5"});
//     console.log("Done");
// }
// crud();

module.exports = FirestoreService