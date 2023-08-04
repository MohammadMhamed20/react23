const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    profilePic: String,
    email: String,
    password: String,
    gender: String,
    bio: String,
    posts: {
      type: [Schema.Types.ObjectId],
      ref: "Post",
    },
    joinedDate: Number,
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
