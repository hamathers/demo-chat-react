import { withStyles } from "@material-ui/core/styles";
import React from "react";
import styles from "./styles";

class ChatViewComponent extends React.Component {
  componentDidMount = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };
  componentDidUpdate = () => {
    const container = document.getElementById("chatview-container");
    if (container) container.scrollTo(0, container.scrollHeight);
  };

  render() {
    const { classes, chat, user } = this.props;
    if (chat === undefined) {
      return <main className={classes.content}></main>;
    } else if (chat !== undefined) {
      return (
        <div>
          <div className={classes.chatHeader}>
            <button
              onClick={() => this.props.handleBack()}
              className={classes.backButton}
            >
              Back
            </button>
            Your conversation with{" "}
            {chat.users.filter((_usr) => _usr !== user)[0]}
          </div>
          <main id="chatview-container" className={classes.content}>
            {chat.messages.map((_msg, _index) => {
              return (
                <div
                  key={_index}
                  className={
                    _msg.sender === user ? classes.userSent : classes.friendSent
                  }
                  style={{
                    background: !_msg.isTextMsg
                      ? "transparent"
                      : _msg.sender === user
                      ? "#707BC4"
                      : "tomato",
                    justifyContent:
                      !_msg.isTextMsg && _msg.sender === user
                        ? "flex-end"
                        : "flex-start",
                  }}
                >
                  {_msg.isTextMsg ? (
                    _msg.message
                  ) : (
                    <img src={_msg.message} style={{ width: 80 }} />
                  )}
                </div>
              );
            })}
          </main>
        </div>
      );
    } else {
      return <div className="chatview-container">Loading...</div>;
    }
  }
}

export default withStyles(styles)(ChatViewComponent);
