import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { FETCH_BRANCHES_SUB_QUERY } from "../../../utils/graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { usePost, useForm } from "../../../utils/hooks";
import gql from "graphql-tag";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    margin: "auto",
    marginTop: "10px",
  },
  header: {
    width: "100%",
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginTop: "3px",
  },
  phoneInput: {
    width: "100%",
  },
  button: {
    float: "right",
  },
}));

function NewUser(props) {
  const classes = useStyles();
  const { onChange, onSubmit, values } = useForm(registerUser, {
    userName: "",
    email: "",
    password: "",
    phoneNumber: "",
    corporate: "",
    branch: "",
    roles: [],
    isActive: false,
  });

  const { data } = useQuery(FETCH_BRANCHES_SUB_QUERY);

  const [createUser, { error }, loading] = useMutation(CREATE_USER_MUTATION, {
    variables: values,
    update(proxy, result) {
      props.setShowModel(false)
    },
    onError(err) {},
  });

  function registerUser() {
    createUser();
  }
  return (
    <div className={classes.root}>
      {loading&&<p>.....loading.....</p>}
      <h1 className={classes.header}>Create A New User</h1>
      <form className={classes.form} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              name="phoneNumber"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              label="Name"
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              variant="outlined"
              name="userName"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              label="Email"
              type="email"
              onChange={(e)=>onChange(e.target.name, e.target.value)}
              variant="outlined"
              name="email"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              options={data && data.branches}
              onChange={(event, newValue)=>onChange("branch", newValue.id)}
              getOptionLabel={(data) => data.branchName}
              className={classes.textField}
              renderInput={(params) => (
                <TextField
                  className={classes.textField}
                  {...params}
                  name="branch"
                  label="Branch"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel htmlFor="roles">Roles</InputLabel>
              <Select
                id="roles"
                native
                onChange={(e)=>onChange(e.target.name, e.target.value)}
                inputProps={{
                  name: "roles",
                }}
              >
                <option />
                <option value={"ADMIN"}>Admin</option>
                <option value={"BRANCH"}>Branch</option>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
              className={classes.textField}
              onChange={(e) => onChange("isActive",!values.isActive)}
              control={
                <Checkbox
                  name="isActive"
                  color="primary"
                />
              }
              label="Is Active"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            className={classes.textField}
            label="Password"
            type="password"
            onChange={(e)=>onChange(e.target.name, e.target.value)}
            variant="outlined"
            name="password"
          />
        </Grid>
        <br />
        <br />
        <Grid item xs={12} sm={12}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={createUser}
          >
            SUBMIT
          </Button>
        </Grid>
      </form>
    </div>
  );
}

//graphql mutations
const CREATE_USER_MUTATION = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $phoneNumber: String!
    $corporate: String
    $branch: String!
    $roles: [String]
    $isActive: Boolean
  ) {
    register(
      registerInput:{
        userName:$userName
        email: $email
        password: $password
        phoneNumber: $phoneNumber
        corporate: $corporate
        branch: $branch
        roles: $roles
        isActive: $isActive
      }
    ) {
      userName
      email
      phoneNumber
      corporate
      branch
      roles
      isActive
      createdAt
      updatedAt
      createdBy
      creatorId
    }
  }
`;

export default NewUser;
