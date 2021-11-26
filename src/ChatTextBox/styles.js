const styles = (theme) => ({
  sendBtn: {
    color: "blue",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "40px",
    // left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "100%",
    display: "flex",

    padding: "0 10px",

    [theme.breakpoints.up("md")]: {
      bottom: "15px",
      left: "315px",
      width: "calc(100% - 300px - 50px)",
      display: "flex",
    },
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },

  listStickerWrapper: {
    width: '100%',
    padding: "30px 0px",
    position: "absolute",
    bottom: 100,
    justifyContent: "center",
    background: "#242526",
    opacity: 0.9,
    flexWrap: "wrap",

    [theme.breakpoints.up("md")]: {
      width: 450,
      padding: "30px 0px",
      position: "absolute",
      bottom: 55,
      right: 40,
      justifyContent: "center",
      background: "#242526",
      opacity: 0.9,
      flexWrap: "wrap",
    },
  },
});

export default styles;
