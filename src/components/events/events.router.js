const Router = require('express');
const router = new Router();

const eventsController = require('./events.controller');

router.get('/events', eventsController.getEvents);
router.post('/events', eventsController.createEvent);
router.patch('/events/:id', eventsController.updateEvent);
router.delete('/events/:id', eventsController.removeEvent);

module.exports = router;