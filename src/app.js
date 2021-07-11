const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forcast= require('./utils/forecast')

const app=express()

//define paths for express config
const public_dir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static direcory to server
app.use(express.static(public_dir))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'ranbm',
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ran Ben Melech'
    })
    
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Center',
        helpText:'Hi how can I help',
        name: 'Ran Ben Melech'
    })
    
})
app.get('/weather',(req,res)=>{
    if (!req.query.address)
    {
        return res.send({
            error:'Please enter a location'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forcast: forcastData,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast: "todays forecast",
    //     location: req.query.adrress,
    //     address: req.query.address
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    res.send({
    products:[]
})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404-help',
        errorMessege:'404 page!-seems like you are in some trouble',
        name: 'Ran Ben Melech'
    })
    
})
app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404 page!',
        errorMessege:'this is not the path you are looking for',
        name: 'Ran Ben Melech'
    })
    
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})