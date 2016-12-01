import React, {Component} from 'react';

class Message extends Component {

  render() {

    switch (this.props.type) {
    case "incomingMessage":
      return (
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}
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


    }

    return (
      <div className="message">
      <span className="username">{this.props.username}</span>
        <span className="content">{this.props.content}
        </span>
        <span className="username">ID: {this.props.index}</span>
      </div>
    );
  }
}
export default Message;
