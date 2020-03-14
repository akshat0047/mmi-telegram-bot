var express = require('express')
var app = express()
const axios = require('axios')
const fs = require('fs');
const bm = require('./bot_modules/bot_manager')
var bodyParser = require('body-parser')


app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

var jsondata, up_id;

app.post('/talk', function(req, res) {
    let rawdata = fs.readFile(process.cwd() + '/update.json', (err,data)=>{
    //console.log(data)
    jsondata = JSON.parse(data);
    up_id = jsondata['u_id']
    console.log(up_id)
  });
  
  //console.log(req.body.update_id)
  if(req.body.update_id <= up_id)
  {
    console.log("neglecting update")
    return res.end()
  }
  else if(up_id == 0)
  {
    up_id = req.body.update_id
    save_uid()
    return bm.BotManager(req,res)
  }
  else if(req.body.update_id>up_id){
    up_id = req.body.update_id
    save_uid()
    return bm.BotManager(req,res)
  }
 })

function save_uid(){
  jsondata['u_id'] = up_id;
  fs.writeFile('update.json', JSON.stringify(jsondata), err=>{
    if (err) throw err;
  });
}

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})