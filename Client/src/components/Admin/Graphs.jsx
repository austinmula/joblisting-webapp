import React, { useEffect, useState } from "react";
import {
  CardActions,
  CircularProgress,
  Paper,
  Button,
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import {
  pink,
  purple,
  deepPurple,
  deepOrange,
  lightGreen,
  grey,
} from "@material-ui/core/colors";
import { Grid, Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const getTotalLikes = (arr) =>
  Object.values(
    arr.reduce((acc, { userId, interestedEmployees }) => {
      acc[userId] =
        userId in acc
          ? {
              _id: userId,
              totalLikes: acc[userId].totalLikes + interestedEmployees.length,
            }
          : { _id: userId, totalLikes: interestedEmployees.length };
      return acc;
    }, [])
  );

const Graphs = ({ posts, users, isfetching }) => {
  const [Labels, setLabels] = useState([]);
  const [interested, setInterested] = useState([]);
  const [sorted, setsorted] = useState([]);

  const [seclabel, setseclabel] = useState([]);
  const [secinterested, setsecinterested] = useState([]);

  useEffect(() => {
    if (!isfetching) {
      const Array = getTotalLikes(posts);
      Array.sort((a, b) => b.totalLikes - a.totalLikes);
      const op = Array.slice(0, 3).map((e, i) => {
        let temp = users.find((element) => element._id === e._id);
        if (temp.firstname) {
          e.firstname = temp.firstname;
        }
        return e;
      });
      console.log(op);
      setLabels(op.map((e) => e.firstname));
      setInterested(op.map((e) => e.totalLikes));

      setseclabel(posts.slice(0, 5).map((e) => e.title));
      setsecinterested(
        posts.slice(0, 5).map((e) => e.interestedEmployees.length)
      );
    }
  }, [isfetching]);

  const secondGraph = () => {
    setseclabel(posts.slice(0, 5).map((e) => e.title));
    setsecinterested(
      posts.slice(0, 5).map((e) => e.interestedEmployees.length)
    );
  };

  const state = {
    labels: Labels,
    datasets: [
      {
        label: "Top Employers",
        backgroundColor: [
          lightGreen[700],
          purple[500],
          deepPurple[800],
          deepOrange[800],
          pink[500],
        ],
        hoverBackgroundColor: [
          lightGreen[500],
          purple[800],
          deepPurple[500],
          deepOrange[500],
          pink[700],
        ],
        data: interested,
      },
    ],
  };

  const state2 = {
    labels: seclabel,
    datasets: [
      {
        label: "Top posts",
        backgroundColor: [
          deepPurple[800],
          deepOrange[800],
          lightGreen[900],
          purple[500],
          pink[500],
        ],
        hoverBackgroundColor: [
          deepPurple[500],
          deepOrange[500],
          lightGreen[500],
          purple[800],
          pink[700],
        ],
        data: secinterested,
      },
    ],
  };
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Card className={classes.card}>
              <CardHeader
                title="Top Employers"
                subheader={new Date().toDateString()}
              />
              {!isfetching ? (
                <CardContent className={classes.cardcontent}>
                  <Doughnut
                    data={state}
                    options={{
                      title: {
                        display: true,
                        text: "Employers with most popular jobs",
                        fontSize: 11,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </CardContent>
              ) : (
                <CircularProgress />
              )}
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Card className={classes.card}>
              <CardHeader
                title="Popular Jobs"
                subheader={new Date().toDateString()}
              />
              {!isfetching ? (
                <CardContent className={classes.cardcontent}>
                  <Bar
                    data={state2}
                    options={{
                      title: {
                        display: true,
                        text: "Total Intered employees",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </CardContent>
              ) : (
                <CircularProgress />
              )}
              <CardActions>
                <Button onClick={secondGraph}>Reload</Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardcontent: {
    padding: theme.spacing(2),
  },
  card: {
    background: grey[200],
  },
}));
export default Graphs;
