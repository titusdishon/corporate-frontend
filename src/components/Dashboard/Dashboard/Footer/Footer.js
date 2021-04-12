import Typography from "@material-ui/core/Typography";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footerText: {
    color: "#000000",
    marginTop: theme.spacing(2),
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <Typography variant="body2" align="center" className={classes.footerText}>
      {"Copyright © "}
      catchtaxi.com
      {" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Footer;
