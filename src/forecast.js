const request=require('request')

const forecast=(lat,lon,callback) => {
    const url=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=88780d07473d4c79809e601543653421`
    request({url,json:true},(error,{body}={}) => {
        if(error)
        callback("Cannot get Weather Forecast")
        else if(body.message)
        callback(message)
        else{
            const message=`The Current Weather is ${body.weather[0].description}.The current Temperature is ${body.main.temp}.The humidity is ${body.main.humidity}.`
            callback(undefined,{'description' :body.weather[0].description,'temp': body.main.temp , 'humid':body.main.humidity,'temp_min':body.main.temp_min,'temp_max':body.main.temp_max})
        }
    })
}
module.exports=forecast