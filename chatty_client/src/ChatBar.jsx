import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {currentUser: this.props.currentUser.name, currentMessage: ""};
  }

  // UI TODO:
  // on submit of the message
  //   - if username is different
  //       - also change username and send dialog
  // on blur of user input
  //      - check to see if user is the same currentUser
  //       -if not, make a submit
  //       - if same, do nothing

  componentDidMount() {
    this.msgInput.focus()
  }

  //handle state change
  handleMessageChange = e => {
    this.setState({currentMessage: e.target.value});
  }
  handleUserChange = e => {
    this.setState({currentUser: e.target.value});
  }

  //handle app component functions
  handleEnterMessage = e => {
    if (e.which === 13) {
      this.props.createChatMessage(e.target.value)
      e.target.value="";
    }
  }
  handleBlurUsername = (e) => {
    this.props.createUsername(e.target.value)
  }

  // handle focus from username
  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.props.createUsername(e.target.value)
      this.msgInput.focus();
    }
  }

  render() {
    const welcomemessage = `Welcome, ${this.state.currentUser}`
    return (
      <footer>
        <input
          onKeyPress={ this.handleKeypress }
          onChange={this.handleUserChange}
          ref = { inp => { this.usrInput = inp } }
          onBlur={this.handleBlurUsername}
          id="username"
          type="text"
          placeholder="Your Name (Optional)"
          value= {welcomemessage}
        />
        <input
          onKeyPress={this.handleEnterMessage}
          onChange={this.handleChange}
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          ref = { inp => { this.msgInput = inp } }
        />
      </footer>
    );
  }
}
export default ChatBar;



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