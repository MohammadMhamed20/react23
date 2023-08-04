const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  content: String,
  thumbnail: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: {
    type: [
      {
        comment: String,
        firstName: String,
        lastName: String,
        profilePic: String,
        createdAt: Number,
      },
    ],
  },
  liked: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  createdAt: Number,
});

const Post = model("Post", postSchema);

module.exports = Post;
