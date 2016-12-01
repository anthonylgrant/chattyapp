// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
// console.log(uuid);

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  // console.log(wss.clients)
  //
  ws.on('message', function incoming(message) {
    let parsedMessage = JSON.parse(message);
    // console.log(parsedMessage)
    // console.log("Type: ", parsedMessage.type, 'User', parsedMessage.username, "said", parsedMessage.content);
    switch (parsedMessage.type) {
      case "postMessage":
        parsedMessage.id = uuid.v4();
        parsedMessage.type = "incomingMessage";
        break;
      case "postNotification":
        //TODO
        break;
    default:
      console.log("unknown message type!", parsedMessage.type)

    }



    console.log(parsedMessage);
    // stringified message
    let stringMessage = JSON.stringify(parsedMessage);
    console.log("This is the string message: ", stringMessage)


    broadcastMessage(stringMessage);

  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});


function broadcastMessage (message) {
  wss.clients.forEach(function each(client) {
  // if sending client doesn't want to see their sent message
  // if (client !== ws) client.send(stringMessage);
  client.send(message);
  console.log("Instance of Client: ", Object.getPrototypeOf(client));
  });
}

// SERVER TODO:
/// Accept Messages - needs event handler
/// &&
/// Re-broadcast to all clients -