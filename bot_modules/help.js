const sm = require('./sendmessage')

const Help = (req, res, message, harg)=>{
      let reply = "";
      switch(harg){
            case 'about':
                reply = "`mmi about` command tells us about MapmyIndia. \n\nExample- mmi about"
                break;
            case 'cords':
                reply = "`mmi cords` command\n[takes no arguement] tells us the present Latitude and Longitude along with the current address. \n\nExample- mmi cords"
                break;
            case 'nearby':
                reply = "`mmi nearby` command\n[takes one or multiple arguements] tells us about nearby places related to the keywords passed. \n\nExample 1- mmi nearby teaExample \n2- mmi nearby tea coffee"
                break;
            case 'distance':
                reply = "`mmi distance` command\n[takes two arguement seperated by `to`]\n(Use 'current' for your location) command tells us the distance between two places along wth the duration taken by vehicle to commute." + 
                        "\n\nExample 1- mmi distance Lucknow to Delhi \nExample 2- mmi distance nijampur malhaur to cannaught place"
                break;         
      }
      sm.Sm(req, res, message, reply);
}

exports.Help = Help