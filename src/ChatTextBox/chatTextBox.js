import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Send from "@material-ui/icons/Send";
import React from "react";
import styles from "./styles";

class ChatTextBoxComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      chatText: "",
      isShowSticker: false,
    };
  }

  componentDidMount() {
    document.body.addEventListener("click", () =>
      this.setState({ isShowSticker: false })
    );
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", () =>
      this.setState({ isShowSticker: false })
    );
  }

  userTyping(e) {
    e.keyCode === 13
      ? this.submitMessage()
      : this.setState({ chatText: e.target.value });
  }

  messageValid = (txt) => txt && txt.replace(/\s/g, "").length;

  userClickedInput = () => this.props.userClickedInputFn();

  submitMessage = (sticker = undefined) => {
    if (this.messageValid(this.state.chatText) || sticker) {
      this.props.submitMessageFn(sticker ?? this.state.chatText, sticker);
      document.getElementById("chattextbox").value = "";
      this.setState({ chatText: "", isShowSticker: false });
    }
  };

  render() {
    const { classes } = this.props;
    const listStickers = [
      "https://c.tenor.com/BIGB9TPU__YAAAAi/alice-stickers-alice-animated.gif",
      "https://c.tenor.com/66fR8Loaub4AAAAi/laphie.gif",
      "https://c.tenor.com/Qon5dmLPKpcAAAAi/blob-fufi.gif",
      "https://c.tenor.com/6KYaQwPquPYAAAAi/smddiscord-cursed-discord-sticker.gif",
      "https://c.tenor.com/caGlFpq6pGgAAAAi/mimibubu.gif",
      "https://c.tenor.com/9oRczrQT-SQAAAAi/cute-transparant.gif",
      "https://c.tenor.com/LhzqR8OY1WcAAAAi/ninisjgufi-hello.gif",
      "https://c.tenor.com/pHS-2EXZt2wAAAAi/pentol-quby.gif",
      "https://c.tenor.com/CmKObjvLCO8AAAAi/sa-aot5.gif",
      "https://c.tenor.com/8ikJrd4Zc2QAAAAi/sleep-littlebitofab.gif",
    ];
    return (
      <>
        <div className={classes.chatTextBoxContainer}>
          <TextField
            placeholder="Type your message.."
            onKeyUp={(e) => this.userTyping(e)}
            id="chattextbox"
            className={classes.chatTextBox}
            // onFocus={this.userClickedInput}
          />
          <Send
            onClick={() => this.submitMessage()}
            className={classes.sendBtn}
          ></Send>
          <img
            src={require("../assets/sticker.png")}
            style={{ width: 25, height: 25, marginLeft: 10, cursor: "pointer" }}
            onClick={() =>
              this.setState({ isShowSticker: !this.state.isShowSticker })
            }
          />
        </div>
        <div
          style={{
            display: this.state.isShowSticker ? "flex" : "none",
          }}
          className={classes.listStickerWrapper}
        >
          {listStickers.map((sticker) => (
            <img
              src={sticker}
              style={{ width: 80, height: 80, cursor: "pointer" }}
              onClick={() => this.submitMessage(sticker)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default withStyles(styles)(ChatTextBoxComponent);
