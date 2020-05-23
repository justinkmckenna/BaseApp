const fs = require('fs')
const products = require('express').Router()
const Product = require('../models/product')
const base64ToImage = require('base64-to-image');
const uploadPath = './uploads/'
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_KEY
});

products.get('/', (req, res) => {
    Product.find(async (err, products) => {
        if (err) return res.status(500).send(err)
        return res.status(200).send(products);
    })
});

products.post('/', async (req, res) => {
    try {
        let pictures = await Promise.all(req.body.pictures.map(async p => {
            return (await base64ToImage(p, uploadPath, { 'fileName': 'img-' + Date.now() + '-' + process.env.ENV })).fileName
        }))
        pictures = await Promise.all(pictures.map(async p => {
            return await uploadFile(p)
        }))
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            pictures: pictures,
            price: req.body.price
        })
        newProduct.save(err => {
            if (err) throw err
            return res.status(200).send(newProduct)
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
});

products.get('/:id', (req, res) => {
    Product.findById(req.params.id, async (err, product) => {
        if (err) return res.status(500).send(err)
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

const uploadFile = (fileName) => {
    return new Promise(resolve => {
        try {
            // Read content from the file
            const fileContent = fs.readFileSync(uploadPath + fileName)

            // Setting up S3 upload parameters
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileName, // File name you want to save as in S3
                ContentType: 'image/jpeg',
                ACL: 'public-read',
                Body: fileContent
            };

            // Uploading files to the bucket
            s3.upload(params, function (err, data) {
                fs.unlink(uploadPath + fileName, (err) => { console.log(err) })
                if (err) throw err
                resolve(data.Location)
            });
        } catch (err) {
            console.log(err)
            throw err
        }
    })
};

module.exports = products