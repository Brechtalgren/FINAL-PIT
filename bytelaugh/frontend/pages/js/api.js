const API = "/api";

export const fetchPosts = async () =>
  (await fetch(`${API}/posts`)).json();

export const addPost = async (content) =>
  (await fetch(`${API}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  })).json();
