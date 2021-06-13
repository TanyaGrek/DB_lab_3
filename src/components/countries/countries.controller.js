const Country = require('./countries.model');


class CountriesController {
  async createCountry(req, res) {
    const country = new Country ({
      ...req.body,
    })

    try {
      await country.save()
      res.status(201).send(country)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async getCountry(req, res) {
    const countries = await Country.find({})

    if (!countries.length) {
      return res.status(404).send()
    }

    try {
      res.status(200).send(countries)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async updateCountry(req, res) {
    const { name } = req.params;
    const updates = Object.keys(req.body)

    try {
      const country = await Country.findOne({ country_code: name })

      if (!country) {
        return res.status(404).send()
      }

      updates.forEach((update) => country[update] = req.body[update])
      await country.save()
      res.send(country)
    } catch (e) {
      res.status(400).send(e.message)
    }
  }

  async removeCountry(req, res) {
    const { name } = req.params;

    try {
      const country = await Country.findOneAndDelete({ country_code: name })

      if (!country) {
        res.status(404).send();
      }

      res.send(country);
    } catch (e) {
      res.status(500).send();
    }
  }
}

module.exports = new CountriesController();