const request= require('request')
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast =(latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a17754beb77ada9f1a63fe7c5df9a569&query='+latitude+','+longitude
    request({url,json :true},(error,{body})=>{
            if(error){
                 callback('unable to connet internet!',undefined)
            }
                else if(body.error){
          callback ('Unable to find the location',undefined)
                }
           else{
       callback (undefined,'It is currently '+body.current.temperature+' degrees out.It feelslike '+body.current.feelslike+' degrees out.')}
         }) 

}


  module.exports = forecast