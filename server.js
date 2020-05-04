var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
  });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

  app.get("/api/test", function(req,res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });
  
  app.get("/api/contacts", function(req, res) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get contacts.");
        } else {
          res.status(200).json(docs);
        }
      });
  });
  
  app.post("/api/contacts", function(req, res) {
    var newContact = req.body;
    newContact.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new contact.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });
  
  app.get("/api/contacts/:id", function(req, res) {
  });
  
  app.put("/api/contacts/:id", function(req, res) {
  });
  
  app.delete("/api/contacts/:id", function(req, res) {
  });