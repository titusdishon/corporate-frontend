import { makeStyles } from "@material-ui/core";

export const tableStyles = makeStyles(() => ({
    header: {
      fontWeight: "bold",
      color: "#ffffff",
    },
    like: {
      padding: "10px",
      backgroundColor: "#000000",
      marginBottom: "20px",
    },
    spinner: {
      margin: "auto",
      height: "100vh",
      backgroundColor: "inherit",
    },
    container: {
      backgroundColor: "#ffffff",
      padding: "10px",
      margin: "auto 1%",
      minHeight: "100vh",
      width: "98%",
      overflowX: "scroll",
    },
    addButton: {
      float: "right",
    },
    title: {
      float: "left",
    },
    modal: {
      width: "50%",
      margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modalInner: {
      backgroundColor: "#ffffff",
      padding: "20px",
    },
  }));