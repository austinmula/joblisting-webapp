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
import { IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { red, grey } from "@material-ui/core/colors";
import TablePagination from "@material-ui/core/TablePagination";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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

export default function BasicTable({
  posts,
  toggleCompleteStatus,
  handleDelete,
}) {
  const classes = useStyles();
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
    rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Typography
        variant="h4"
        align="right"
        gutterBottom
        className={classes.text}
      >
        Job Listing Table
      </Typography>
      <Divider orientation="vertical" />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Job_ID</TableCell>
            <TableCell align="center">Job_Title</TableCell>
            <TableCell align="right">Is Completed</TableCell>
            <TableCell align="right">Posted At</TableCell>
            <TableCell align="right">Interested Employees</TableCell>
            <TableCell align="right">Mark Completed</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post) => (
              <TableRow key={post._id}>
                <TableCell component="th" scope="row">
                  {post._id}
                </TableCell>
                <TableCell align="left">{post.title}</TableCell>
                <TableCell align="center">
                  {post.isfullfilled ? "True" : "False"}
                </TableCell>
                <TableCell align="right">
                  {new Date(post.date).toDateString()}
                </TableCell>
                <TableCell align="center">
                  {post.interestedEmployees.length}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => toggleCompleteStatus(post._id)}
                  >
                    {" "}
                    {post.isfullfilled ? "Unmark" : "Mark"}
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(post._id)}>
                    <DeleteIcon className={classes.icon} />
                  </IconButton>
                  {/* <Button
                    variant="contained"
                    onClick={() => toggleCompleteStatus(post._id)}
                  >
                    {" "}
                    {post.isfullfilled ? "Unmark" : "Mark"}
                  </Button> */}
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
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
