const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

const DATA_DIR = path.join(__dirname, "data");
const DATA_PATH = path.join(DATA_DIR, "posts.json");

// Ensure data file exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, "[]");

const loadPosts = () =>
  JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

const savePosts = (posts) =>
  fs.writeFileSync(DATA_PATH, JSON.stringify(posts, null, 2));

app.get("/api/posts", (req, res) => {
  res.json(loadPosts());
});

app.post("/api/posts", (req, res) => {
  const { content } = req.body;
  if (!content?.trim()) {
    return res.status(400).json({ error: "Post content required" });
  }

  const posts = loadPosts();
  const newPost = {
    id: Date.now(),
    user: "bytelaugh_user",
    content,
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  savePosts(posts);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
