const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    pictures: [{
        type: String,
    }],
    price: {
        type: Number,
    }
});

module.exports = mongoose.model('Product', productSchema);