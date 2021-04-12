import React from 'react';
import {makeStyles} from '@material-ui/styles';
import { Paper} from '@material-ui/core';
import {LoginForm} from './components';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        display: 'flex',
        borderRadius:0,
        padding:0,
        margin:0,
        backgroundColor:"#e8e6e1",
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginForm: {
        marginBottom:theme.spacing(2),
        padding:theme.spacing(1),
        borderRadius:"20%",
    }
}));

const Login = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} title="Login">
            <LoginForm className={classes.loginForm}/>
        </Paper>
    );
};

export default Login;
