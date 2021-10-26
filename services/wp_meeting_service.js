const axios = require("axios");
const cheerio = require("cheerio");

class WpMeetingService{
    static fetchMeetings() {
        console.log("WpMeetingService fetchingMeetings...");
        return new Promise((resolve,reject)=>{
            axios({
                url: "https://treecampus.dgtlmart.com/wp-json/wp/v2/posts/16545",
                method: "get",
                headers: {
                    'Authorization': 'Basic ' + new Buffer.from("bobby:Bobby_7864").toString('base64')
                }
            }).then(response => {
                // console.log(response.data);
                const $ = cheerio.load(response.data.content.rendered);
                // console.log($('p').text().split(" "));
                resolve($('p').text().split(" "));
            }).catch((err) => {
                console.log('fetchMeetings error: ' + err.code)
            });
        });
        
    }

}


module.exports = WpMeetingService



// try {
        //     const response = await axios({
        //         url: "https://treecampus.dgtlmart.com/wp-json/wp/v2/posts/16545",
        //         method: "get",
        //         headers: {
        //             'Authorization': 'Basic ' + new Buffer.from("bobby:Bobby_7864").toString('base64')
        //         }
        //     });
        //     console.log(response.data);
        // } catch (e) {
        //     console.log(e.code);
        // }

        // const $ = cheerio.load(response.data.content.rendered);
        // console.log($('p').text().split(" "));