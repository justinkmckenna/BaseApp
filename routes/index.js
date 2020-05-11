const routes = require('express').Router();
const products = require('./products');
const bodyParser = require("body-parser");

routes.use('/api/products', products);
routes.use(bodyParser.json());

routes.get('/api/test', (req, res) => {
  res.status(200).json('BaseApp API Works!');
});

module.exports = routes;