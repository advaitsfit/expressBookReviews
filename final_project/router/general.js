const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();

// Get all books
public_users.get('/', (req, res) => {
  return res.json(books);
});

// Get by ISBN
public_users.get('/isbn/:isbn', (req, res) => {
  return res.json(books[req.params.isbn]);
});

// Get by Author
public_users.get('/author/:author', (req, res) => {
  const result = Object.values(books)
    .filter(book => book.author === req.params.author);
  return res.json(result);
});

// Get by Title
public_users.get('/title/:title', (req, res) => {
  const result = Object.values(books)
    .filter(book => book.title === req.params.title);
  return res.json(result);
});


// ✅ ASYNC (AXIOS) ROUTES — REQUIRED FOR TASK 11

// Get all books
public_users.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Get by ISBN
public_users.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.json(response.data[req.params.isbn]);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching book" });
  }
});

// Get by Author
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    const result = Object.values(response.data)
      .filter(book => book.author === req.params.author);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching author books" });
  }
});

// Get by Title
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:5000/');
    const result = Object.values(response.data)
      .filter(book => book.title === req.params.title);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching title books" });
  }
});

module.exports.general = public_users;