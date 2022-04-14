import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: { marginTop: theme.spacing(2) },
  username: {
    marginRight: theme.spacing(2),
  },
}));

export default function LandingAppBar({ user }) {
  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);

  const handleLogOut = (user) => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h5" className={classes.title} noWrap>
            The Freelancer
          </Typography>

          {user && (
            <Typography variant="body2" className={classes.username} noWrap>
              {" "}
              {`${user.firstname} ${user.lastname}`}{" "}
            </Typography>
          )}

          {!user ? (
            <Link
              to="/sign-in"
              style={{ textDecoration: "none", color: "#333" }}
            >
              <Button color="inherit" className={classes.subheaders}>
                Login
              </Button>
            </Link>
          ) : (
            <Button
              className={classes.subheaders}
              color="secondary"
              variant="contained"
              onClick={handleLogOut}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar}></div>
    </div>
  );
}

{
  /* <Button
              color={user ? "secondary" : "inherit"}
              variant={user && "contained"}
              className={classes.subheaders}
            >
              {user ? "Logout" : "Login"}
            </Button> */
}
