const Event = require('./events.model');
const Venue = require('../venues/venues.model');

class EventsController {
  async createEvent(req, res) {

    const venue = await Venue.findById(req.body.venue_id)
    console.log(venue);

    const event = new Event({
      ...req.body,
      postal_code: venue.postal_code
    });

    try {
      await event.save();
      res.status(201).send(event);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async getEvents(req, res) {
    const searchQuery = req.query.search ? { $text: { $search: req.query.search } } : {};

    const events = await Event.aggregate([
      { $match: searchQuery },
      { "$addFields": { "venueObjId": { "$toObjectId": "$venue_id" } } },
      {
        $lookup:
          {
            from: 'venues',
            localField: 'venueObjId',
            foreignField: '_id',
            as: 'venue'
          }
      },
      {
        $lookup:
          {
            from: 'cities',
            localField: 'postal_code',
            foreignField: 'postal_code',
            as: 'city'
          }
      }
    ]).exec()

    if (!events.length) {
      return res.status(404).send()
    }

    try {
      const data = events.map(ev => {
        return {
          venue: ev.venue[0].name,
          venue_id: ev.venue_id,
          city: ev.city[0].name,
          _id: ev._id,
          starts: ev.starts,
          ends: ev.ends,
          title: ev.title,
        }
      })
      res.status(200).send(data)
    } catch (e) {
      res.status(400).send(e)
    }
  }

  async updateEvent(req, res) {
    const { id } = req.params;
    const updates = Object.keys(req.body)

    try {
      const event = await Event.findOne({ event_id: id })

      if (!event) {
        return res.status(404).send()
      }

      updates.forEach((update) => event[update] = req.body[update])
      await event.save()
      res.send(event)
    } catch (e) {
      res.status(400).send(e)
    }
  }

  async removeEvent(req, res) {
    const { id } = req.params;

    try {
      const event = await Event.findOneAndDelete({ _id: id })

      if (!event) {
        res.status(404).send();
      }
      res.send(event);
    } catch (e) {
      res.status(500).send();
    }
  }
}

module.exports = new EventsController();