const Jimp = require("jimp");
const path = require("path");
const Post = require("../models/Post");

// get all posts controller
const getAllPostsController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user comments")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// get all posts by user id controller
const getAllPostsByUserIdController = async (req, res) => {
  try {
    const { _id } = req.user || {};

    const posts = await Post.find({ user: _id })
      .populate("user comments")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// create new post controller
const createNewPostController = async (req, res) => {
  try {
    const { content, thumbnail } = req.body || {};
    const { _id } = req.user || {};

    let imagePath;

    // upload thumbnail image
    if (thumbnail) {
      // upload image
      const buffer = Buffer.from(
        thumbnail.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      try {
        const jimpResp = await Jimp.read(buffer);
        jimpResp.write(
          path.resolve(__dirname, `../public/storage/posts/${imagePath}`)
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: "Could not process the image!!",
        });
      }
    }

    const newPost = new Post({
      content,
      thumbnail: imagePath ? `/storage/posts/${imagePath}` : null,
      user: _id,
      createdAt: Date.now(),
    });

    await newPost.save();

    const createdPost = await Post.findById(newPost?._id).populate(
      "user comments"
    );

    res.status(200).json(createdPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// create new comment controller
const createCommentController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { comment } = req.body || {};
    const { firstName, lastName, profilePic } = req.user || {};

    const post = await Post.findById(id);

    post.comments = [
      ...post?.comments,
      {
        comment,
        createdAt: Date.now(),
        firstName,
        lastName,
        profilePic,
      },
    ];

    await post.save();

    res.status(201).json({
      comment,
      createdAt: Date.now(),
      firstName,
      lastName,
      profilePic,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// like unlike controller
const likeUnlikeController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const { _id } = req.body || {};

    const post = await Post.findById(id);

    if (!post?.liked?.includes(_id)) {
      console.log("hello");
      post.liked = [...post?.liked, _id];
    } else {
      const elementToRemove = _id;

      const index = post?.liked.indexOf(elementToRemove);
      if (index > -1) {
        post?.liked.splice(index, 1);
      }
    }

    await post.save();

    res.status(200).json(post?.liked);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// create new post controller
const updatePostController = async (req, res) => {
  try {
    const { content, thumbnail } = req.body || {};
    const { id } = req.params || {};

    let imagePath;

    // upload thumbnail image
    if (thumbnail) {
      // upload image
      const buffer = Buffer.from(
        thumbnail.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      try {
        const jimpResp = await Jimp.read(buffer);
        jimpResp.write(
          path.resolve(__dirname, `../public/storage/posts/${imagePath}`)
        );
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: "Could not process the image!!",
        });
      }
    }

    // find post by id and update
    const post = await Post.findById(id).populate("user comments");

    if (imagePath) {
      post.content = content;
      post.thumbnail = `/storage/posts/${imagePath}`;
    } else {
      post.content = content;
    }

    await post.save();

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred",
    });
  }
};

// delete post controller
const deletePostController = async (req, res) => {
  try {
    const { id } = req.params || {};

    const deletedPost = await Post.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  getAllPostsController,
  getAllPostsByUserIdController,
  createNewPostController,
  createCommentController,
  updatePostController,
  likeUnlikeController,
  deletePostController,
};
