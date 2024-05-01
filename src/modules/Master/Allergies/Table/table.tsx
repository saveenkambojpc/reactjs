import * as React from "react";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import MuiTableRow from "@mui/material/TableRow";
import {
  ReuseableTableHead,
  TableNoData,
} from "../../../../components/core-ui/table";
import {
  Order,
  applyFilter,
  createHeadCell,
} from "../../../../components/core-ui/table/utils";
import { TableRow, TableToolbar } from "./fragments";
import { Card } from "@mui/material";

type TableProps = {
  rows: any;
  filterByUserId?: string;
};

export default function Table({ rows, filterByUserId }: TableProps) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string | number>("calories");
  const [selected, setSelected] = React.useState<readonly (string | number)[]>(
    []
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const filterNameState = React.useState<string>("");

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: string | number
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n: { id: any }) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    _event: React.MouseEvent<unknown>,
    id: number | string
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number | string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),
  //   [order, orderBy, page, rowsPerPage, rows]
  // );

  // const visibleRows = rows;

  const visibleRows = applyFilter(
    rows,
    // getComparator(order, orderBy),
    filterNameState[0],
    filterByUserId
  );

  const notFound = !visibleRows.length && !!filterNameState[0];


  return (
    <Card sx={{ width: "100%", mb: 2 }}>
      <TableToolbar numSelected={selected.length} filter={filterNameState} />
      <TableContainer>
        <MuiTable aria-labelledby="tableTitle" size="small">
          <ReuseableTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            headCells={[
              createHeadCell("name", "Name", false, true),
              createHeadCell("percent", "Percent", false, true),
              createHeadCell("treatment", "Treatment", false, true),
              createHeadCell("diagnose", "Diagnose", false, true),
              createHeadCell("created_at", "Created at", false, true),
              createHeadCell("", "", false, true),
            ]}
          />
          <TableBody>
            {visibleRows.map((row: any, index: number) => {
              return (
                <TableRow
                  key={index}
                  handleClick={handleClick}
                  isSelected={isSelected}
                  row={row}
                  index={index}
                />
              );
            })}
            {emptyRows > 0 && (
              <MuiTableRow
                style={{
                  height: 33 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </MuiTableRow>
            )}

            {notFound && <TableNoData query={filterNameState[0]} />}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}
