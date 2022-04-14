export const handleDelete = async (id) => {
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

export const toggleCompleteStatus = async (id) => {
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
