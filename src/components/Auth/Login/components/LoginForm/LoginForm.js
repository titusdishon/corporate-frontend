/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, Grid, TextField } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../../../../context/auth";
import { useForm } from "../../../../../utils/hooks";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    padding: 0,
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  top: {
    color: "#ffffff",
    animationDuration: "550ms",
  },
  title: {
    width: "100%",
    textAlign: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  link: {
    color: "#ffffff",
  },
  LoginForm: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
  },
  password: {
    backgroundColor: "#ffffff",
  },
}));

const LoginForm = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState({});
  const [shown, setShowPassword] = useState(false);
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      setRedirect(true);
    },
    onError(err) {
      console.log(
        JSON.stringify(err.graphQLErrors[0].extensions.exception.errors)
      );
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser().then((r) => {});
  }

  return (
    <Zoom in={true}>
      <Grid item xs={12} lg={2} md={3} className={classes.LoginForm}>
        {errors && errors.general && (
          <Alert severity="error">{errors.general}</Alert>
        )}
        {redirect && <Redirect to={"/home"} />}
        <div className={classes.title}>
          <h3>CATCH CORPORATE</h3>
          <h4>Login</h4>
        </div>
        <form {...rest} className={clsx(className)} onSubmit={onSubmit}>
          <div className={classes.fields}>
            <TextField
              fullWidth
              label="Email address"
              name="email"
              error={!!errors.email}
              value={values.email}
              variant="outlined"
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={shown ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e.target.name, e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={() => setShowPassword(!shown)}
                />
              }
              label="Show password"
            />
          </div>
          <Button
            className={classes.submitButton}
            color="primary"
            size="large"
            type="submit"
            variant="contained"
          >
            {loading ? "submitting..." : "Sign in"}
          </Button>
        </form>
      </Grid>
    </Zoom>
  );
};

LoginForm.propTypes = {
  className: PropTypes.string,
};
//graphql mutations
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
      phoneNumber
      corporate
      userName
      roles
      corporate
    }
  }
`;

export default LoginForm;
