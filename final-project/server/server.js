const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./db");
const app = express();
// routes require
const { authRoutes, postRoutes } = require("./routes");

// configuration environment
dotenv.config();

app.use(cors());

// set public folder
app.use(express.static("public"));

// data extract
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome",
  });
});

const PORT = process.env.PORT || 5000;

// database connection
dbConnect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
