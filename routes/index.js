const routes = require('express').Router();
const contacts = require('./contacts');
const bodyParser = require("body-parser");

routes.use('/api/contacts', contacts);
routes.use(bodyParser.json());

routes.get('/api/test', (req, res) => {
  res.status(200).json('BaseApp API Works!');
});

module.exports = routes;