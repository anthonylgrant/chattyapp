import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

var data =
  {
    type: "",
    currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: []
  };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    // this.createChatMessage = this.createChatMessage.bind(this);
  }

  createChatMessage = (newmsg) => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: newmsg
    };
    const messages = this.state.messages.concat(newMessage);
    // Update the state of the app component.
    // Calling setState will trigger a call to rend
    // this.setState({messages: messages})
    if (this.state.currentUser.name) {
    this.socket.send(JSON.stringify(newMessage))
    console.log("This is the new message: ", newMessage);
    } else {
      alert("Please enter your username!")
    }
  }

  createUsername = (name) => {
    // TODO:
    const newNotification = {
      type: "postNotification",
      content: `${this.state.currentUser} changed their name to ${name}`
    }
    this.setState({currentUser: {name: name}}) // correct
    // this.state.currentUser = {name: name}; // anti-React
    console.log("this.state", this.state);
    console.log(name)
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");

    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      console.log('this', this);
      console.log(event.data)
      const data = JSON.parse(event.data);

      switch(data.type) {
        case "incomingMessage":
        // handle incoming message
        console.log("This is the onmessage data: ", data);
        let newMessages = this.state.messages.concat([data])
        this.setState({messages: newMessages})
          break;
        case "incomingNotification":
        // handle incoming notification
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
        }


    }
  }

  componentDidUpdate() {
    // Scroll new message into view
    let element = document.getElementById("message-list").lastChild;
    element.scrollIntoView();
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
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