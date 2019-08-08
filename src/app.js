const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express();



//Defining Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine, views & partials locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve all whats in public folder.
app.use(express.static(publicDirectoryPath))



app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather Monitoring App',
        name: 'Hassan Miiro'
    })
})

app.get('/index',(req, res) => {
    res.render('index', {
        title: 'Weather Monitoring App',
        name: 'Hassan Miiro'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About The App',
        name: 'Hassan Miiro'
    })
})
app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Weather App FAQs',
        name: 'Hassan Miiro'
    })
})


app.get('/weather',(req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
        geocode(address,(error,{latitude, longitude, location} = {}) =>{ // assign the entered address to geocode
            if(error) {
                return res.send({error})
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    searchAddress: address
                })
                
            })
            
        })
    
    
})

app.get('/help/*',(req, res) => {
    res.render('error', {
        title: 'Help not Found',
        name: 'Hassan Miiro',
        errorMessage: 'Help article not found'
    })
})
app.get('*',(req, res) => {
    res.render('error', {
        title: 'Page not Found',
        name: 'Hassan Miiro',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})