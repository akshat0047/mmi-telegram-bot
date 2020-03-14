const axios = require('axios');
const sm = require(process.cwd() + '/bot_modules/sendmessage')

const Distance = (req, res, message, add)=>{
    let url = "https://apis.mapmyindia.com/advancedmaps/v1/tmggjol5ggnctsoz44mvzbtljuc3b4oh/distance_matrix/driving/" +
               add['addone']['value'] + ";" + add['addtwo']['value']
               
    axios
    .get(url)
    .then(response=>{
        console.log(response.data.results.distances);
        let reply = "Distance= " + (response.data.results.distances[0][1]/1000).toFixed(2) + " km \nDuration= " +
                                    secthm(response.data.results.durations[0][1])
        sm.Sm(req, res, message, reply)
        res.end("ok")
    })
    .catch(err=>{
        console.log('Error :', err)
        res.end('Error :' + err)
    })
}

function secthm(sec){
    var measuredTime = new Date(null);
    measuredTime.setSeconds(sec); // specify value of SECONDS
    var MHSTime = measuredTime.toISOString().substr(11, 8);
    let arr = MHSTime.split(":")
    return arr[0] + " hours " + arr[1] + " min " + arr[2] + " sec"
}

exports.Distance = Distance