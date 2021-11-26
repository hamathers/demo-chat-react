const styles = (theme) => ({
  content: {
    height: "62vh",
    overflow: "auto",
    padding: "25px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "25%",
    width: "100%",
    position: "absolute",

    [theme.breakpoints.up('md')]: {
      height: "72vh",
      marginLeft: "300px",
      top: "20%",
      width: "calc(100% - 300px)",  
    },
  },

  friendSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    width: "300px",
    borderRadius: "10px",
    display: 'flex'
  },

  userSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    width: "300px",
    borderRadius: "10px",
    display: 'flex'
  },

  chatHeader: {
    width: "100%",
    backgroundColor: "#344195",
    position: "fixed",
    fontSize: "18px",
    textAlign: "center",
    color: "white",
    padding: "10px",
    boxSizing: "border-box",

    [theme.breakpoints.up('md')]: {
      width: "calc(100% - 301px)",
      marginLeft: "301px",
    }
  },

  backButton: {
    marginRight: 10,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

export default styles;
