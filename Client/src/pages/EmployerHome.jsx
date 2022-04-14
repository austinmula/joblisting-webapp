import { Container, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddJob from "../components/AddJob";
import Stats from "../components/Stats";

const EmployerHome = ({ user }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, [user._id]);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/posts/myposts/${user._id}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stats posts={posts} />
        </Grid>
        <Grid item xs={12} md={8}>
          <AddJob />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmployerHome;
