const mongoConfig = "mongodb+srv://" + process.env.MONGO_ATLAS_USER + ":" + process.env.MONGO_ATLAS_PASSWORD + "@node-rest-shop-mrytj.mongodb.net/node-rest-shop?retryWrites=true"
module.exports = mongoConfig;