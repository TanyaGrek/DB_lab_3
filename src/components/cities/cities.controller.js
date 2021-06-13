const City = require('./cities.model')

class CitiesController {
  async createCity(req, res) {
      const city = new City ({
        ...req.body,
      });

      try {
        await city.save();
        res.status(201).send(city);
      } catch (e) {
        res.status(400).send(e.message);
      }
  }

  async getCity(req, res) {
    const cities = await City.find({})

    if (!cities.length) {
      return res.status(404).send()
    }

    try {
      res.status(200).send(cities)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async updateCity(req, res) {
    const { name } = req.params;
    const updates = Object.keys(req.body)

    try {
      const city = await City.findOne({ country_code: name })

      if (!city) {
        return res.status(404).send();
      }

      updates.forEach((update) => city[update] = req.body[update])
      await city.save();
      res.send(city);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }

  async removeCity(req, res) {
    const { name } = req.params;

    try {
      const city = await City.findOneAndDelete({ country_code: name })

      if (!city) {
        res.status(404).send();
      }

      res.send(city);
    } catch (e) {
      res.status(500).send();
    }
  }
}

module.exports = new CitiesController();