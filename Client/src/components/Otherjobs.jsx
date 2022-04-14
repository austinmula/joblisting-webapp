import React, { useEffect, useState } from "react";
import { CardHeader, Card, CircularProgress, Grid } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Avatar } from "@material-ui/core";
import { grey, green } from "@material-ui/core/colors";
import WorkIcon from "@material-ui/icons/Work";
import { format } from "timeago.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    backgroundColor: grey[300],
  },
  avatar: {
    backgroundColor: green[700],
  },
});

const Otherjobs = ({ userId }) => {
  const [waiting, setwaiting] = useState();

  useEffect(() => {
    setTimeout(() => {
      setwaiting(false);
    }, 1000);
    fetchMyPosts();
  }, [userId]);

  const [posts, setPosts] = useState([]);
  const classes = useStyles();

  const fetchMyPosts = async () => {
    setwaiting(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/posts/myposts/${userId}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {waiting ? (
        <CircularProgress />
      ) : posts.length === 0 ? (
        "This employer has no other posts"
      ) : (
        posts.map((post) => (
          <Grid key={post._id} item lg={12}>
            <Card elevation={3} className={classes.root}>
              <CardHeader
                title={post.title}
                subheader={format(post.date)}
                avatar={
                  <IconButton href={`/thefreelancer/post/${post._id}`}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <WorkIcon />
                    </Avatar>
                  </IconButton>
                }
              ></CardHeader>
            </Card>
          </Grid>
        ))
      )}
    </>
  );
};

export default Otherjobs;
