const Venue = require('./venues.model')

class VenuesController {
  async createVenues(req, res) {
    const venue = new Venue({
      ...req.body,
    });

    try {
      await venue.save();
      res.status(201).send(venue);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async getVenues(req, res) {
    const venues = await Venue.find({})

    if (!venues.length) {
      return res.status(404).send()
    }

    try {
      res.status(200).send(venues)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }
}

module.exports = new VenuesController();