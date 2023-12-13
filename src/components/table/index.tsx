import {FunctionComponent, useState} from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {IColumns, IRow} from "../../interfaces/table";

interface ITableComponent {
    columns: IColumns[];
    rows: IRow[];
    pagination: boolean;
    width: string;
}

export const TableComponent: FunctionComponent<ITableComponent> = ({
                                                                       columns,
                                                                       rows,
                                                                       pagination,
                                                                       width
                                                                   }: ITableComponent) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{width: width, overflow: "hidden"}}>
            <TableContainer
                sx={{maxHeight: 440, maxWidth: "100%"}}
                className="scrollbar"
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        width: column.width,
                                        textAlign: "center",
                                        fontWeight: "600",
                                        padding: "8px 8px",
                                        fontSize: "14px"
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row.index}
                                    sx={{height: "8px", border: "1px solid red", lineHeight: "1"}}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={`${row.index}-${column.id}`}
                                                sx={{
                                                    textAlign: "center",
                                                    padding: "8px 8px",
                                                    fontSize: "14px",
                                                    fontWeight: "200"
                                                }}
                                            >
                                                {column.format && typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination &&
                <TablePagination
                    sx={{height: "45px", overflow: "hidden"}}
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}

        </Paper>
    );
}