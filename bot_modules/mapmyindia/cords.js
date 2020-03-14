const axios = require('axios')
const {restkey} = require(process.cwd() + '/bot_modules/config')
const sm = require(process.cwd() + '/bot_modules/sendmessage')

function Mapit(req, res, message){
    axios
    .get("http://apis.mapmyindia.com/advancedmaps/v1/tmggjol5ggnctsoz44mvzbtljuc3b4oh/rev_geocode?" +
     "lat=" + message.location.latitude + "&lng=" + message.location.longitude)
    .then(response=>{
      response = response.data.results[0]
      let reply = "Latitude: " + response.lat + "\nLongitude: " + response.lng + 
      "\nAddress: " + response.formatted_address;

      sm.Sm(req, res, message, reply)
    })
    .catch(err=>{
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
}

exports.Mapit = Mapit;

