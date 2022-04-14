import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Login() {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const logDetails = { email: email, password: password };
    try {
      loginCall(logDetails, dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        userCredentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      history.push("/thefreelancer");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xs" component="div">
        <Paper className={classes.paper} elevation={2}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" align="center" className={classes.input}>
            Sign-In
          </Typography>
          <form action="" className={classes.form} onSubmit={handleSubmit}>
            <TextField
              id="Email"
              required
              name="Email"
              fullWidth
              placeholder="Enter Email Address"
              variant="outlined"
              label="Email"
              className={classes.input}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              id="Password"
              type="password"
              label="Password"
              required
              name="Email"
              fullWidth
              placeholder="Enter Password"
              variant="outlined"
              className={classes.input}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              className={classes.input}
            >
              {isFetching ? "Loading" : "Sign In"}
            </Button>
          </form>
          <Link href="/sign-up" variant="body2">
            Don't have an account? Sign Up{" "}
          </Link>
        </Paper>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#787878",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    margin: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default Login;
