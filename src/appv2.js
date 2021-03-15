const path = require('path')
const express = require('express')
const geocode = require('./utils/geocodev2')
const forecast = require('./utils/forecastv2')
const oddsToday = require('./utils/oddsToday')

//we need hbs module to work with partials
const hbs = require('hbs')

// here we create the web server
const app = express()

//useful variables with the paths to static files
console.log(__dirname)

// console.log(__filename)
// path joint allows to manipulate paths. First we go down one level and go to the public directory 
const publicDirectoryPath = path.join(__dirname, '../public')

// by default views should be in the views directory in the webserver
//but we can configure a new path for the views
const viewsPath = path.join(__dirname, '../templates/views')

// path for partials
const partialsPath = path.join(__dirname, '../templates/partials')


// this is to set up handelbars in the engine
app.set('view engine', 'hbs')

// to say where to find the views for handelbars
app.set('views', viewsPath)

// to set up the way to find the partials
hbs.registerPartials(partialsPath)

// app.use is a way to customize the server
// to render static assets as html, css, js, images
app.use(express.static(publicDirectoryPath))

// app.get to render a handlebars in the views directory
// it includes the view first and then later the values with access
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'My name',
        author: 'Eduardo del Molino'
    })
})

app.get('/football', (req, res) => {
    res.render('football', {
        title: 'Football predictions',
        name: 'My name',
        author: 'Eduardo del Molino'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'My name',
        author: 'Eduardo del Molino'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'My name',
        message: 'This is a message for you'
    })
})
// to create different routes. It takes 2 parameter: first the route and a function where we describe what to do when someone visits the route
// the function receives 2 argument: firts the paramenter of the request for the server, the second is the response

// to render dynamic documents we use handlebars and create code we can reuse pieces of code across pages
// for using handelbars with express we need to install the npm module hbs





// we could remove this router as we have the static use with the index.html
// app.get('', (req, res) => {
//     // send the response
//     // this renders a message
//     //         res.send(' hello express!!')
//     // this renders HTML
//     res.send('<h1> Weather home page </h1>')
//     // we can also render JSON
// })


// // we can define another route
// app.get('/help', (req, res) => {
//     // send the response
//      // we can also render JSON
//     // res.send('Help Page')
//     res.send({
//         name: "Eduardo",
//         age: 51
//     })
// })

// app.get('/about', (req, res) => {
//     // send the response
//     // res.send('About Page')
//     res.send('<h1> About page </h1>')
// })

app.get('/weather', (req, res) => {
    // send the response
    // res.send('Weather Page')

    if (!req.query.address) {
        return res.json({
            error: 'You must provide an address'
        })
    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.json({
                error
            })
            console.log(error)
        } else {
            
            console.log('Location requested: ' + location)
    
            // forecast(latitude, longitude, (error, data) => {
            forecast(latitude, longitude, (error, {temperature, feelslike, weather_description, location} = {}) => {
                if (error) {
                    return res.json({
                        error: error
                    })
                    console.log(error)
                } else {

                    res.json({
                        temperature,
                        feelslike,
                        location,
                        weather_description,
                        address: req.query.address
                    })

                    // console.log('It is currently ' + data.temperature + 'C and it feels like ' + data.feelslike + 'C. It is ' + data.weather_description + ' in ' + data.location)
                    // console.log('It is currently ' + temperature + 'C and it feels like ' + feelslike + 'C. It is ' + weather_description + ' in ' + location)
                }
            })
        }
    })


})



app.get('/odds', (req, res) => {
    // send the response
    // res.send('Weather Page')

    oddsToday (req.query.team, (error, listMatches = []) => {
        if (error) {
            return res.json({
                error
            })
            console.log(error)
        } else {
                     

                    res.json(
                        // listMatches[0].homeTeam,
                        // listMatches[0].awayTeam,
                        // listMatches[0].startDateTime,
                        // listMatches[0].result,
                        // listMatches[0].odd
                        listMatches[0]
                   )

                    // console.log('It is currently ' + data.temperature + 'C and it feels like ' + data.feelslike + 'C. It is ' + data.weather_description + ' in ' + data.location)
                    // console.log('It is currently ' + temperature + 'C and it feels like ' + feelslike + 'C. It is ' + weather_description + ' in ' + location)
                }
           
        })
    })





// To experiment with query strings
// such as http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    // to make one of the parameters as compulsory
    if (!req.query.search) {
        // console.log('no search')
        return res.json({
            error: 'You must provide a search term' 
        })
    }

    // req.query is an object with the information about the parameters included in the query string
    console.log(req.query)
    res.json({
        products: []
        
    })
})


// 404 page for pages in help
app.get('/help/*', (req, res) => {
   
    res.render('404', {
        title: 'help page not found',
        name: 'My name',
        message: 'The help request is not found'
    })
})


// 404 page always in the last position of the app.get for the routers, * means anyother request
app.get('*', (req, res) => {
   
    res.status(404).render('404', {
        title: 'Page not found',
        name: 'My name',
        message: 'The page requested is not found'
    })
})


// we need to start the server up with the port and a callback function with the resuls
app.listen(3000, () => {
    console.log('Server up in port 3000')
})