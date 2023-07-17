const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { PORT , MONGO_URI, BINDING_KEY } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const { sendReminders } = require('./utils/cron');
const { createChannel } = require('./utils/messageQueue');

const startServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cookieParser());

    app.use(cors({
        origin: 'http://localhost:3000' , 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    }));

    app.use('/api' , apiRoutes);

    const channel = await createChannel();
    
    app.listen(PORT , async () => {
        console.log(`Server is running on PORT ${PORT}`);
        await mongoose.connect(MONGO_URI);
        console.log('Connected To MongoDB.')
        sendReminders(channel);
    });
}

startServer();
