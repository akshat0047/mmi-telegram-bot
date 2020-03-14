const axios = require('axios')
const fs = require('fs')
const sm = require(process.cwd() + '/bot_modules/sendmessage')
const oauth = require(process.cwd() + "/bot_modules/oauth2")

var token;

function readauth(){
let rawdata = fs.readFile(process.cwd() + '/update.json', (err,data)=>{
  //console.log(process.cwd() + '/update.json')
  //console.log(JSON.parse(data))
  data = JSON.parse(data)
  console.log(Date.now())
  if((Date.now() - data['token']['tis']) < (data['token']['expiry'] - 10000))
     {
       oauth.Tok(); 
       readauth();
     }
  token = data['token']['value']
})
}


const Nearby = (req, res, message, keywords)=>{
  readauth()
  var requestBody = {
     keywords: keywords,
     refLocation: message.location.latitude + ',' + message.location.longitude
  }
 //console.log("Inside nearby: " + keywords.join("$"))
 //console.log(keywords[0])
  let configure = {
     headers:{
       'Authorization':"bearer " + "70ff1a97-e74e-4f43-aa93-0094f9675f0a"        
      }
  }
  
  //console.log('https://atlas.mapmyindia.com/api/places/nearby/json?keywords=' + requestBody.keywords.join("$") + '&refLocation=' + requestBody.refLocation);

  axios
  .get('https://atlas.mapmyindia.com/api/places/nearby/json?keywords=' + 
        requestBody.keywords + '&refLocation=' + requestBody.refLocation + 
        '&sort=dist:asc', configure)
  .then( response => {
      let places = response.data.suggestedLocations;
      //console.log(places[0])
      //console.log(response)
      //console.log(places)
      var reply = ""
      for (i in places){
        reply = reply +  "Name: " + places[i].placeName + "\nPhone: " + places[i].landlineNo + 
        "\nMobile: " + places[i].mobileNo + "\nDistance: " + (places[i].distance/1000).toFixed(2) +
        " km\nAddress: " + places[i].placeAddress + "\n------------\n"
      }
      //console.log(reply)

      sm.Sm(req, res, message, reply)
     })
     .catch(err => {
       // ...and here if it was not
       console.log('Error :', err)
       return res.end('Error :' + err)
     })
     
    res.end()
}

exports.Nearby = Nearby
