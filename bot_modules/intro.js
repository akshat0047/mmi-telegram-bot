const axios = require('axios')

const Intro = (req, res, message) => {
  axios
  .post(
    'https://api.telegram.org/bot972665643:AAF0ffmNDzxEoyX7i8N2DSsgnINJYIn4ZNk/sendMessage',
    {
      chat_id: message.chat.id,
      text: 'Welcome to MapmyIndia \n\n' + 
            'Commands\n-----------------\n'+
            'mmi about\n' + 
            'mmi cords\n' + 
            'mmi nearby\n' + 
            'mmi distance\n\n' + 
            'use -h flag to know more about the command(for ex: mmi -h about)'          
    }
  )
  .then(response => {
    // We get here if the message was successfully posted
    console.log('Message posted')
    return res.end('ok')
  })
  .catch(err => {
    // ...and here if it was not
    console.log('Error :', err)
    return res.end('Error :' + err)
  })
}

exports.Intro = Intro;
