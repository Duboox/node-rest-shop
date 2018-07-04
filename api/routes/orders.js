const express = require('express');
const router = express.Router();

// Status helper
const status = require('../../helpers/status.code.helper');

router.get('/', (req, res, next) => {
    res.status(status.get_OK).json({
        message: 'Handling GET request to /orders'
    })
});

router.post('/', (req, res, next) => {
    res.status(status.post_CREATED).json({
        message: 'Handling POST request to /orders'
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
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

router.delete('/:orderId', (req, res, next) => {
    res.status(status.get_OK).json({
        message: 'deleted order',
    })
});

module.exports = router;