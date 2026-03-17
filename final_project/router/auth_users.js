const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if username exists
const isValid = (username) => {
  return users.some((user) => user.username === username);
};

// Authenticate user
const authenticatedUser = (username, password) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

// ✅ REGISTER USER (FIX FOR TASK 8)
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "Unable to register user" });
  }

  if (isValid(username)) {
    return res.json({ message: "User already exists" });
  }

  users.push({ username, password });

  return res.json({ message: "User successfully registered" });
});

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

    return res.json({
      message: "Login successful!",
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
  const username = req.user.username;
  const isbn = req.params.isbn;
  const review = req.query.review;

  books[isbn].reviews[username] = review;

  return res.json({
    message: "Review added/updated successfully",
    reviews: books[isbn].reviews
  });
});

// ✅ Task 10: DELETE REVIEW (FIXED ROUTE)
regd_users.delete("/review/:isbn", (req, res) => {
  const username = req.user.username;
  const isbn = req.params.isbn;

  if (books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.json({
      message: `Review for ISBN ${isbn} deleted`
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