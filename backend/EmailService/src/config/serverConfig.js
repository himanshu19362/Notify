require('dotenv').config();

module.exports = {
    PORT : process.env.PORT , 
    EXCHANGE_NAME : process.env.EXCHANGE_NAME , 
    BINDING_KEY : process.env.BINDING_KEY , 
    MESSAGE_BROKER_URL : process.env.MESSAGE_BROKER_URL , 
    EMAIL : process.env.EMAIL , 
    PASSWORD : process.env.PASSWORD ,
}