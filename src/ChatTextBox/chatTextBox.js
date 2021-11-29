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
      "https://live.staticflickr.com/65535/51712132023_4e56708c7e_o.gif",
      "https://live.staticflickr.com/65535/51711858746_1aa7f65ae0_o.gif",
      "https://live.staticflickr.com/65535/51712739710_e9d9b5acb2_o.gif",
      "https://live.staticflickr.com/65535/51711072717_bdc485002c_o.gif",
      "https://live.staticflickr.com/65535/51711072792_098510dfb0_o.gif",
      "https://live.staticflickr.com/65535/51712739790_ea335cb494_o.gif",
      "https://live.staticflickr.com/65535/51712528224_c911097c89_o.gif",
      "https://live.staticflickr.com/65535/51712528234_134ab24958_o.gif",
      "https://live.staticflickr.com/65535/51712528264_4523a9c650_o.gif",
      "https://live.staticflickr.com/65535/51712739865_607d99a9a0_o.gif",
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
