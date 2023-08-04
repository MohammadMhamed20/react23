/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProfileInfo from "../components/profile/ProfileInfo";
import Tabs from "../components/profile/Tabs";
import Posts from "../components/shared/posts";
import {
  useDeletePostMutation,
  useGetPostsByUserIdQuery,
} from "../features/post/postApi";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [posts, setPosts] = useState([]);

  // get all posts
  const { data, isLoading } = useGetPostsByUserIdQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setPosts(data);
    }
  }, [data]);

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
    <main>
      <ProfileInfo />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="mt-5">
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
    </main>
  );
};

export default Profile;
