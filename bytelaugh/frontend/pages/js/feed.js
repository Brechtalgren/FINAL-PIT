import { fetchPosts } from "./api.js";

const feed = document.getElementById("feed");

const render = ({ user, content, createdAt }) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <strong>@${user}</strong>
    <p>${content}</p>
    <small>${new Date(createdAt).toLocaleString()}</small>
  `;
  feed.appendChild(card);
};

(async () => {
  const posts = await fetchPosts();
  posts.forEach(render);
})();
