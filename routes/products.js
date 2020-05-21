const fs = require('fs')
const path = require('path')
const products = require('express').Router()
const Product = require('../models/product')
const base64ToImage = require('base64-to-image');
const imageToBase64 = require('image-to-base64')
const uploadPath = './src/assets/productPictures/'

products.get('/', (req, res) => {
    Product.find(async (err, products) => {
        if (err) return res.status(500).send(err)
        // products = await Promise.all(products.map(async product => {
        //     product.pictures = await Promise.all(product.pictures.map(async p => { 
        //         return await imageToBase64(uploadPath + p)
        //     }))
        //     return product
        // }))
        return res.status(200).send(products);
    })
});

products.post('/', async (req, res) => {
    const pictureNames = await Promise.all(req.body.pictures.map(async p => { 
        return (await base64ToImage(p,uploadPath)).fileName 
    }))
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        pictures: pictureNames,
        price: req.body.price
    })
    newProduct.save(err => {
        if (err) return res.status(500).send(err)
        //newProduct.pictures = req.body.pictures
        return res.status(200).send(newProduct)
    })
});

products.get('/:id', (req, res) => {
    Product.findById(req.params.id, async (err, product) => {
        if (err) return res.status(500).send(err)
        // product.pictures = await Promise.all(product.pictures.map(async p => { 
        //     return await imageToBase64(uploadPath + p)
        // }))
        return res.send(product)
    })
});

products.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        if (err) return res.status(500).send(err)
        return res.send(product)
    });
});

products.delete('/:id', (req, res) => {
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