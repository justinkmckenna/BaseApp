const products = require('express').Router()
const Product = require('../models/product')
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
            let fileName = Date.now() + '-' + process.env.ENV
            let fileContent = Buffer.from(p.replace('data:image/jpeg;base64,',''), 'base64');
            return await uploadFileToAWS(fileName, fileContent)
        }))
        console.log(pictures)
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
        for (let picture of product.pictures) {
            let fileName = picture.replace('https://base-app-product-pictures.s3.amazonaws.com/', '')
            deleteFileFromAWS(fileName)
        }
        const response = {
            message: "Product successfully deleted",
            id: product._id
        };
        return res.status(200).send(response)
    })
});

const uploadFileToAWS = (fileName, fileContent) => {
    return new Promise(resolve => {
        try {
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileName,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
                Body: fileContent
            };

            s3.upload(params, function (err, data) {
                if (err) throw err
                resolve(data.Location)
            });
        } catch (err) {
            throw err
        }
    })
};

const deleteFileFromAWS = (fileName) => {
    var params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName
    };
    s3.deleteObject(params, function (err, data) {
        if (err) throw err
        console.log("File deleted successfully");
    });
}

module.exports = products