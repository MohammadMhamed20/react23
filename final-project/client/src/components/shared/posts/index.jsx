import React from "react";
import Post from "./Post";

const Posts = ({ posts, deletePost }) => {
  return (
    <div className="flex flex-col gap-3 pb-8">
      {posts?.map((post) => (
        <Post key={post?._id} post={post} deletePost={deletePost} />
      ))}
    </div>
  );
};

export default Posts;
