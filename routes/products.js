const bodyParser = require("body-parser");
const multer = require('multer');
const products = require('express').Router();
const Product = require('../models/product');
products.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + process.env.ENV)
    }
  })
   
var upload = multer({ storage: storage })

products.get("/", (req, res) => {
    Product.find((err, products) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(products);
    })
});

products.post("/", (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        pictures: req.body.pictures,
        price: req.body.price
    })
    newProduct.save(err => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(newProduct)
    })
});

products.post("/pictures", upload.single('file'), (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return res.status(400).send(error)
    }
    res.send(file)
});

products.get("/:id", (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err)
        return res.send(product)
    })
});

products.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        if (err) return res.status(500).send(err)
        return res.send(product)
    });
});

products.delete("/:id", (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
        if (err) return res.status(500).send(err)
        if (product == null) return res.status(400).send("Not Found.");
        const response = {
            message: "Product successfully deleted",
            id: product._id
        };
        return res.status(200).send(response)
    })
});

module.exports = products