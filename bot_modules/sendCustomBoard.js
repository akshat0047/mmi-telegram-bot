const axios = require('axios')

const CustomBoard = (req, res, message, cusarg) => {
    if(cusarg.length > 1){
      cusarg = cusarg.join(" ")
    }
    console.log(cusarg)
    axios
    .post(
      'https://api.telegram.org/bot972665643:AAF0ffmNDzxEoyX7i8N2DSsgnINJYIn4ZNk/sendMessage',
      {
        chat_id: message.chat.id,
        text:"Send location for " + cusarg,
        reply_markup: {
            resize_keyboard: true,
            keyboard: [[{text:'Send Location',request_location: true}],],
            one_time_keyboard: true
        }
      }
    )
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

exports.CustomBoard = CustomBoard;