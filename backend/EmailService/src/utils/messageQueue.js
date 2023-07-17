const amqplib = require('amqplib');
const { EXCHANGE_NAME, MESSAGE_BROKER_URL } = require('../config/serverConfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME , "direct" , false);     // By exchange we mean distributor .
        return channel;    
    } catch (error) {
        throw error;
    }    
}

const publishMessage = async (channel , bindingKey , message) => {
    try {
        await channel.assertQueue('QUEUE_NAME');
        await channel.publish(EXCHANGE_NAME , bindingKey , Buffer.from(message));    
    } catch (error) {
        throw error;
    }    
}

const subscribeMessage = async (channel , service , bindingKey) => {
    try {
        const applicationQueue = await channel.assertQueue("QUEUE_NAME");
        channel.bindQueue(applicationQueue.queue , EXCHANGE_NAME , bindingKey);
        channel.consume('QUEUE_NAME' , async msg => {
            console.log('Received data' , msg.content.toString());
            const data = JSON.parse(msg.content.toString());
            await service(data.email , data.message);
            channel.ack(msg)
        })    
    } catch (error) {
        throw error;
    }    
}

module.exports = {
    createChannel , subscribeMessage , publishMessage
}