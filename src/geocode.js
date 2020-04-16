const request=require('request');
const geocode=(text,callback) => {
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?limit=5&access_token=pk.eyJ1IjoiaGFyc2hpdHJjY2lpdCIsImEiOiJjazg5bnBvOWYwOGJzM2xxbTJrem80MDNzIn0.yszb71Ncp5TYLkk6EPdCYw`
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + text + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=5'
    request({url,json:true},(error,{body}={}) => {
        //console.log(body.features[0].center[1])
        if(error)
        callback('Cannot Connect to Network',undefined)
        else if(body.features.length === 0)
        callback('Cannot Find the Searched Place',undefined)
        else{
            callback(undefined,{'latitude':body.features[0].center[1],'longitude':body.features[0].center[0],"location":body.features[0].place_name})
        }
    })
}

module.exports=geocode