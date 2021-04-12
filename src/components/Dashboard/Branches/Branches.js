import React, { useMemo,useState} from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_BRANCHES_QUERY } from "../../../utils/graphql";
import { useTableStatus } from "../../../utils/tableHooks";
import { Grid, Grow, makeStyles } from "@material-ui/core";
import TableComponent from "../Tables";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from "moment";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Modal from "@material-ui/core/Modal";
import NewBranch from "./NewBranch";
import {tableStyles} from "../../../utils/styles";

function Branches() {
  const [showModel, setShowModel] = useState(false);
  const { loading, data } = useQuery(FETCH_BRANCHES_QUERY);
  const { response, skipResetRef, updateMyData } = useTableStatus(
    data && data.branches
  );
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "branchName",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} branchName`,
      },
      {
        Header: "No Of Employees",
        accessor: "numberOfEmployees",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} numberOfEmployees`,
      },
      {
        Header: "Date Of Activation",
        accessor: "dateOfActivation",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} dateOfActivation`,
      },
      {
        Header: "Phone Number",
        accessor: "phoneNumber",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} phoneNumber`,
      },
      {
        Header: "Street",
        accessor: "street",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} street`,
      },
      {
        Header: "Corporate Code",
        accessor: "corporateCode",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} corporateCode`,
      },
      {
        Header: " Created By",
        accessor: "createdBy",
        aggregate: "count",
        Aggregated: ({ value }) => `${value} createdBy`,
      },
      {
        Header: "Date Created",
        accessor: "dateCreated",
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
            <h3 className={classes.title}>Branches</h3>
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
            <NewBranch setShowModel={setShowModel} />
          </Grid>
        </Grid>
      </Modal>
    </Grid>
  );
}

export default Branches;
