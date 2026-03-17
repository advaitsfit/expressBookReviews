const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// ✅ Check if username already exists
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// ✅ Check username & password match
const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// ✅ Task 8: Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign(
      { username: username },
      "access",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "User successfully logged in",
      accessToken: accessToken,
    });
  } else {
    return res.status(401).json({
      message: "Invalid Login. Check username and password"
    });
  }
});

// ✅ Task 9: Add / Modify Review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const username = req.user.username; // ✅ from JWT
  const isbn = req.params.isbn;
  const review = req.query.review;

  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review added/updated successfully",
    reviews: books[isbn].reviews
  });
});

// ✅ Task 10: Delete Review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const username = req.user.username; // ✅ from JWT
  const isbn = req.params.isbn;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({
      message: "Review deleted successfully"
    });
  } else {
    return res.status(404).json({
      message: "No review found for this user"
    });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;