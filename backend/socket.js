const { Server } = require('socket.io');

exports.initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", 
            methods: ['GET', 'POST'],
        }
    });

    io.on("connection", socket => {
        console.log("User connected: ", socket.id);
    });
}
