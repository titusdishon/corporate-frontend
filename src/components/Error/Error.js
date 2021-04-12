import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { LinearProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#009E95",
  },
  text: {
    paddingTop: "20%",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#ffffff",
    color: "#000000!important",
    boxShadow: "0 8",
    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
}));

const Error = (props) => {

  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Suspense fallback={<LinearProgress />}>
        <div className={classes.text}>
          <h1>Requested Page Does Not Exist</h1>
          <Link to={"/home"}>
            {" "}
            <br />
            <HomeIcon fontSize="large" />
            <br />
            Home
          </Link>
        </div>
      </Suspense>
    </main>
  );
};

Error.propTypes = {
  route: PropTypes.object,
};

export default Error;
