const express = require('express');
const router = express.Router();

// Status helper
const status = require('../../helpers/status.code.helper');

router.get('/', (req, res, next) => {
    res.status(status.get_OK).json({
        message: 'Handling GET request to /products'
    })
});

router.post('/', (req, res, next) => {
    res.status(status.post_CREATED).json({
        message: 'Handling POST request to /products'
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