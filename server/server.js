// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');
const colors = [
      "#FF570A",
      "#12355B",
      "#D72638",
      "#420039"
    ];
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

  console.log('client connected');
  //Broadcast # of users logged in
  broadcastUserCount();
  ws.color = colors[wss.clients.length % colors.length];
  // Event handling for messages received from client
  ws.on('message', function incoming(message) {
    let parsedMessage = JSON.parse(message);
    switch (parsedMessage.type) {
      case "postMessage":
        parsedMessage.id = uuid.v4();
        parsedMessage.type = "incomingMessage";
        parsedMessage.color = ws.color;
        console.log("WS COLOR IS: ", parsedMessage.color)
        break;
      case "postNotification":
        parsedMessage.type = "incomingNotification"
        break;
      default:
      console.log("unknown message type!: ", parsedMessage.type)
    }

    // stringified message
    let stringMessage = JSON.stringify(parsedMessage);

    broadcastMessage(stringMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', (ws) => {
    broadcastUserCount();
    console.log('Client disconnected')});

});


function broadcastMessage (message) {
  wss.clients.forEach(function each(client) {
  // if sending client doesn't want to see their sent message
  // if (client !== ws) client.send(stringMessage);
  client.send(message);
  // console.log("Instance of Client: ", Object.getPrototypeOf(client));
  });
}

function broadcastUserCount () {
  wss.clients.forEach(function each(client) {
    console.log("# of users logged in :", wss.clients.length)
    client.send(JSON.stringify({
      type: "userCounter",
      content: wss.clients.length
    }));
  });
}



// function assignUserColor () {
//   wss.clients.forEach(function each(client) {
//     // var colors = {
//     //     orange: "#FF570A",
//     //     blue: "#12355B",
//     //     red: "#D72638",
//     //     purple: "#420039"
//     //   }

//     client.send(JSON.stringify( {
//       type: "userColor",
//       content: ""
//     }))
//   }
// }


// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++ ) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }
