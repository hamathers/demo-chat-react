const styles = (theme) => ({
  listWrapper: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },

  signOutBtn: {
    position: "absolute",
    bottom: "0px",
    left: "0px",
    width: "100%",
    borderRadius: "0px",
    backgroundColor: "#227092",
    height: "35px",
    boxShadow: "0px 0px 2px black",
    color: "white",

    [theme.breakpoints.up('md')]: {
      width: "300px",
    }
  },
});

export default styles;
