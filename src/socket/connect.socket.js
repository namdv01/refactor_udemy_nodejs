const io = require('socket.io');
const socket = (host) => {
  const server = io(host);
  server.on('connect', (client) => {
    console.log(client.id);

    client.on('join', (payload, ack) => {
      client.join(payload.roomId);
      const rooms = server.of('/').adapter.rooms;
      console.log(rooms);
      ack(`in Room ${payload.roomId}`)
      if (payload.mes) {
        server.to(payload.roomId).emit('mes', payload.mes);
      }
    });

    client.on('disconnect');
  });

}

module.exports = socket;