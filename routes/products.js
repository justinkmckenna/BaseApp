const bodyParser = require("body-parser");
const multer = require('multer');
const path = require('path');
const products = require('express').Router();
const Product = require('../models/product');
products.use(bodyParser.json());

const storageEngine = multer.diskStorage({
    desination: "../src/app/assets/product_images/",
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storageEngine,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, callback) {
        checkFileType(file, callback);
    }
}).single("productPicture");

function checkFileType(file, callback) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return callback(null, true);
    }
    else {
        callback("Error: Images Only");
    }
}

products.get("/", function (req, res) {
    Product.find((err, products) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(products);
    });
});

products.post("/", function (req, res) {
    let pictureName = "";
    upload(req.body.picture, res, (err) => {
        if (err) return res.status(500).send(err);
        else {
            if (req.body.picture == undefined) return res.status(401).send("No image to upload.");
            else pictureName = req.body.picture.filename;
        }
    })
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        picture: pictureName,
        price: req.body.price
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