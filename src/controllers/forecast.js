const request = require('request');

const forecast = (latitude,longitude,units,callback)=>{
    weatherurl = 'http://api.weatherstack.com/current?access_key=e1cd2dde2a96e14a28b63623cf0fa7e6&query='+latitude+','+longitude+'&units='+units;
    request({uri:weatherurl, json:true},(error,response)=>{
        if(error){
            callback("Unable to connect with forecast service",undefined);
        }
        else if(response.body.error){
        callback("Unable to find location, please try another search",undefined);
        }else{
        callback(undefined,{weather:response.body.current.weather_descriptions[0]+". It is currently "+response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+" degrees out."});
        }
    })

}

module.exports= forecast;