import React,{useContext} from "react";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import {Redirect} from "react-router-dom";
import { createStyles, withStyles } from "@material-ui/core/styles";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { AuthContext } from "../../../../context/auth";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
      background: "#00AEA4",
    },
    tabs: {
      color: "#000000",
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    appBar: {
      background: "#0cba70",
      border:"none",
      boxShadow:"0px 10px 20px 0px rgba(0,0,0,0.2)"
    },
    iconButtonAvatar: {
      padding: 4,
      backgroundColor:"#ffffff"
    },
    link: {
      textDecoration: "none",
      color: lightColor,
      "&:hover": {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
  });

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const { user, logout } = useContext(AuthContext);

  return (
    <React.Fragment>
      <AppBar className={classes.appBar} position="sticky" elevation={1}>
        {!user?<Redirect to="/auth/login"/>:null}
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
            <IconButton color="inherit" onClick={logout} className={classes.iconButtonAvatar}>
                <PowerSettingsNewIcon color="secondary"/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
