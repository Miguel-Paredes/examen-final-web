import app from './server.js'
import connection from './database.js';
import http from 'http';
import { Server } from 'socket.io';


connection()

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: URL_FRONTEND
    }
})

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.on('enviar-mensaje-fron-back',(payload)=>{
        socket.broadcast.emit('enviar-mensaje-fron-back',payload)
    })
});



server.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})
// app.listen(app.get('port'),()=>{
//     console.log(`Server ok on http://localhost:${app.get('port')}`);
// })