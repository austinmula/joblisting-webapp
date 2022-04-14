import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Post from "../components/Post";
import axios from "axios";
import Masonry from "react-masonry-css";
import BasicTable from "../components/DataTable";

const EmployerPosts = ({ user }) => {
  const [posts, setPosts] = useState([]);
  // const [fetching, setfetching] = useState(false);

  useEffect(() => {
    fetchMyPosts();
  }, [user._id]);

  const fetchMyPosts = async () => {
    //setwaiting(true);
    try {
      const res = await axios.get(
        `http://localhost:4000/api/posts/myposts/${user._id}`
      );
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setPosts(posts.filter((post) => post._id !== id));
    try {
      const res = await axios.delete(`http://localhost:4000/api/posts/${id}`, {
        data: {
          userId: user._id,
        },
      });
      //setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleteStatus = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/posts/${id}/editpost`,

        {
          userId: user._id,
        }
      );
      console.log(res);
      setPosts(
        posts.map((post) =>
          post._id === id ? { ...post, isfullfilled: !post.isfullfilled } : post
        )
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
              <Post post={post} user={user} handleDelete={handleDelete} />
            </div>
          ))}
        </Masonry>
        <BasicTable
          posts={posts}
          toggleCompleteStatus={toggleCompleteStatus}
          handleDelete={handleDelete}
        />
      </Container>
    </div>
  );
};

export default EmployerPosts;
