const Router = require('express');
const router = new Router();

const countriesController = require('./countries.controller');

router.get('/countries', countriesController.getCountry);
router.post('/countries', countriesController.createCountry);
router.patch('/countries/:id', countriesController.updateCountry);
router.delete('/countries/:id', countriesController.removeCountry);


module.exports = router;