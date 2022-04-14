import React, { useEffect, useState } from "react";
import axios from "axios";
import Stats from "../components/Admin/Stats";
import UserTable from "../components/Admin/UserTable";
import { Container } from "@material-ui/core";
import DataTable from "../components/DataTable";
import Title from "../components/Title";
import Graphs from "../components/Admin/Graphs";

const Admin = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isfetching, setIsfetching] = useState(true);

  useEffect(() => {
    //setIsfetching(true);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    const res = await axios.get("http://localhost:4000/api/posts/");
    setPosts(
      res.data.sort((a, b) => {
        return b.interestedEmployees.length - a.interestedEmployees.length;
      })
    );
    const resp = await axios.get("http://localhost:4000/api/users/");
    setUsers(
      resp.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })
    );
    setIsfetching(false);
  };

  const makeAdmin = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/users/${id}/edituser`,

        {
          userId: user._id,
        }
      );
      console.log(res);
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isAdmin: !user.isAdmin } : user
        )
      );
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
          isAdmin: user.isAdmin,
        },
      });
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
          isAdmin: user.isAdmin,
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

  const deleteUser = async (id) => {
    setUsers(users.filter((user) => user._id !== id));
    try {
      const res = await axios.delete(`http://localhost:4000/api/users/${id}`, {
        data: {
          userId: user._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Stats posts={posts} />
      <Title title="Graphs and Charts" />
      <Graphs posts={posts} users={users} isfetching={isfetching} />
      <Title title="Table Data" />
      <UserTable users={users} makeAdmin={makeAdmin} deleteUser={deleteUser} />

      <DataTable
        posts={posts}
        handleDelete={handleDelete}
        toggleCompleteStatus={toggleCompleteStatus}
      />
    </Container>
  );
};

export default Admin;
