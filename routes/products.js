const bodyParser = require("body-parser");
const products = require('express').Router();
const Product = require('../models/product');
products.use(bodyParser.json());

products.get("/", function (req, res) {
    Product.find((err, products) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(products);
    });
});

products.post("/", function (req, res) {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture
    });
    newProduct.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newProduct);
    });
});

products.get("/:id", function (req, res) {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err);
        return res.send(product);
    })
});

products.put("/:id", function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        if (err) return res.status(500).send(err);
        return res.send(product);
    });
});

products.delete("/:id", function (req, res) {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err);
        if (product == null) return res.status(400).send("Not Found.");
        const response = {
            message: "Product successfully deleted",
            id: product._id
        };
        return res.status(200).send(response);
    });
});

module.exports = products;