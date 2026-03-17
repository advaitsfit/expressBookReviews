const axios = require('axios');

// Task 11.1 - Get all books
async function getAllBooks() {
    try {
        const response = await axios.get("http://localhost:5000/");
        console.log("All Books:", response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11.2 - Get book by ISBN
async function getBookByISBN(isbn) {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log("Book by ISBN:", response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11.3 - Get books by Author
async function getBooksByAuthor(author) {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log("Books by Author:", response.data);
    } catch (error) {
        console.error(error.message);
    }
}

// Task 11.4 - Get books by Title
async function getBooksByTitle(title) {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log("Books by Title:", response.data);
    } catch (error) {
        console.error(error.message);
    }
}


// Call functions
getAllBooks();
getBookByISBN(1);
getBooksByAuthor("Chinua Achebe");
getBooksByTitle("Things Fall Apart");