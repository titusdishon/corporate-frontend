import React, { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_EMPLOYEE_QUERY } from "../../../utils/graphql";
import { useTableStatus } from "../../../utils/tableHooks";
import { Grid, Grow, makeStyles } from "@material-ui/core";
import TableComponent from "../Tables";
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";

const useStyles = makeStyles(() => ({
  header: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  container:{
    backgroundColor:"#ffffff",
    padding:"10px",
    margin:"auto 1%",
    minHeight:"100vh",
    width:"98%",
    overflowX: "scroll"
  },
  like: {
    padding: "10px",
    backgroundColor: "#000000",
    marginBottom: "20px",
  },
  spinner:{
    margin: "auto",
    height:"100vh",
    backgroundColor:"inherit",
  }
}));

function Employees() {
  const { loading, data } = useQuery(FETCH_EMPLOYEE_QUERY);
  const { response, skipResetRef, updateMyData } = useTableStatus(
    data && data.employees
  );

  const columns = useMemo(
    () => [
      {
        Header: "Code",
        accessor: "riderCode",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} riderCode`,
      },
      {
        Header: "Name",
        accessor: "employeeName",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} employeeName`,
      },
      {
        Header: "Email",
        accessor: "email",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} email`,
      },
      {
        Header: "Wallet Balance",
        accessor: "walletBalance",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} walletBalance`,
      },
      {
        Header: "Is Active",
        accessor: "isActive",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} isActive`,
      },
      {
        Header: "Can self Approve?",
        accessor: "selfApproved",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} selfApproved`,
      },
      {
        Header: " Created By",
        accessor: "createdBy",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} createdBy`,
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        aggregate: 'count',
        Cell: ({ row }) => <div>{moment.utc(row.original.createdAt).format('DD-MM-YYYY hh:mm:ss A')}</div>
      },
    ],
    []
  );

  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
        {loading ? (
         <CircularProgress disableShrink className={classes.spinner}/>
        ) : (
          <Grow in={true} mountOnEnter unmountOnExit>
            <div>
            <h3>Employees</h3>
              {response && response.length > 0 ? (
                <TableComponent
                  columns={columns}
                  data={response}
                  updateMyData={updateMyData}
                  skipReset={skipResetRef.current}
                  renderRowSubComponent={null}
                  renderActionButtons={null}
                />
              ) : (
                <div>No data </div>
              )}
            </div>
          </Grow>
        )}
      </Grid>
  );
}

export default Employees;
