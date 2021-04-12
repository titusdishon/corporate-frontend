import React, { Fragment } from "react";
import {
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { matchSorter } from "match-sorter";
import moment from "moment";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import MaUTable from "@material-ui/core/Table";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData,
  editable,
}) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    updateMyData(index, id, value);
  };
  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  if (!editable) {
    return `${initialValue}`;
  }
  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  return (
    <div>
      <TextField
        size={"small"}
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        variant="outlined"
        placeholder={`Search ${count} records`}
      />
    </div>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Be sure to pass our updateMyData and the skipReset option
const TableComponent = ({
  columns,
  data,
  updateMyData,
  skipReset,
  renderRowSubComponent,
  renderActionButtons,
}) => {
  const formats = [moment.ISO_8601, "MM/DD/YYYY  :)  HH*mm*ss"];
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text(rows, id, filterValue) {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({ Filter: DefaultColumnFilter, Cell: EditableCell }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    visibleColumns,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      updateMyData,
      autoResetPage: !skipReset,
      autoResetSelectedRows: !skipReset,
      disableMultiSort: true,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (renderActionButtons !== null) {
        hooks.visibleColumns.push((cols) => {
          return [
            ...cols,
            {
              id: "buttons",
              Cell: ({ row }) => (
                <div style={{ minWidth: "120px", padding: "0" }}>
                  {renderActionButtons({ row })}
                </div>
              ),
            },
          ];
        });
      }
    }
  );
  return (
    <Paper className="container">
      <Table>
        <MaUTable {...getTableProps()}>
          <TableHead className={"table-header"}>
            {headerGroups.map((headerGroup, ky1) => (
              <TableRow key={ky1} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, clKy) => (
                  <TableCell key={clKy} {...column.getHeaderProps()}>
                    <Button size={"small"} {...column.getSortByToggleProps()}>
                      {column.canGroupBy ? <FilterListIcon /> : null}
                      {column.Header !== null
                        ? column.render("Header")
                        : column.render("id")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )
                      ) : (
                        ""
                      )}
                    </Button>
                    {/* Render the columns filter UI */}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key1) => {
              prepareRow(row);
              return (
                <Fragment key={key1}>
                  <TableRow {...row.getRowProps()} className="p-0 m-0">
                    {row.cells.map((cell, key2) => {
                      return (
                        <TableCell
                          key={key2}
                          {...cell.getCellProps()}
                          className="pt-0 pb-0 pl-1"
                        >
                          {cell.isPlaceholder ? null : (
                            <>
                              {typeof cell.value === "boolean" ? (
                                <span>
                                  {cell.value && true && true ? (
                                    <span className="text-success">
                                      {cell.render("Cell", { editable: false })}
                                    </span>
                                  ) : (
                                    <span className="text-danger">N/A</span>
                                  )}
                                </span>
                              ) : (
                                <span>
                                  {moment(
                                    cell.value,
                                    formats,
                                    true
                                  ).isValid() ? (
                                    <span>
                                      {" "}
                                      <span>
                                        {moment
                                          .utc(cell.value)
                                          .format("DD-MM-YYYY")}
                                      </span>
                                      <span className="text-success pl-2">
                                        {moment
                                          .utc(cell.value)
                                          .format("hh:mm:ss A")}
                                      </span>
                                    </span>
                                  ) : (
                                    <span>
                                      {cell.column.id === "expander" ||
                                      cell.column.id === "buttons" ||
                                      (cell.value !== undefined &&
                                        cell.value !== null) ? (
                                        cell.render("Cell", { editable: false })
                                      ) : (
                                        <span className="text-danger">N/A</span>
                                      )}
                                    </span>
                                  )}
                                </span>
                              )}
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.isExpanded && renderRowSubComponent !== null ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </TableBody>
        </MaUTable>
        <div className={"Footer"}>
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </Button>{" "}
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </Button>{" "}
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </Button>{" "}
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>{" "}
          <span className="pt-1">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          | Go to page:{" "}
          <TextField
            size={"small"}
            type="number"
            defaultValue={pageIndex + 1}
            variant="outlined"
            onChange={(e) => {
              const pg = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pg);
            }}
          />{" "}
          <TextField
            select
            size={"small"}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            SelectProps={{ native: true }}
            variant="outlined"
          >
            {[10, 20, 30, 40, 50, 75, 100].map((pgeSize) => (
              <option key={pgeSize} value={pgeSize}>
                Show {pgeSize}
              </option>
            ))}
          </TextField>
        </div>
      </Table>
    </Paper>
  );
};

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export default TableComponent;
