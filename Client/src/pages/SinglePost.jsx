import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  CardHeader,
  Card,
  IconButton,
  Avatar,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useLocation } from "react-router";
import { green, grey, blueGrey } from "@material-ui/core/colors";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import Otherjobs from "../components/Otherjobs";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AuthContext } from "../context/AuthContext";
import Collapse from "@material-ui/core/Collapse";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: grey[300],
    // minHeight: "60vh",
  },
  paperSide: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100%",
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  text: {
    marginTop: theme.spacing(1),
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(1),
    color: blueGrey[500],
  },
  card: {
    marginBottom: theme.spacing(1),
    backgroundColor: grey[300],
  },
  avatar: {
    backgroundColor: green[700],
  },
}));

const SinglePost = () => {
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [postdata, setPostdata] = useState({});
  const [postedby, setpostedby] = useState({});
  const [isfetching, setisfetching] = useState(true);
  const [usersint, setusersint] = useState([]);
  const { user: currentuser } = useContext(AuthContext);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getPost();
  }, [path, postdata.userId]);

  const getPost = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/posts/${path}`);
      setPostdata(res.data);
    } catch (error) {
      console.log(error);
    }
    getPostedBy();
  };

  const getPostedBy = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/users/${postdata.userId}`
      );
      setpostedby(res.data);
    } catch (error) {
      console.log(error);
    }
    getUserInterested();
    //setisfetching(false);
  };

  const getUserInterested = async () => {
    try {
      var responsearray = [];
      await Promise.all(
        postdata.interestedEmployees.map(async (element) => {
          let res = await axios.get(
            `http://localhost:4000/api/users/${element}`
          );
          responsearray.push(res.data);
          console.log(res.data);
        })
      );

      setusersint(responsearray);
      setTimeout(() => {
        setisfetching(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper className={classes.paper} elevation={0}>
              <Box>
                <Typography
                  color="primary"
                  variant="h4"
                  fontWeight="fontWeightLight"
                >
                  {postdata.title}
                </Typography>
              </Box>
              <div className={classes.text}>
                <PersonIcon className={classes.icon} />
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                >{`Posted By: ${postedby.firstname} ${postedby.lastname}`}</Typography>
              </div>
              <div className={classes.text}>
                <LocationOnIcon className={classes.icon} />
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                >{`${postdata.location}`}</Typography>
              </div>
              <div className={classes.text}>
                <QueryBuilderIcon className={classes.icon} />
                <Typography variant="body1" color="textSecondary">
                  {`Posted on : ${new Date(
                    postdata.date
                  ).toDateString()}, Deadline :  ${new Date(
                    postdata.deadline
                  ).toDateString()}`}
                </Typography>
              </div>
            </Paper>
            <Paper className={classes.paper}>
              <Typography variant="h5" className={classes.title}>
                Job Summary
              </Typography>

              <Typography variant="body1" paragraph>
                {postdata.summary}
              </Typography>

              <Typography variant="h5" className={classes.title}>
                Job Description
              </Typography>
              <Typography variant="body1" paragraph>
                {postdata.description}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper className={classes.paperSide}>
              <Typography variant="body1">
                {currentuser.usertype === "employee"
                  ? "Other jobs by this Employer"
                  : "Interested Employees"}
              </Typography>
            </Paper>
            <Grid container direction="row" spacing={1}>
              {currentuser.usertype === "employee" && (
                <Grid item xs={12} sm={12}>
                  <Otherjobs userId={postdata.userId} />
                </Grid>
              )}
              {currentuser.usertype === "employer" && (
                <Grid item xs={12} sm={12}>
                  {/* {!isfetching && console.log(usersint)} */}
                  {!isfetching &&
                    usersint.map((element) => (
                      <div key={element._id}>
                        <Card className={classes.card}>
                          <CardHeader
                            title={`${element.firstname} ${element.lastname}`}
                            avatar={
                              <IconButton>
                                <Avatar className={classes.avatar}>
                                  <PersonIcon />
                                </Avatar>
                              </IconButton>
                            }
                            action={
                              <IconButton
                                className={clsx(classes.expand, {
                                  [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                              >
                                <ExpandMoreIcon />
                              </IconButton>
                            }
                          ></CardHeader>
                          <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                              <div className={classes.text}>
                                <EmailIcon className={classes.icon} />
                                <Typography variant="body2">
                                  {element.email}
                                </Typography>
                              </div>
                              <div className={classes.text}>
                                <PhoneIcon className={classes.icon} />
                                <Typography variant="body2">
                                  {element.telnum}
                                </Typography>
                              </div>
                              <Typography variant="body2">
                                {element.profilebio}
                              </Typography>
                            </CardContent>
                          </Collapse>
                        </Card>
                      </div>
                    ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SinglePost;
