/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../../features/post/postApi";
import Posts from "../../shared/posts";
import CreatePost from "../CreatePost";

const Trending = () => {
  const [createPost, setCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);

  // get all posts
  const { data, isLoading } = useGetPostsQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setPosts(data);
    }
  }, [data]);

  // get new created post
  const addNewPost = (post) => {
    setPosts([post, ...posts]);
  };

  // delete post
  const [deletePost, { data: deletedPost, isLoading: isDeleteLoading }] =
    useDeletePostMutation();

  useEffect(() => {
    if (!isDeleteLoading && deletedPost?._id) {
      const allPosts = posts?.filter((post) => post?._id !== deletedPost?._id);

      setPosts(allPosts);
      toast.success("Post deleted successfully");
    }
  }, [isDeleteLoading, deletedPost]);

  return (
    <div>
      <CreatePost
        addNewPost={addNewPost}
        createPost={createPost}
        setCreatePost={setCreatePost}
      />
      <div className="mt-7">
        {isLoading ? (
          <img
            src="/images/loading.gif"
            className="w-10 mx-auto"
            alt="loading"
          />
        ) : posts?.length === 0 ? (
          <p className="text-center">No Post Found!!</p>
        ) : (
          <Posts posts={posts} deletePost={deletePost} />
        )}
      </div>
    </div>
  );
};

export default Trending;
