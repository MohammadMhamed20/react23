import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import PostModal from "./PostModal";

const CreatePost = ({ createPost, setCreatePost, addNewPost }) => {
  return (
    <>
      <div
        className="py-4 px-3 rounded-2xl shadow-md shadow-dark/10 bg-white flex items-center justify-between cursor-pointer"
        onClick={() => setCreatePost(true)}
      >
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-primary text-xl font-bold" />
          <input
            className="block outline-none bg-transparent"
            placeholder="What's on your mind?"
            type="text"
          />
        </div>
        <AiFillPlusCircle className="text-primary text-2xl font-bold" />
      </div>
      <PostModal
        createPost={createPost}
        setCreatePost={setCreatePost}
        addNewPost={addNewPost}
      />
    </>
  );
};

export default CreatePost;
