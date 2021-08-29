const request = require('request');

const geocode = (address,callback)=>{
    const coordsurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoidmFuZGFuYXNodWtsYSIsImEiOiJja3NwOHBuYmUwMGx2MnFvNGUwNjd4MG8xIn0.qkCUB5PSvtuZe5zupfo8UA&limit=1";
    request({uri:coordsurl, json:true},(error,response)=>{
        // const data = JSON.parse(response.body);
        if(error){
            console.log('geocode',error);
            callback("unable to connect to location services.",undefined)
            // console.log("Unable to connect with mapbox");
        }else if(response.body.features.length === 0){
            callback("Unable to find location, please try another serach",undefined);
        }else{
        callback(undefined,{
            Latitude: response.body.features[0].center[1],
            Longitude: response.body.features[0].center[0],
            Location: response.body.features[0].place_name
        });
        }
    })
}

module.exports= geocode;