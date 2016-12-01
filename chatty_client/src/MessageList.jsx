import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Rendering <App/>");
    return (
      <div id="message-list">
        {this.props.messages.map((msg, i) => {
          return <Message key={i} index={i} username={msg.username} content={msg.content} />
        })}
        <div className="message system">
        Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}
export default MessageList;
