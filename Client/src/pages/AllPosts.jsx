import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Post from "../components/Post";
import axios from "axios";
import Masonry from "react-masonry-css";

const AllPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [fetching, setfetching] = useState(false);

  useEffect(() => {
    FetchAllPosts();
  }, []);

  const FetchAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/posts/");
      setPosts(
        res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div>
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} user={user} />
            </div>
          ))}
        </Masonry>
      </Container>
    </div>
  );
};

export default AllPosts;
