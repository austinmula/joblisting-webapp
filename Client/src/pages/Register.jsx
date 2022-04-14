import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { TextField, Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import React, { useState, useRef } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Register() {
  const [usertype, setValue] = useState("employee");
  const firstname = useRef();
  const lastname = useRef();
  const email = useRef();
  const password = useRef();
  const history = useHistory();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Newuser = {
      firstname: firstname.current.value,
      lastname: lastname.current.value,
      usertype,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register/",
        Newuser
      );
      alert(res.data.firstname + " registered Successfully!");
      history.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="xs" component="div">
        <Paper className={classes.paper} elevation={2}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" align="center" className={classes.input}>
            Sign-Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstname"
                  type="text"
                  required
                  name="firstname"
                  fullWidth
                  placeholder="Enter Firstname"
                  variant="outlined"
                  label="Firstname"
                  className={classes.input}
                  inputRef={firstname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastname"
                  type="text"
                  required
                  name="lastname"
                  fullWidth
                  placeholder="Enter Lastname"
                  variant="outlined"
                  label="Lastname"
                  className={classes.input}
                  inputRef={lastname}
                />
              </Grid>
            </Grid>
            <TextField
              id="Email"
              type="email"
              required
              name="Email"
              fullWidth
              placeholder="Enter Email Address"
              variant="outlined"
              label="Email"
              className={classes.input}
              inputRef={email}
            />
            <TextField
              id="Password"
              type="password"
              label="Password"
              required
              name="Email"
              fullWidth
              placeholder="Choose a Password"
              variant="outlined"
              className={classes.input}
              inputRef={password}
            />

            <FormControl component="fieldset">
              <FormLabel component="legend">Register as an </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={usertype}
                onChange={handleChange}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="employee"
                      control={<Radio />}
                      label="Employee"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      value="employer"
                      control={<Radio />}
                      label="Employer"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              className={classes.input}
            >
              Sign Up
            </Button>
          </form>
          <Link href="/sign-in" variant="body2">
            Already have an account? Sign In{" "}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#787878",
  },
  paper: {
    flexDirection: "column",
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    margin: theme.spacing(2),
  },
  input: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default Register;
