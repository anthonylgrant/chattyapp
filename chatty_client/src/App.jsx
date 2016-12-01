import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

var data =
  {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: []
  };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
    // this.createChatMessage = this.createChatMessage.bind(this);
  }

  createChatMessage = text => {
   const newMessage =
    {
      username: this.state.currentUser.name,
      content: text
    };
    const messages = this.state.messages.concat(newMessage);
    // Update the state of the app component.
    // Calling setState will trigger a call to rend
    this.setState({messages: messages})
    this.socket.send(JSON.stringify(newMessage))
    console.log("This is the new message: ", newMessage)
  }

  createUsername = name => {
    this.setState({currentUser: {name: name}})
    console.log(name)

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:4000");
    console.log(this);
    console.log("Connected to Server: ", this.socket);

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