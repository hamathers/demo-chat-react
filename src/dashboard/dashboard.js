import React, { Component } from "react";
import ChatListComponent from "../ChatList/chatList";
import styles from "./styles";
import { Button, withStyles } from "@material-ui/core";
import ChatViewComponent from "../ChatView/chatView";
import ChatTextBoxComponent from "../ChatTextBox/chatTextBox";
import NewChatComponent from "../NewChat/newChat";

const firebase = require("firebase");

class DashboardComponent extends Component {
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: [],
    };
  }

  componentWillMount = () => {
    firebase.auth().onAuthStateChanged(async (_usr) => {
      //Check xem người dùng đã login chưa, chưa thì bắt đăng nhập, rồi thì lấy đc email để get tin nhắn về
      if (!_usr) this.props.history.push("/login");
      else {
        firebase
          .firestore()
          .collection("chats") //Tham chiếu đến collection chat
          .where("users", "array-contains", _usr.email) //Tìm trong document của collection chat xem có phần tử nào có tên là _usr.email thì lấy về
          .onSnapshot(async (res) => {
            const chats = res.docs.map((_doc) => _doc.data());
            this.setState({
              email: _usr.email,
              chats: chats,
              friends: [],
            });
          });
      }
    });
  };

  newChatBtnClicked = () =>
    this.setState({ newChatFormVisible: true, selectedChat: null });

  clickedMessageWhereNotSender = (chatIndex) =>
    this.state.chats[chatIndex].messages[
      this.state.chats[chatIndex].messages.length - 1
    ].sender !== this.state.email;

  selectChat = async (chatIndex) => {
    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  };

  messageRead = () => {
    const chatIndex = this.state.selectedChat;
    const docKey = this.buildDocKey(
      this.state.chats[chatIndex].users.filter(
        (_usr) => _usr !== this.state.email
      )[0]
    );
    if (this.clickedMessageWhereNotSender(chatIndex)) {
      firebase
        .firestore()
        .collection("chats")
        .doc(docKey)
        .update({ receiverHasRead: true });
    } else {
      console.log("Clicked message where the user was the sender");
    }
  };

  // Always in alphabetical order:
  // 'user1:user2'
  buildDocKey = (friend) => [this.state.email, friend].sort().join(":");

  submitMessage = (msg, sticker = undefined) => {
    const docKey = this.buildDocKey(
      this.state.chats[this.state.selectedChat].users.filter(
        (_usr) => _usr !== this.state.email
      )[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: this.state.email,
          message: sticker ? sticker : msg,
          timestamp: Date.now(),
          isTextMsg: sticker ? false : true,
        }),
        receiverHasRead: false,
      });
  };

  goToChat = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = this.state.chats.find((_chat) =>
      usersInChat.every((_user) => _chat.users.includes(_user))
    );
    this.setState({ newChatFormVisible: false });
    await this.selectChat(this.state.chats.indexOf(chat));
    this.submitMessage(msg);
  };

  newChatSubmit = async (chatObj) => {
    const docKey = this.buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        messages: [
          {
            message: chatObj.message,
            sender: this.state.email,
            isTextMsg: true,
          },
        ],
        users: [this.state.email, chatObj.sendTo],
        receiverHasRead: false,
      });
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);
  };

  handleBack() {
    this.setState({ selectedChat: null });
  }

  signOut = () => firebase.auth().signOut();

  render() {
    const { classes } = this.props;
    const { selectedChat, newChatFormVisible, email, chats } = this.state;
    return (
      <div>
        <h1>My email: {email}</h1>
        <div
          className={
            typeof selectedChat === "number" ? classes.listWrapper : null
          }
        >
          <ChatListComponent
            // history={this.props.history}
            selectChatFn={this.selectChat}
            newChatBtnFn={this.newChatBtnClicked}
            userEmail={email}
            chats={chats}
            selectedChatIndex={selectedChat}
          />
        </div>

        {newChatFormVisible || typeof selectedChat !== "number" ? null : (
          <ChatViewComponent
            user={email}
            chat={chats[selectedChat]}
            handleBack={() => this.handleBack()}
          />
        )}
        {selectedChat !== null && !newChatFormVisible ? (
          <ChatTextBoxComponent
            userClickedInputFn={this.messageRead}
            submitMessageFn={this.submitMessage}
          />
        ) : null}
        {this.state.newChatFormVisible ? (
          <NewChatComponent
            email={this.state.email}
            goToChatFn={this.goToChat}
            newChatSubmitFn={this.newChatSubmit}
            handleCancel={() => this.setState({ newChatFormVisible: false })}
          />
        ) : null}
        <Button onClick={this.signOut} className={classes.signOutBtn}>
          Sign Out
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(DashboardComponent);
