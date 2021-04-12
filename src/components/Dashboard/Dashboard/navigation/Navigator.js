import React, { useContext } from "react";
import clsx from "clsx";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthContext } from "../../../../context/auth";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import LocalAtmOutlinedIcon from '@material-ui/icons/LocalAtmOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';

const categories = [
  {
    id: "Develop",
    children: [
      { id: "Dashboard", icon: <DashboardOutlinedIcon />, active: false, to: "/home" },
      {
        id: "Users",
        icon: <PeopleAltOutlinedIcon />,
        active: false,
        to: "/users",
      },
      {
        id: "Branches",
        icon: <LocationCityOutlinedIcon />,
        active: false,
        to: "/branches",
      },
      {
        id: "Employees",
        icon: <PeopleAltOutlinedIcon />,
        active: false,
        to: "/employees",
      },
      {
        id: "Budget",
        icon: <LocalAtmOutlinedIcon />,
        active: false,
        to: "/budget",
      },
      {
        id: "Payment",
        icon: <PaymentOutlinedIcon />,
        active: false,
        to: "/payment",
      },
      {
        id: "Visitor Booking",
        icon: <DnsRoundedIcon />,
        active: false,
        to: "/visitor-booking",
      },
    ],
  },
];

const styles = (theme) =>
  createStyles({
    categoryHeader: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    list: {},
    categoryHeaderPrimary: {
      color: theme.palette.common.white,
    },
    item: {
      paddingTop: 2,
      paddingBottom: 2,
      width:"90%",
      fontWeight:"bold",
      margin:"auto",
      textDecoration:"none",
      padding:"10px 0 10px 15px",
      lineHeight:"40px",
      color: "#1A734D",
      "&:hover,&:focus": {
        color:"#ffffff",
        border:"1px solid #OCA460",
        backgroundColor: "#OCA463",
      },
    },
    itemCategory: {
      boxShadow: "0 -1px 0 #ffffff inset",
      color: "#ffffff",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    catch: {
      fontSize: 24,
      color: "#ffffff",
      textDecoration: "none",
    },
    itemActiveItem: {
      color: "#ffffff",
    },
    itemPrimary: {
      lineHeight:"40px",
      fontSize: "inherit",
      color: "#ffffff",
    },
    itemIcon: {
      minWidth: "auto",
      marginRight: theme.spacing(2),
      color: "#1A734D",
      "&:hover,&:focus": {
        color:"#ffffff",
      },
    },
    divider: {
      marginTop: theme.spacing(2),
      backgroundColor: "#ffffff!important",
    },
    drawer: {
      fontWeight:"bold",
      backgroundColor: "#0cba70",
    },
  });

function Navigator(props) {
  const { classes, ...other } = props;
  const { logout } = useContext(AuthContext);

  return (
    <Drawer variant="permanent" {...other} classes={{ paper: classes.drawer }}>
      <List disablePadding className={classes.list}>
        <ListItem className={clsx(classes.catch, classes.itemCategory)}>
          <Link to={"#"} className={classes.catch}>
            Catch Taxi
          </Link>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            {children.map(({ id: childId, icon, active, to }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText classes={{ primary: classes.itemPrimary }}>
                  {" "}
                  <Link
                    to={to}
                    className={clsx(
                      classes.item,
                      active && classes.itemActiveItem
                    )}
                  >
                    {childId}{" "}
                  </Link>
                </ListItemText>
              </ListItem>
            ))}
            <br/> 
            <ListItem
              button
              className={clsx(classes.item)}
            >
              <ListItemIcon className={classes.itemIcon}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.itemPrimary }}
                onClick={logout}
              >
                {" "}
                logout
              </ListItemText>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default withStyles(styles)(Navigator);
