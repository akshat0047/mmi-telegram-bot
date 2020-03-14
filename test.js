
const fs = require('fs');
/*let rawdata = fs.readFile('update.json', (err,data)=>{
    var up_id = JSON.parse(rawdata)['u_id'];
    console.log(up_id)
});*/

var update;
function readtoken(callback){

var token = "3453213455434"
            let rawdata = fs.readFile('update.json', (err, data) => {
                update = JSON.parse(data);
                update['token']=token;
                update = JSON.stringify(update);
                callback();
            });
}
function writetoken(){
             let writex = fs.writeFile('update.json', update, (err) => {
                if (err) throw err;
            });
}

readtoken(writetoken)
