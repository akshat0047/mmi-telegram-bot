const axios = require('axios')
const qs = require('querystring')
const fs = require('fs')
const {clientid, clientsec, oauth} = require('./config')

var update;
var token = {};

const requestBody = {
    grant_type: 'client_credentials',
    client_id: "####",
    client_secret: "####"
}

const configure = {
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    }
}
const Tok = ()=>{
    axios
    .post("https://outpost.mapmyindia.com/api/security/oauth/token ",qs.stringify(requestBody),configure)
    .then(response =>{
          if (response.status == 200)
          {
            token['value'] = response.data.access_token
            token['expiry'] = response.data.expires_in
            readtoken(writetoken);
}
    })
    .catch(err=>{
        console.log('Error :', err)
    })
}

function readtoken(callback){

                let rawdata = fs.readFile(process.cwd() + '/../update.json', (err, data) => {
                    update = JSON.parse(data);
                    update['token']['value']=token['value'];
                    update['token']['expiry']=token['expiry'] * 1000
                    update['token']['tis']=Date.now()
                    update = JSON.stringify(update);
                    callback();
                });
    }

    function writetoken(){
                 let writex = fs.writeFile(process.cwd() + '/../update.json', update, (err) => {
                    if (err) throw err;
                });
            }

exports.Tok = Tok