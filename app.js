const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const io = require('socket.io')(server);

// Body-parser JSON
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Mongo DB
const mongoose = require('mongoose');
const mongoConfig = require('./mongo.config');
mongoose.connect(mongoConfig, { useNewUrlParser: true });

// Logs http
const logs = require('morgan');
app.use(logs('dev'));

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
})

// App Routes Modules
const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');

// App Routes
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);

// App Http error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

//Socket io Test
io.on('connect', function(socket) {
    console.log('alguien se ha conectado.');
})

console.log('node-rest-shop API started sucessfully.');
module.exports = app;