const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

// instruction to indicate the page to serve
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
app.set ('view engine', 'hbs')

//if we want to put our hbs in a folder that is not calles "views" as express expects 
const viewsPath = path.join(__dirname, '../templates/views')
app.set ('views', viewsPath)

// for partials
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Eduardo del Molino'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        author: 'Eduardo del Molino'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        message: 'You should take care of the code you write',
        title: 'Help page for the Weather App',
        author: 'Eduardo del Molino'
        
    })
})
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

// app.get('', (req, res) => {
//     res.send('<H1>Weather</H1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Eduardo',
//         age: 50
//     },{
//         name: 'Pedro',
//         age:24
//     }])
// })


// app.get('/about', (req, res) => {
//     res.send('<H1>About the Weather</H1>')
// })

app.get('/weather', (req, res) => {
    res.send({
        location: 'Madrid',
        forecast: 'to be defined'
    })
})


//404 page
app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
       
        author: 'Eduardo del Molino'
        
    })
})

  

//404 page
app.get('*', (req, res) => {
    res.render('404', {
        message: '404- page not found',
      
        author: 'Eduardo del Molino'
        
    })
})

 
//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server up in port 3000')
})