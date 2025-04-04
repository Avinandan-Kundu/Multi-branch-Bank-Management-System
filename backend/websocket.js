const WebSocket = require('ws');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // Handle incoming messages
    });
  });

  return wss;
};

module.exports = setupWebSocket;