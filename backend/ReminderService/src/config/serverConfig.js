require('dotenv').config();
const bcrypt = require('bcrypt');

module.exports = {
    PORT : process.env.PORT , 
    MONGO_URI : process.env.MONGO_URI , 
    SALT : bcrypt.genSaltSync(9) , 
    JWT_SECRET : process.env.JWT_SECRET ,
    EXCHANGE_NAME : process.env.EXCHANGE_NAME , 
    BINDING_KEY : process.env.BINDING_KEY ,
    MESSAGE_BROKER_URL : process.env.MESSAGE_BROKER_URL
}