const io = require('socket.io');
const socket = (host) => {
  const server = io(host);
  server.on('connect', (client) => {
    client.on('message', (payload, ack) => {
      client.join(payload.roomId);
      ack(`in Room ${payload.roomId}`);
      if (payload.mes) {
        server.to(payload.roomId).emit('mes', payload.mes);
      }
    });
  });
}

module.exports = socket;