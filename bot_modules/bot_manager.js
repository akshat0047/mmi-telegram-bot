const intro = require('./intro')
const customBoard = require('./sendCustomBoard')
const loc = require('./mapmyindia/cords')
const nearby = require('./mapmyindia/nearby')
const geo = require('./mapmyindia/geocode')
const sm = require('./sendmessage')
const help = require('./help')


const BotManager = (req,res) =>{
    
    var address = {
        addone: {value:"",
                 type:"txt"},
        addtwo: {value:"",
                type:"txt"}
    }

    console.log("Inside Bot")
    const { message } = req.body
    var text = message.text
    //console.log("text: " + text)
    //console.log(message.text)
    if (message.location){
         console.log("location detected");
         let check = message.reply_to_message.text.split(" ")
         console.log("loc detected: " + check)

         if(check[3] == 'cords'){
            console.log('run mapit')
            loc.Mapit(req,res,message)
           }
         else if(check[3] == 'nearby'){
            console.log('run nearby')
            //console.log(check.slice(4))
            nearby.Nearby(req, res,message,check.slice(4))
        //console.log("Latitude:" + message.location.latitude + " Longitude:" + message.location.longitude)
         }
         else if(check[3] == 'current'){
             let add = {
                 addone: {
                     value: message.location.latitude + ',' + message.location.longitude,
                     type: 'cords'
                 },
                 addtwo: {
                    value: check.slice(5).join(" "),
                    type: 'txt'
                 }
             }
             console.log("custom board response sent" + add)
             geo.Geocode(req, res, message, add)  
        }
         else{
             res.end()
         }
        }

    else{
        text = text.toLowerCase().split(" ")
        console.log("inside else")
        if(text[1] == "mmi"){
            console.log("inside intro")
            intro.Intro(req,res,message)
        }
        else if(text[0] == 'mmi' && text[1] == "about"){
            console.log("inside about")
            let reply = "A Truly Indian Company with 25 Years of Passionately Working Towards" + 
                        "Making India Smart & Digital by Constantly Upgrading Cutting Edge" +
                        "Location Technologies with Latest Innovations Across the Globe"
            sm.Sm(req, res, message, reply)
        }
        else if(text[0] == 'mmi' && text[1] == 'cords'){
            console.log("insde location")
            customBoard.CustomBoard(req,res,message,text.slice(1))
        }
        else if(text[0] == 'mmi' && text[1] == 'nearby' && text.slice(2)){
            console.log("insde crds")
            console.log(text.slice(1))
            customBoard.CustomBoard(req,res,message,text.slice(1))
        }
        else if(text[0] == 'mmi' && text[1] == 'distance'){
            console.log('inside distance')
            address['addone']['value'] = text.slice(2,text.indexOf('to')).join(" ")
            address['addtwo']['value'] = text.slice(text.indexOf('to')+1).join(" ")
            console.log(address)

            if(address['addone']['value'] == 'current' && address['addtwo']['value'] == 'current')
                sm.Sm(req, res, message, "Source and Destination is same")
            else if(address['addone']['value'] == 'current')
                customBoard.CustomBoard(req,res,message,['current', 'to', address['addtwo']['value']])
            else if(address['addtwo']['value'] == 'current')
                customBoard.CustomBoard(req,res,message,['current', 'to', address['addone']['value']])
            else 
                geo.Geocode(req, res, message, address)
        }
        else if(text[1] == '-h'){
            help.Help(req, res, message, text[2])
        }
        else{
            console.log("Vacant response ended")
            res.end()
        }
}
}

exports.BotManager = BotManager