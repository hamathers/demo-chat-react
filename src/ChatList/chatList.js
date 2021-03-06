import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import React from "react";
import styles from "./styles";

class ChatListComponent extends React.Component {
  selectChat = (index) => this.props.selectChatFn(index);

  userIsSender = (chat) =>
    chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

  newChat = () => this.props.newChatBtnFn();

  render() {
    const { classes } = this.props;

    if (this.props.chats.length > 0) {
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.newChat}
            className={classes.newChatBtn}
          >
            New Message
          </Button>
          <List>
            {this.props.chats.map((_chat, _index) => {
              return (
                <div key={_index}>
                  <ListItem
                    onClick={() => this.selectChat(_index)}
                    className={classes.listItem}
                    selected={this.props.selectedChatIndex === _index}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp">
                        {
                          _chat.users
                            .filter(
                              (_user) => _user !== this.props.userEmail
                            )[0]
                            .split("")[0]
                        }
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        _chat.users.filter(
                          (_user) => _user !== this.props.userEmail
                        )[0]
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" color="textPrimary">
                            {_chat.messages[_chat.messages.length - 1].isTextMsg
                              ? _chat.messages[
                                  _chat.messages.length - 1
                                ].message.substring(0, 30) + " ..."
                              : "[Sticker]"}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    {_chat.receiverHasRead === false &&
                    !this.userIsSender(_chat) ? (
                      <ListItemIcon>
                        <NotificationImportant
                          className={classes.unreadMessage}
                        ></NotificationImportant>
                      </ListItemIcon>
                    ) : null}
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={this.newChat}
            className={classes.newChatBtn}
          >
            New Message
          </Button>
          <List></List>
        </div>
      );
    }
  }
}

export default withStyles(styles)(ChatListComponent);
