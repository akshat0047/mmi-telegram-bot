const dotenv = require('dotenv');

let env = dotenv.config();

module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  restkey: process.env.API_KEY,
  clientid: process.env.CLIENT_ID,
  clientsec: process.env.CLIENT_SECRET,
  oauth: process.env.OAUTH_URL,
  token: process.env.TOKEN,
};