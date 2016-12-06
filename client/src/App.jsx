import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var data = {
  currentUser: {
    name: "Anonymous"
  }, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  userCount: 1
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    // this.createChatMessage = this.createChatMessage.bind(this);
  }

  createChatMessage = (newmsg) => {
    if (!this.state.currentUser.name) {
      alert("Please enter your username!")
      return;
    }
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: newmsg
    };
    // Update the state of the app component.
    // Calling setState will trigger a call to rend
    // this.setState({messages: messages})

    this.socket.send(JSON.stringify(newMessage))
    // console.log("This is the new message: ", newMessage);
  }

  createUsername = (name) => {
    const newNotification = {
      type: "postNotification",
      content: `${this.state.currentUser.name} changed their name to ${name}`
    }
    this.setState({currentUser: {name: name}}) // correct
    // this.state.currentUser = {name: name}; // anti-React
    this.socket.send(JSON.stringify(newNotification))
    console.log("This is the new notification: ", newNotification);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };
    console.log(this.socket);
    this.socket.onmessage = (event) => {
      console.log('this', this);
      console.log("This is the event data: ",event.data)
      const data = JSON.parse(event.data);
      switch(data.type) {
        case "userCounter":
          console.log("There are", data.content, "users logged in")
          let newUserCount = data.content;
          this.setState({userCount: newUserCount});
          break;
        case "incomingMessage":
        case "incomingNotification":
          console.log("This is the onmessage data: ", data);
          let newMessages = this.state.messages.concat([data]);
          this.setState({messages: newMessages})
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
        }
    }
  }

  componentDidUpdate() {
    // Scroll new message into view
    let el = document.getElementById("message-list").lastChild;
    console.log("this is el: ", el)
    console.log("This is the el var: ", typeof el);
    if (el) {
      el.scrollIntoView();
    }
    // }
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <h3>{this.state.userCount} users online</h3>
        </nav>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          currentUser={this.state.currentUser}
          createChatMessage={this.createChatMessage}
          createUsername={this.createUsername} />
      </div>
    );
  }
}


export default App;



// Passing Data Via Props Example
// === //
// Parent = React.createClass({
//   tacos: [ 'Guacamole', 'Beef', 'Bean' ],
//   render() {
//     return <div className="parent-component">
//       <h3>List of tacos:</h3>
//       <TacosList tacos={ this.tacos } />
//     </div>;
//   }
// });

// TacosList = React.createClass({
//   render() {
//     return <div className="tacos-list">
//       {this.props.tacos.map( ( taco, index ) => {
//         return <p key={ `taco-${ index }` }>{ taco }</p>;
//       })}
//     </div>;
//   }
// });


// import React, {Component} from 'react';
// import ChatBar from './ChatBar.jsx';
// import MessageList from './MessageList.jsx';
//
//
// var data =
//   {
//     currentUser: {
//       name: "Anonymous"
//     }, // optional. if currentUser is not defined, it means the user is Anonymous
//     messages: [],
//     userCount: 1
//   };
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = data;
//     // this.createChatMessage = this.createChatMessage.bind(this);
//   }
//
//   createChatMessage = (newmsg) => {
//     const newMessage = {
//       type: "postMessage",
//       username: this.state.currentUser.name,
//       content: newmsg
//     };
//     const messages = this.state.messages.concat(newMessage);
//     // Update the state of the app component.
//     // Calling setState will trigger a call to rend
//     // this.setState({messages: messages})
//     if (this.state.currentUser.name) {
//       this.socket.send(JSON.stringify(newMessage))
//       console.log("This is the new message: ", newMessage);
//     } else {
//       alert("Please enter your username!")
//     }
//   }
//
//   createUsername = (name) => {
//     // TODO:
//     const newNotification = {
//       type: "postNotification",
//       content: `${this.state.currentUser.name} changed their name to ${name}`
//     }
//     // if (currentUser.name !== name) {
//     this.setState({currentUser: {name: name}}) // correct
//     // this.state.currentUser = {name: name}; // anti-React
//     this.socket.send(JSON.stringify(newNotification))
//    // }
//     console.log("This is the new notification: ", newNotification);
//   }
//
//   componentDidMount() {
//     console.log("componentDidMount <App />");
//     this.socket = new WebSocket("ws://localhost:4000");
//
//     this.socket.onopen = (event) => {
//       console.log("Connected to server");
//     };
//     console.log(this.socket);
//     this.socket.onmessage = (event) => {
//       console.log('this', this);
//       console.log("This is the event data: ",event.data)
//       const data = JSON.parse(event.data);
//       switch(data.type) {
//         case "userCounter":
//           console.log("There are", data.content, "users logged in")
//           let newUserCount = data.content;
//           this.setState({userCount: newUserCount});
//           break;
//         case "incomingMessage":
//         case "incomingNotification":
//           console.log("This is the onmessage data: ", data);
//           let newMessages = this.state.messages.concat([data]);
//           this.setState({messages: newMessages})
//         break;
//
//       default:
//         // show an error in the console if the message type is unknown
//         throw new Error("Unknown event type " + data.type);
//         }
//     }
//   }
//
//   componentDidUpdate() {
//     // Scroll new message into view
//     let el = document.getElementById("message-list").lastChild;
//     console.log("this is el: ", el)
//     console.log("This is the el var: ", typeof el);
//     if (el) {
//       el.scrollIntoView();
//     }
//     // }
//   }
//
//   render() {
//     console.log("Rendering <App/>");
//     return (
//       <div className="wrapper">
//         <nav>
//           <h1>Chatty</h1>
//           <h3>{this.state.userCount} users online</h3>
//         </nav>
//         <MessageList
//           messages={this.state.messages}
//         />
//         <ChatBar
//           currentUser={this.state.currentUser}
//           createChatMessage={this.createChatMessage}
//           createUsername={this.createUsername} />
//       </div>
//     );
//   }
// }
//
//
// export default App;
//
//
//
// // Passing Data Via Props Example
// // === //
// // Parent = React.createClass({
// //   tacos: [ 'Guacamole', 'Beef', 'Bean' ],
// //   render() {
// //     return <div className="parent-component">
// //       <h3>List of tacos:</h3>
// //       <TacosList tacos={ this.tacos } />
// //     </div>;
// //   }
// // });
//
// // TacosList = React.createClass({
// //   render() {
// //     return <div className="tacos-list">
// //       {this.props.tacos.map( ( taco, index ) => {
// //         return <p key={ `taco-${ index }` }>{ taco }</p>;
// //       })}
// //     </div>;
// //   }
// // });
