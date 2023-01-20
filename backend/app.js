const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const operations = require('./routes/entity_operations');
const { Server } = require("socket.io");
const http = require('http');



const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        withCredentials : true
    },
    allowEIO3: true
});



var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

io.on('connection', socket => {
    socket.on('worker', count => {
        console.log(count);
    })
})




app.use(express.json());
app.use(cors(corsOptions));




app.use('/db', operations);





app.listen(8000, async () => {
    await sequelize.authenticate();
});
