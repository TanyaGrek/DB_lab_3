const Router = require('express');
const router = new Router();

const userController = require('./cities.controller');

router.get('/cities', userController.getCity);
router.post('/cities', userController.createCity);
router.patch('/cities/:id', userController.updateCity);
router.delete('/cities/:id', userController.removeCity);


module.exports = router;