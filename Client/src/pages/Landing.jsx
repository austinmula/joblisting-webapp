import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
// import RecentPosts from "../components/RecentPosts";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f3f3f3",
    minHeight: "100vh",
  },
  main: {
    backgroundColor: theme.palette.primary.light,
  },
  box: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "80vh",
  },
  subheaders: {
    marginTop: theme.spacing(5),
  },
  contain: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
  },
}));

const Landing = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.main}>
      <Paper className={classes.main} elevation={4}>
        <Container maxWidth="lg">
          <AppBar user={user} />
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box className={classes.box} mb={8}>
                <Typography variant="h2" component="h1" color="textSecondary">
                  Explore Available Job Listings
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle1"
                  className={classes.subheaders}
                  color="textPrimary"
                >
                  The Freelancer provides a platform for perspective employees
                  to find jobs. All you need is an account and you can either
                  post as an employer, or view as an employee. Click on the
                  button below to get started today!
                </Typography>
                <div>
                  <Link
                    to={user ? "/thefreelancer" : "/sign-up"}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      className={classes.subheaders}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className={classes.box} mb={8}>
                <img className={classes.img} alt="complex" src="pic1.svg" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* <Paper elevation={4} className={classes.root}>
        <RecentPosts user={user} />
      </Paper> */}
    </div>
  );
};

export default Landing;
