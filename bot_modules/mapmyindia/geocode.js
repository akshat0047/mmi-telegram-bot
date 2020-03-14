const dis = require(process.cwd() + '/bot_modules/mapmyindia/distance')
const axios = require('axios')
const fs = require('fs')

var token;
var keys={
    "0":"addone",
    "1":"addtwo"
}


function readauth(){
let rawdata = fs.readFile(process.cwd() + '/update.json', (err,data)=>{
  data = JSON.parse(data)
  if((Date.now() - data['token']['tis']) < (data['token']['expiry'] - 10000))
     {
       oauth.Tok(); 
       readauth();
     }
  token = data['token']['value']
})
}

const Geocode = (req, res, message, add)=>{
    readauth();
    console.log("inside geocode")
    let configure = {
        headers:{
          'Authorization':"bearer " + "70ff1a97-e74e-4f43-aa93-0094f9675f0a"       
         }
     }

      function geocoding(i){
        if(i<2){
          var ent = keys[i.toString()]
        if(add[ent]['type'] == 'txt'){
            axios
            .get('https://atlas.mapmyindia.com/api/places/geocode?address=' + add[ent]['value'], configure)
            .then(response=>{
                add[ent]['value'] = response.data.copResults.longitude + "," + response.data.copResults.latitude
                add[ent]['type']  = 'cords'
                geocoding(++i);
            })
            .catch(err =>{
                console.log('Error :', err)
                res.end('Error :' + err)
            })
        }
        else{
           geocoding(++i);
        }
    }
    else{
        console.log("Calculating Distance" + JSON.stringify(add))
        dis.Distance(req, res, message, add);
    }
}

    geocoding(0);
}

exports.Geocode = Geocode;