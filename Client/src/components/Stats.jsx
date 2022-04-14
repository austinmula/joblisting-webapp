import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import Typography from "@material-ui/core/Typography";
import { red, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "right",
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
    color: deepPurple[700],
  },
  iconD: { color: red[800] },
  details: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Stats({ posts }) {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {/* //xs={12} md={6} lg={4} */}
        <Card className={classes.root} elevation={4}>
          <CardContent className={classes.cardcontent}>
            <AssignmentIcon
              fontSize="large"
              className={classes.icon}
            ></AssignmentIcon>
            <div className={classes.details}>
              <Typography
                color="textPrimary"
                variant="h4"
                component="h2"
                gutterBottom
              >
                All Jobs
              </Typography>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h4"
                component="h2"
                gutterBottom
              >
                {posts.length}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.root} elevation={4}>
          <CardContent>
            <AssignmentTurnedInIcon
              fontSize="large"
              className={classes.icon}
            ></AssignmentTurnedInIcon>
            <div className={classes.details}>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h4"
                component="h2"
                gutterBottom
                noWrap
              >
                Completed Jobs
              </Typography>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h4"
                component="h2"
                gutterBottom
              >
                {
                  posts.filter((x, i) => {
                    return x.isfullfilled;
                  }).length
                }
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.root} elevation={4}>
          <CardContent>
            <AssignmentLateIcon
              fontSize="large"
              className={classes.iconD}
            ></AssignmentLateIcon>
            <div className={classes.details}>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h4"
                component="h2"
                gutterBottom
                align="left"
              >
                Pending Jobs
              </Typography>
              <Typography
                className={classes.title}
                color="textPrimary"
                variant="h4"
                component="h2"
                gutterBottom
                align="left"
              >
                {
                  posts.filter((x, i) => {
                    return !x.isfullfilled;
                  }).length
                }
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Stats;
