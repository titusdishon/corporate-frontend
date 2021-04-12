import React, { useMemo, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USERS_QUERY } from "../../../utils/graphql";
import { useTableStatus } from "../../../utils/tableHooks";
import { Grid, Grow, makeStyles } from "@material-ui/core";
import TableComponent from "../Tables";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import NewUser from "./NewUser";
import {tableStyles} from "../../../utils/styles";


function Users() {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  const [showModel, setShowModel] = useState(false);
  const { response, skipResetRef, updateMyData } = useTableStatus(
    data && data.getUsers
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "userName",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} userName`,
      },
      {
        Header: "Email",
        accessor: "email",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} email`,
      },
      {
        Header: "Is Active",
        accessor: "isActive",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} isActive`,
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} phoneNumber`,
      },
      {
        Header: " Created By",
        accessor: "createdBy",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} createdBy`,
      },
      {
        Header: "Date Created",
        accessor: "createdAt",
        aggregate: "count",
        Cell: ({ row }) => (
          <div>
            {moment.utc(row.original.createdAt).format("DD-MM-YYYY hh:mm:ss A")}
          </div>
        ),
      },
    ],
    []
  );

  const classes = tableStyles();
  return (
    <Grid container className={classes.container}>
      {loading ? (
        <CircularProgress disableShrink className={classes.spinner} />
      ) : (
        <Grow in={true} mountOnEnter unmountOnExit>
          <div style={{ width: "100%", justifyContent: "center" }}>
            <h3 className={classes.title}>System Users</h3>
            <Button
              className={classes.addButton}
              variant="contained"
              color="primary"
              href="#contained-buttons"
              onClick={() => setShowModel(!showModel)}
            >
              <AddIcon />
              New
            </Button>
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
      <Modal
        open={showModel}
        className={classes.modal}
        onClose={() => setShowModel(!showModel)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Grid className={classes.modalInner}>
          <Grid item xs={12} sm={12}>
            <NewUser setShowModel/>
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default Users;
