require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/BaseApp'));
app.use('/', routes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json())

var port = process.env.PORT;
app.listen(port, () => (console.log('Running on port: ', port)));