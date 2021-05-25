import socket, { Socket } from 'socket.io';
import { app }  from '../index';

var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', (socket: Socket) => {
    console.log('hiiiiiiiiii')
});