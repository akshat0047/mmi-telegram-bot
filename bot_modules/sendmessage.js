const axios = require('axios')

function Sm(req, res, message, reply){
    
    axios
    .post('https://api.telegram.org/bot972665643:AAF0ffmNDzxEoyX7i8N2DSsgnINJYIn4ZNk/sendMessage',
    {
      chat_id: message.chat.id,
      text: reply
    })
    .then( response => {
        //console.log(response.update)
        return res.end('ok')
       })
       .catch(err => {
         // ...and here if it was not
         console.log('Error :', err)
         return res.end('Error :' + err)
       })

      }

exports.Sm = Sm;

