import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { useForm } from "../../../utils/hooks";
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

function NewBranch(props) {
  const classes = useStyles();
  const { onChange, onSubmit, values } = useForm(createNewBranch, {
    street: "",
    cityOrTown: "",
    countyOrState: "",
    phoneNumber: "",
    branchName: "",
    numberOfEmployees: 0,
    isActive: false,
  });

  const [createABranch, { error }, loading] = useMutation(
    CREATE_BRANCH_MUTATION,
    {
      variables: values,
      update(proxy, result) {
        props.setShowModel(false);
      },
      onError(err) {},
    }
  );

  function createNewBranch() {
    createABranch();
  }
  return (
    <div className={classes.root}>
      {loading && <p>.....loading.....</p>}
      <h1 className={classes.header}>Create A New User</h1>
      <form className={classes.form} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              name="phoneNumber"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              label="Branch Name"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              variant="outlined"
              name="branchName"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
          <TextField
            className={classes.textField}
            label="County Or State"
            type="text"
            onChange={(e) => onChange(e.target.name, e.target.value)}
            variant="outlined"
            name="countyOrState"
          />
        </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              label="Street"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              variant="outlined"
              name="street"
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              label="City Or Town"
              type="cityOrTown"
              onChange={(e) => onChange(e.target.name, e.target.value)}
              variant="outlined"
              name="cityOrTown"
            />
          </Grid>
        
          <Grid item xs={12} sm={12}>
            <TextField
              className={classes.textField}
              label="Number Of Employees"
              type="number"
              onChange={(e) => onChange(e.target.name, parseInt(e.target.value))}
              variant="outlined"
              name="numberOfEmployees"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControlLabel
             onChange={(e) => onChange("isActive",!values.isActive)}
             name="isActive"
              className={classes.textField}
              control={
                <Checkbox
                 
                  color="primary"
                />
              }
              label="Is Active"
            />
          </Grid>
        </Grid>
        
        <br />
        <br />
        <Grid item xs={12} sm={12}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={createABranch}
          >
            SUBMIT
          </Button>
        </Grid>
      </form>
    </div>
  );
}

//graphql mutations
const CREATE_BRANCH_MUTATION = gql`
  mutation createBranch(
    $street: String!
    $cityOrTown: String!
    $countyOrState: String!
    $phoneNumber: String!
    $branchName: String!
    $numberOfEmployees: Int!
    $isActive: Boolean!
  ) {
    createBranch(
      branchInput: {
        street: $street
        cityOrTown: $cityOrTown
        countyOrState: $countyOrState
        phoneNumber: $phoneNumber
        branchName: $branchName
        numberOfEmployees: $numberOfEmployees
        isActive: $isActive
      }
    ) {
      cityOrTown
      phoneNumber
      street
      numberOfEmployees
  
    }
  }
`;

export default NewBranch;
