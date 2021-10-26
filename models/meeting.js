class Meeting {
    constructor({ topic, time }) {
        this.topic = topic;
        this.time = time;
        console.log("Constructor created");
    }

    static fromJson(json) {
        console.log("Meeting fromJson");
        return new Meeting({
            topic: json.topic,
            time: json.time
        });
    }

    toJson() {
        console.log("Meeting toJson");
        return {
            'topic': this.topic,
            'time': this.time
        }
    }

}

module.exports = Meeting