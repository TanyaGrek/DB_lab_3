const Router = require('express');
const router = new Router();

const VenuesController = require('./venues.controller');

router.get('/venues', VenuesController.getVenues);
router.post('/venues', VenuesController.createVenues);

module.exports = router;