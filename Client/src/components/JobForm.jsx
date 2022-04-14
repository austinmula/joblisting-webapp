import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  layout: {
    paddingBotton: theme.spacing(0),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: {
    marginTop: theme.spacing(3),
  },
}));

export const JobForm = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [description, setdescription] = useState("");
  const [location, setlocation] = useState("");
  const [deadline, setdeadline] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      title: title,
      summary: summary,
      description: description,
      location: location,
      deadline: deadline,
    };

    try {
      //console.log(newPost)
      const res = await axios.post("http://localhost:4000/api/posts/", newPost);
      alert(res.data.title + " Posted Successfully");

      history.push("/thefreelancer/posts");
      settitle("");
      setsummary("");
      setdescription("");
      setlocation("");
      setdeadline("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        action=""
        autoComplete="off"
        onSubmit={handleSubmit}
        className={classes.form}
      >
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <TextField
              required
              id="jobtitle"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              name="title"
              label="Job Title"
              fullWidth
              color="secondary"
              variant="outlined"
              placeholder="Enter the Title of the job"
            />
          </Grid>

          <Grid item sm={12}>
            <TextField
              required
              name="summary"
              value={summary}
              onChange={(e) => setsummary(e.target.value)}
              id="jobsummary"
              label="Job Summary"
              fullWidth
              color="secondary"
              variant="outlined"
              placeholder="Give a brief summary description of the job"
              multiline
              rows={3}
            />
          </Grid>

          <Grid item sm={12}>
            <TextField
              required
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              id="job-description"
              label="Job Description"
              fullWidth
              color="secondary"
              variant="outlined"
              placeholder="Give a detailed description of the job, add requirements if any apply"
              multiline
              rows={8}
            />
          </Grid>

          <Grid item sm={12}>
            <TextField
              required
              id="location"
              name="location"
              value={location}
              onChange={(e) => setlocation(e.target.value)}
              label="Job Location"
              fullWidth
              color="secondary"
              variant="outlined"
              placeholder="Where are the services required"
            />
          </Grid>

          <Grid item xs={12} sm={4} className={classes.layout}>
            <Typography variant="body1" color="textSecondary">
              Deadline for Fulfilment
            </Typography>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              name="deadline"
              type="date"
              variant="outlined"
              value={deadline}
              onChange={(e) => setdeadline(e.target.value)}
              fullWidth
              color="secondary"
            />
          </Grid>

          <Grid item sm={12} className={classes.btn}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
            >
              Post Job
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
