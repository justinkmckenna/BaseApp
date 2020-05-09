const bodyParser = require("body-parser");
const contacts = require('express').Router();
const Contact = require('../models/contact');
contacts.use(bodyParser.json());

contacts.get("/", function (req, res) {
    Contact.find((err, contacts) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(contacts);
    });
});

contacts.post("/", function (req, res) {
    const newContact = new Contact({
        name: req.body.name,
        email: req.body.email
    });
    newContact.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newContact);
    });
});

contacts.get("/:id", function (req, res) {
    Contact.findById(req.params.id, (err, contact) => {
        if (err) return res.status(500).send(err);
        return res.send(contact);
    })
});

contacts.put("/:id", function (req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, contact) => {
        if (err) return res.status(500).send(err);
        return res.send(contact);
    });
});

contacts.delete("/:id", function (req, res) {
    Contact.findByIdAndRemove(req.params.id, (err, contact) => {
        if (err) return res.status(500).send(err);
        if (contact == null) return res.status(400).send("Not Found.");
        const response = {
            message: "Contact successfully deleted",
            id: contact._id
        };
        return res.status(200).send(response);
    });
});

module.exports = contacts;