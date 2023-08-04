/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineShareAlt, AiTwotoneLike } from "react-icons/ai";
import {
  BiComment,
  BiDotsVerticalRounded,
  BiLike,
  BiSolidPencil,
} from "react-icons/bi";
import { CiRepeat } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { HiShare } from "react-icons/hi2";
import { ImEmbed } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import {
  useCreateCommentMutation,
  useLikeUnlikeMutation,
} from "../../../features/post/postApi";
import PostModal from "../../home/PostModal";

const Post = ({ post: postData, deletePost }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [post, setPost] = useState({});

  const [liked, setLiked] = useState([]);

  // set post
  useEffect(() => {
    if (postData?._id) {
      setPost(postData);
    }
  }, [postData]);

  // get user
  const { user: userData } = useSelector((state) => state?.auth || {});

  const {
    _id,
    content,
    thumbnail,
    user,
    createdAt,
    comments: commentsData,
    liked: likedData,
  } = post || {};
  const { _id: userId, profilePic, firstName, lastName } = user || {};

  const [createComment, { data: newComment, isLoading }] =
    useCreateCommentMutation();

  useEffect(() => {
    if (commentsData?.length > 0) {
      setComments(commentsData);
    }

    if (likedData?.length > 0) {
      setLiked(likedData);
    }
  }, [commentsData, likedData]);

  useEffect(() => {
    if (!isLoading && newComment?.createdAt) {
      setCommentText("");
      setComments([newComment, ...commentsData]);
    }
  }, [newComment, isLoading]);

  // submitComment
  const submitComment = (e) => {
    e.preventDefault();

    if (!commentText) return;

    createComment({ data: { comment: commentText }, id: _id });
  };

  // like and unlike
  const [likeUnlike, { data: newLiked, isLikeLoading }] =
    useLikeUnlikeMutation();

  useEffect(() => {
    if (!isLikeLoading && newLiked) {
      setLiked(newLiked);
    }
  }, [newLiked, isLikeLoading]);

  return (
    <>
      <div className="shadow-md shadow-dark/10 bg-white py-4 px-[14px] rounded-2xl flex gap-4 relative">
        <div
          className={`absolute ${
            showMenu ? "block" : "hidden"
          } top-12 right-4 p-2 bg-white border rounded-xl w-[220px] z-50`}
        >
          <li
            className="px-2 py-1 rounded-md transition-all hover:bg-secondary flex items-center gap-2 cursor-pointer text-sm"
            onClick={() => {
              setEditPost(true);
              setShowMenu(false);
            }}
          >
            <BiSolidPencil />
            <span>Edit</span>
          </li>
          <li
            className="px-2 py-1 rounded-md transition-all hover:bg-secondary flex items-center gap-2 cursor-pointer text-sm"
            onClick={() => deletePost(_id)}
          >
            <AiFillDelete />
            <span>Delete</span>
          </li>
          <li className="px-2 py-1 rounded-md transition-all hover:bg-secondary flex items-center gap-2 cursor-pointer text-sm">
            <ImEmbed />
            <span>Embed Post</span>
          </li>
          <li className="px-2 py-1 rounded-md transition-all hover:bg-secondary flex items-center gap-2 cursor-pointer text-sm">
            <AiOutlineShareAlt />
            <span>Share via another apps</span>
          </li>
        </div>
        <img
          className="w-12 h-12 rounded-full"
          src={
            profilePic
              ? `${process.env.REACT_APP_SERVER_URL}${profilePic}`
              : "/images/users/2.jpg"
          }
          alt="user"
        />
        <div className="sm:w-full w-[75%]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm">{`${firstName} ${lastName}`}</h3>
              <div className="w-[16px] h-[16px] rounded-full bg-primary flex items-center justify-center">
                <TiTick className="text-white text-xs" />
              </div>
              <span className="text-xs">
                @{`${firstName?.toLowerCase()}-${lastName?.toLowerCase()}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">
                {moment(Number(createdAt)).format("Do MMM")}
              </span>
              {userId === userData?._id && (
                <div
                  className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <BiDotsVerticalRounded />
                </div>
              )}
            </div>
          </div>

          <div className="mt-2">
            <p className="text-[13px]">{content}</p>
            {thumbnail && (
              <img
                className="mt-5 rounded-lg w-full"
                src={`${process.env.REACT_APP_SERVER_URL}${thumbnail}`}
                alt="post"
              />
            )}
          </div>

          <div className="mt-4 flex items-center justify-between gap-5">
            <div
              className="flex items-center gap-2 text-[13px] cursor-pointer"
              onClick={() =>
                likeUnlike({ id: _id, data: { _id: userData?._id } })
              }
            >
              {liked?.includes(userData?._id) ? (
                <AiTwotoneLike className="text-lg text-primary" />
              ) : (
                <BiLike className="text-lg" />
              )}
              <span>{liked?.length}</span>
            </div>
            <div
              className="flex items-center gap-2 text-[13px] cursor-pointer"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <BiComment className="text-lg" />
              <span>{comments?.length}</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] cursor-pointer">
              <CiRepeat className="text-lg" />
              <span>617</span>
            </div>
            <div className="flex items-center gap-2 text-[13px] cursor-pointer">
              <HiShare className="text-lg" />
              <span>Share</span>
            </div>
          </div>

          <div
            className={`transition-all duration-500 overflow-hidden ${
              showCommentBox ? "h-fit" : "h-0"
            }`}
          >
            <div className="mt-3 w-full">
              <form onSubmit={submitComment}>
                <div className="flex items-center gap-3 w-full">
                  <FaUserCircle className="text-primary text-3xl font-bold" />
                  <input
                    className="block outline-none border px-2 py-[6px] rounded-lg w-full text-sm bg-transparent"
                    placeholder="Write Your comment"
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              {comments?.map((comment) => (
                <div key={comment?.createdAt} className="flex gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      profilePic
                        ? `${process.env.REACT_APP_SERVER_URL}${profilePic}`
                        : "/images/users/2.jpg"
                    }
                    alt="user"
                  />
                  <div>
                    <div className="bg-secondary p-[10px] rounded-xl">
                      <span className="text-xs text-dark">{`${comment?.firstName} ${comment?.lastName}`}</span>
                      <p className="text-xs">{comment?.comment}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] mt-1">
                      <span>Like</span>
                      <span>.</span>
                      <span>Reply</span>
                      <span>.</span>
                      <span>
                        {moment(Number(comment?.createdAt)).format("dddd")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PostModal
        createPost={editPost}
        setCreatePost={setEditPost}
        editableData={post}
        setPost={setPost}
      />
    </>
  );
};

export default Post;
