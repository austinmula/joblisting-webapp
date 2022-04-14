import Search from "../components/Search";

import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Grid,
  CircularProgress,
  Container,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import Post from "../components/Post";
import { makeStyles } from "@material-ui/core/styles";

const EmployeeHome = ({ user }) => {
  useEffect(() => {
    fetchAll();
  }, []);

  const [posts, setPosts] = useState([]);
  const [waiting, setwaiting] = useState();
  const [query, setQuery] = useState("");
  const [visible, setvisible] = useState(3);

  const filteredposts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.location.toLowerCase().includes(query.toLowerCase())
    );
  });

  const fetchAll = async () => {
    setwaiting(true);
    try {
      const res = await axios.get("http://localhost:4000/api/posts/");
      setPosts(
        res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
      setwaiting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();

  const showmoreItems = () => {
    setvisible((prevValue) => prevValue + 3);
  };

  return (
    <Container>
      <Search query={query} onQueryChange={(myQuery) => setQuery(myQuery)} />

      <Typography
        variant="h3"
        component="h1"
        color="textSecondary"
        align="center"
      >
        Available Job-Listings
      </Typography>
      <Box
        mt={4}
        mb={4}
        display="flex"
        justifyContent="center"
        className={classes.inner}
      >
        {waiting ? (
          <CircularProgress color="secondary" />
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            {filteredposts.length > 0 ? (
              filteredposts.slice(0, visible).map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Post post={post} user={user} />
                </Grid>
              ))
            ) : (
              <Typography variant="subtitle1" color="error">
                No Jobs Found
              </Typography>
            )}
          </Grid>
        )}
      </Box>
      <div style={{ clear: "both" }}>
        <Button onClick={showmoreItems}>Show More</Button>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    // border: "1px solid black",
  },
  inner: {
    // border: "1px solid black",
  },
}));

export default EmployeeHome;
