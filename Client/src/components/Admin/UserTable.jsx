import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { red, grey } from "@material-ui/core/colors";
import TablePagination from "@material-ui/core/TablePagination";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  icon: {
    color: red[700],
  },
  text: {
    marginRight: theme.spacing(5),
    color: grey[700],
  },
}));

export default function UserTable({ users, makeAdmin, deleteUser }) {
  const classes = useStyles(users);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Typography
        variant="h4"
        align="right"
        gutterBottom
        className={classes.text}
      >
        Users Table
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User_ID</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Usertype</TableCell>
            <TableCell align="center">CreatedAt</TableCell>
            <TableCell align="right">Make Admin</TableCell>

            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell align="right">{`${user.firstname} ${user.lastname}`}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.usertype}</TableCell>
                <TableCell align="center">
                  {new Date(user.date).toDateString()}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant={user.isAdmin ? "contained" : "text"}
                    onClick={() => makeAdmin(user._id)}
                    color={user.isAdmin ? "secondary" : "primary"}
                  >
                    {" "}
                    {user.isAdmin ? "Admin" : "User"}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => deleteUser(user._id)}>
                    <DeleteIcon className={classes.icon} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
