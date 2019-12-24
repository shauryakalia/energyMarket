
/* eslint-disable */
let io;
let noofuser = 0;
const users = [];
const socketServer = {
  initiateSocket(http) {
    io = require('socket.io')(http);
    //io.listen(5555);
    io.on('connection', (socket) => {
      console.log('user connected');

      socket.on('register', (data) => {
        console.log(data);
        users.push({
          socketId: socket.id,
          userId: data.userId,
          userRole: data.userRole
        });
        console.log(users);
      });
      socket.on('disconnect', () => {
        for (noofuser = 0; noofuser < users.length; noofuser += 1) {
          if (users[noofuser].socketId === socket.id) users.pop(users[noofuser]);
        }

        console.log('user disconnected');
      });
    });
  },

  async updateSocketValue(message, userList) {
    
    userList.forEach(element => {
      if (io.sockets.connected[element.socketId]) {
        io.sockets.connected[element.socketId].emit('notification', { text: message });
      }
    });
  },


};
const socket = { socketServer, userList: users };
module.exports = socket;
