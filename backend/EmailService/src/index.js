const express = require('express');
const bodyParser = require('body-parser');
const { PORT, BINDING_KEY } = require('./config/serverConfig');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const apiRoutes = require('./routes/index');
const { sendReminder } = require('./services/email');

const startServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true }));

    app.use('/api' , apiRoutes);
    const channel = await createChannel();

    app.listen(PORT , async () => {
        subscribeMessage(channel , sendReminder , BINDING_KEY)
        console.log(`Server is running on PORT ${PORT}`)
    })
}

startServer();