import React, { useState } from "react";
import { Typography, Grid, Paper, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { JobForm } from "../components/JobForm";
import { grey, green } from "@material-ui/core/colors";
import AddIcon from "@material-ui/icons/Add";
import WorkIcon from "@material-ui/icons/Work";
import CancelIcon from "@material-ui/icons/Cancel";
import { Card, CardHeader, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    background: grey[100],
  },
  card: {
    marginTop: theme.spacing(1),
    background: grey[300],
  },
  avatar: {
    backgroundColor: green[700],
  },
  paperT: {
    background: green[300],
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(0),
    padding: theme.spacing(2),
    alignItems: "center",
    color: "white",
  },
  root: {
    marginTop: theme.spacing(3),
  },
}));

const AddJob = () => {
  const classes = useStyles();
  const [open, setopen] = useState(false);
  const handleClick = () => {
    setopen(!open);
  };
  return (
    <>
      {/* <Grid container spacing={2} className={classes.root}> */}
      {/* <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="subtitle1">
              Employees interested in job
            </Typography>
          </Paper>
          <Card elevation={4} className={classes.card}>
            <CardHeader
              title="Employee 1"
              avatar={
                <IconButton>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <WorkIcon />
                  </Avatar>
                </IconButton>
              }
            />
          </Card>
          <Card elevation={4} className={classes.card}>
            <CardHeader
              title="Employee 2"
              avatar={
                <IconButton>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <WorkIcon />
                  </Avatar>
                </IconButton>
              }
            />
          </Card>
          <Card elevation={4} className={classes.card}>
            <CardHeader
              title="Employee 3"
              avatar={
                <IconButton>
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <WorkIcon />
                  </Avatar>
                </IconButton>
              }
            />
          </Card>
        </Grid> */}
      {/* <Grid item xs={12} md={8}> */}
      <Paper className={classes.paperT} elevation={4}>
        <Typography variant="h6">Post a Job Listing</Typography>
        <IconButton onClick={handleClick}>
          {!open ? <AddIcon /> : <CancelIcon />}
        </IconButton>
      </Paper>
      {open && (
        <Paper className={classes.paper} elevation={4}>
          <JobForm />
        </Paper>
      )}
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default AddJob;
