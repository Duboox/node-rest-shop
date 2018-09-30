const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Model
const Order = require('../models/order');
const Product = require('../models/product');

// Status helper
const status = require('../../helpers/status.code.helper');


// Get all Orders
router.get('/', (req, res, next) => {
    Order.find()
    .select('_id product quantity')
    .exec()
    .then(docs => {
        res.status(status.get_OK).json({
            ordersCount: docs.length,
            orders: docs
        })
    }).catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'No orders found.',
            error: err
        })
    });
});

// Insert one Order
router.post('/', (req, res, next) => {
    const productID = req.body.productID;
    Product.findById(productID).then(product => {
        const newOrder = new Order({
            _id: new mongoose.Types.ObjectId(),
            product: product._id,
            quantity: req.body.quantity
        });
    
        newOrder.save()
        .then(result => {
            res.status(status.post_CREATED).json({
                message: 'Order saved successfuly.',
                newOrder: newOrder
            });
        }).catch(err => {
            res.status(status.post_BADREQ).json({
                message: 'Failed to save Order.',
                error: err
            });
        });
    }).catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Product not found.',
            error: err
        })
    })
});

// Get one order
router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).exec().then(doc => {
        if (doc) {
            res.status(status.get_OK).json({
                order: doc,
            });
        } else {
            res.status(status.get_NOT_FOUND).json({
                message: 'Order not found.',
                error: err
            });
        }
    }).catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Order not found.',
            error: err
        })
    })
});

// Update one Order
router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.update({ _id: id }, { $set: {
        product: req.body.product,
        quantity: req.body.quantity
    }}).exec()
    .then(result => {
        res.status(status.get_OK).json({
            message: 'Order updated sucessfully.',
            result: result
        });
    })
    .catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Order not found.',
            error: err
        })
    });
});

// Delete one order
router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id }).exec()
    .then(result => {
        res.status(status.get_OK).json({
            message: 'Order deleted sucessfully.',
            result: result
        });
    })
    .catch(err => {
        res.status(status.get_NOT_FOUND).json({
            message: 'Order not found.',
            error: err
        })
    })
});

module.exports = router;