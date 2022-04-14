import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    background: theme.palette.primary.dark,
  },
  text: {
    color: grey[50],
  },
}));

const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography className={classes.text} variant="h4" align="center">
        {title}
      </Typography>
    </Paper>
  );
};

export default Title;
