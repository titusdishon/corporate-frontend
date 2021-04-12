import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chart from "./Chart";

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
  },
  menuButton: {
    marginRight: 36,
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));
export default function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>

        <Container maxWidth="lg" className={classes.container}>
          <br/>
          <br/>
          <Grid container spacing={3}>
            {/* Recent Billing */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>hello</Paper>
            </Grid>

            {/* Recent Trips */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>hello</Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>holla</Paper>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Trips */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
          </Grid>
        </Container>
    </div>
  );
}
