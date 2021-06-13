const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('./src/db/mongoose');
const citiesRouter = require('./src/components/cities/cities.router');
const countriesRouter = require('./src/components/countries/countries.router');
const eventsRouter = require('./src/components/events/events.router');
const venuesRouter = require('./src/components/venues/venues.router');

const PORT = process.env.PORT || 3002;
const app = express();

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './src/views')
const partialsPath = path.join(__dirname, './src/views/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Events',
    name: 'Tanya Grek'
  })
});

app.get('/event', (req, res) => {
  res.render('event', {
    title: 'Event editing',
    name: 'Tanya Grek'
  })
});

app.use(express.json())
app.use('/api', citiesRouter);
app.use('/api', countriesRouter);
app.use('/api', eventsRouter);
app.use('/api', venuesRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))