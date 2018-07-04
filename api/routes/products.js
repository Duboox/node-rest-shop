const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Model
const Product = require('../models/product');

// Status helper
const status = require('../../helpers/status.code.helper');

router.get('/', (req, res, next) => {
    res.status(status.get_OK).json({
        message: 'Handling GET request to /products'
    })
});

router.post('/', (req, res, next) => {
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    newProduct.save(function (err) {
        if (err) return handleError(err);
        console.log('Product Saved', newProduct);
    })

    res.status(status.post_CREATED).json({
        message: 'Product saved successfuly.',
        newProduct: newProduct
    })
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(status.get_OK).json({
            message: 'special id',
            id: id
        })
    } else {
        res.status(status.get_NOT_FOUND).json({
            message: 'special id not found',
        })
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(status.get_OK).json({
        message: 'updated product',
    })
});

router.delete('/:productId', (req, res, next) => {
    res.status(status.get_OK).json({
        message: 'deleted product',
    })
});

module.exports = router;