import { addPost } from "./api.js";

const btn = document.getElementById("submit");
const text = document.getElementById("content");

btn.onclick = async () => {
  if (!text.value.trim()) return alert("Write something!");
  await addPost(text.value);
  location.href = "feed.html";
};
