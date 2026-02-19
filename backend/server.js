const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const { initializeSocket } = require('./socket');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
    console.log(`server running on "http://localhost:${PORT}"`);
});
