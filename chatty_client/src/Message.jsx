import React, {Component} from 'react';

class Message extends Component {

  render() {

    switch (this.props.type) {
    case "incomingMessage":
      return (
        <div className="message">
          <span
          className="username"
          style= { {color: this.props.color} }
          >
            {this.props.username}
          </span>
          <span
          className="content"
          >
            {this.props.content}
          </span>
        </div>
      );
      break;
    case "incomingNotification":
      return (
        <div className="message system">
        {this.props.content}
        </div>
      )
    default:
      console.warn("message component received incorrect type: ", this.props.type)
    }


  }
}
export default Message;
