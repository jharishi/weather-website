
const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const foreCast = require('./utils/forecast.js')
//using express.js
const app = express()
const port = process.env.PORT || 3000

//express path config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// app.use(express.static(viewsPath))
//using handle bars
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static express dir
app.use(express.static( publicDirPath ))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'weather app',
        name : 'rishi jha'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
        help : 'Help ME!',
        name : 'rishi jha'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About me',
        name :  'Rishi jha'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'provide the address'
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        foreCast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
    
    
    

app.get('/products',(req,res)=>{
    if (!req.query.search){
       return res.send({
            error:'Provide the the term'
        })
    }
    console.log(req.query)
    res.send({
        product : []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404Page',{
         title: '404',
        name : 'rishi jha',
        errormessage : 'Hep me not found'


    })
})
app.get('*',(req,res)=>{
    res.render('404Page',{
        title: '404',
       name : 'rishi jha',
       errormessage : 'Page not found'


   })
})





app.listen(port,()=>{
    console.log('server is Up and running on '+port)
})