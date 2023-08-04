/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillImageFill, BsPlayBtnFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { IoLinkSharp, IoSendSharp } from "react-icons/io5";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "../../features/post/postApi";

const PostModal = ({
  createPost: createPostOpen,
  setCreatePost,
  addNewPost,
  editableData: editableDataPrev,
  setPost,
}) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const [editableData, setEditableData] = useState({});

  // clear editable data
  useEffect(() => {
    if (!createPostOpen) {
      setEditableData({});
    }
  }, [createPostOpen]);

  // set editable data
  useEffect(() => {
    if (editableDataPrev?._id) {
      setEditableData(editableDataPrev);
      const { content, thumbnail } = editableDataPrev || {};
      setContent(content);
      setImage(thumbnail);
    }
  }, [editableDataPrev]);

  // capture profile image funciton
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  // create new post
  const [createPost, { data, isLoading, isError }] = useCreatePostMutation();

  useEffect(() => {
    if (!isLoading && !isError && data?._id) {
      toast.success("Post created successfully");
      addNewPost(data);
      setCreatePost(false);
      setContent("");
      setImage("");
      setErrors({});
    }
  }, [data, isLoading, isError, setCreatePost]);

  // update post
  const [updatePost, { data: updatedPost, isUpdateLoading }] =
    useUpdatePostMutation();

  useEffect(() => {
    if (!isUpdateLoading && updatedPost?._id) {
      toast.success("Post updated successfully");
      setPost(updatedPost);
      setCreatePost(false);
    }
  }, [updatedPost, isUpdateLoading]);

  // submit hanlder
  const submitHanlder = (e) => {
    e.preventDefault();

    if (!content) {
      return setErrors({ content: "Post Description is required!!" });
    }

    if (editableData?._id) {
      // update post
      updatePost({
        id: editableData?._id,
        data: {
          content,
          thumbnail: image?.includes("/storage") ? null : image,
        },
      });
    } else {
      // create new post
      createPost({
        content,
        thumbnail: image,
      });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black/70 flex z-50 items-center justify-center transition-all duration-500 ${
        createPostOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setCreatePost(false)}
    >
      <div
        className="bg-secondary rounded-2xl p-5 w-full sm:w-[500px] shadow-md shadow-dark/10"
        onClick={(event) => event.stopPropagation()}
      >
        <h3>{editableData?._id ? "Edit Your Post" : "Create new post"}</h3>

        <form onSubmit={submitHanlder}>
          <textarea
            className="bg-white block w-full h-[200px] px-3 py-4 rounded-xl mt-4 outline-none focus:ring-1 shadow-md shadow-dark/10"
            placeholder="What's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {errors?.content && (
            <p className="text-red-500 mt-3">{errors?.content}</p>
          )}

          {image && (
            <div className="relative">
              <img
                src={
                  image?.includes("/storage")
                    ? process.env.REACT_APP_SERVER_URL + image
                    : image
                }
                alt="post"
                className="w-full mt-5 rounded-xl"
              />
              <div
                className="absolute top-5 right-5 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center cursor-pointer text-white"
                onClick={() => setImage("")}
              >
                <GrClose className="text-white" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-5 p-2 bg-white rounded-xl mt-5 shadow-md shadow-dark/10">
            <div className="ml-6">
              <IoLinkSharp className="text-xl cursor-pointer" />
            </div>
            <label htmlFor="image">
              <BsFillImageFill className="text-xl cursor-pointer" />
            </label>
            <input
              type="file"
              onChange={captureImage}
              id="image"
              className="hidden"
            />
            <BsPlayBtnFill className="text-xl cursor-pointer" />
            <span className="text-sm">{content?.length}/500</span>
            <button className="flex items-center gap-2 py-2 px-4 font-semibold bg-primary rounded-lg text-white">
              <IoSendSharp />
              <span>{editableData?._id ? "Update" : "Post"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
