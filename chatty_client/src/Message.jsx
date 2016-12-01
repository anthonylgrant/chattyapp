import React, {Component} from 'react';

class Message extends Component {

  render() {
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
