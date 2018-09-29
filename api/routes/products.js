const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Model
const Product = require('../models/product');

// Status helper
const status = require('../../helpers/status.code.helper');


// Get all Products
router.get('/', (req, res, next) => {
    Product.find()
    .select('_id name price')
    .exec()
    .then(docs => {
        res.status(status.get_OK).json({
            productsCount: docs.length,
            products: docs
        })
    }).catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'No products found.',
            error: err
        })
    });
});

// Insert one Product
router.post('/', (req, res, next) => {
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    newProduct.save()
    .then(result => {
        res.status(status.post_CREATED).json({
            message: 'Product saved successfuly.',
            newProduct: newProduct
        });
    }).catch(err => {
        res.status(status.post_CREATED).json({
            message: 'Failed to save Product.',
            error: err
        });
    });
});

// Get one Product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        if (doc) {
            res.status(status.get_OK).json({
                product: doc,
            });
        } else {
            res.status(status.get_NOT_FOUND).json({
                message: 'Product not found.',
                error: err
            });
        }
    }).catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Product not found.',
            error: err
        })
    })
});

// Update one Product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    // const updateOps = {};
    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // Product.update({ _id: id }, { $set: updateOps }).exec()
    Product.update({ _id: id }, { $set: {
        name: req.body.name,
        price: req.body.price
    }}).exec()
    .then(result => {
        res.status(status.get_OK).json({
            message: 'Product updated sucessfully.',
            result: result
        });
    })
    .catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Product not found.',
            error: err
        })
    });
});


// Delete one Product
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec()
    .then(result => {
        res.status(status.get_OK).json({
            message: 'Product deleted sucessfully.',
            result: result
        });
    })
    .catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Product not found.',
            error: err
        })
    })
});

module.exports = router;