const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

// nodemon src/app.js -e js,hbs

// console.log(__dirname)
// console.log(__filename)

const app = express()

//Define path for Express config
const publicPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting the handlebars engine
app.set('view engine', 'hbs')

//Customize 'views' directory. Normally the folder will have to be views
app.set('views', viewsPath)

//HBS Partials
hbs.registerPartials(partialsPath)

//Setup the static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Yves'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Yves'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Help, I need somebody.',
    name: 'Yves'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'Please input an address'
    })
  }

  geocode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(long, lat, (error, forecast) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast,
        location,
        address: req.query.address
      })
    })
  })

})

app.get('/products', (req, res) => {

  if (!req.query.search) {
    // stops function and doesn't "send" twice creating an error
    return res.send({
      error: 'You must provide a search!'
    })
  }

  console.log(req.query.search)

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: 'Error',
    message: 'Sorry, 404 help bummer',
    name: 'Yves'
  })
})

app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    message: 'Sorry, 404 bummer',
    name: 'Yves'
  })
})

//funrun.rocks
//funrun.rocks/help
//funrun.rocks/about

app.listen(3000, () => {
  console.log('server is up on port 3000')
})
