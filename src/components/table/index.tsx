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
import "./table.css"
import {isAfter, isBefore, parse} from "date-fns";

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
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedRows = () => {
        if (orderBy === '') return rows;

        return rows.slice().sort((a: IRow, b: IRow) => {
                let comparison = 0;
                let valueA = a[orderBy];
                let valueB = b[orderBy];

                if (typeof valueA === 'object' && typeof valueB === 'object') {
                    valueA = valueA.props.label;
                    valueB = valueB.props.label;
                }

                if (typeof valueA === "string" && typeof valueB === "string") {

                    if (validateDate(valueA) && validateDate(valueB)) {
                        const dateA = parse(valueA, 'dd/MM/yyyy', new Date());
                        const dateB = parse(valueB, 'dd/MM/yyyy', new Date());

                        if (dateA && dateB) {
                            if (order === 'asc') {
                                comparison = isBefore(dateA, dateB) ? -1 : 1;
                            } else {
                                comparison = isAfter(dateA, dateB) ? 1 : -1;
                            }
                        }

                    } else if ((valueA.includes("R$") && valueB.includes("R$")) || (valueA.includes("US$") && valueB.includes("US$")) || (valueA.includes("€") && valueB.includes("€"))) {
                        const numericValueA = extractNumericValue(valueA);
                        const numericValueB = extractNumericValue(valueB);


                        if (order === 'asc') {
                            return numericValueA > numericValueB ? 1 : -1;
                        } else {
                            return numericValueA > numericValueB ? -1 : 1;
                        }

                    } else {
                        if (order === 'asc') {
                            return valueA.localeCompare(valueB);
                        } else {
                            return valueB.localeCompare(valueA);
                        }
                    }


                }

                if (typeof valueA === "number" && typeof valueB === "number") {
                    if (valueA > valueB) {
                        comparison = 1;
                    } else if (valueA < valueB) {
                        comparison = -1;
                    }
                }

                return order === 'asc' ? comparison : -comparison;
            }
        )
            ;
    };

    function validateDate(input) {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        return datePattern.test(input);
    }

    function extractNumericValue(value) {
        const numericPart = value.match(/[0-9.,]+/);
        const numericValue = numericPart ? numericPart[0].replace(/[.,]/g, '') : NaN;
        return parseFloat(numericValue);
    }


    return (
        <Paper sx={{width: width, maxWidth: "100%", marginBottom:"18px"}}>
            <TableContainer sx={{overflowX: "auto"}} className="scrollbar">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        textAlign: "center",
                                        fontWeight: "600",
                                        padding: "8px 8px",
                                        fontSize: "14px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => handleRequestSort(column.id)}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedRows().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={rowIndex}
                                    sx={{lineHeight: "1"}}
                                >
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell
                                                key={`${rowIndex}-${column.id}`}
                                                sx={{
                                                    textAlign: "center",
                                                    padding: "8px 8px",
                                                    fontSize: "14px",
                                                    fontWeight: "200"
                                                }}
                                            >
                                                {column.format && typeof value === "number" ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {pagination && (
                <TablePagination
                    sx={{height: "45px", overflow: "hidden"}}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
};