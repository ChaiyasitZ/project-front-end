const { Router } = require('express');
const router = Router();
const axios = require('axios');
const base_url = 'http://localhost:3000';

// Get the create book page
router.get('/create', (req, res) => {
    res.render('books/create');
});

// Get the update book page
router.get('/update/:bookId', async (req, res) => {
    try {
        const book = await axios.get(`${base_url}/books/${req.params.bookId}`);
        res.render('books/update', { book: book.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);

// Get the delete book page
router.get('/delete/:bookId', async (req, res) => {
    try {
        const book = await axios.get(`${base_url}/books/${req.params.bookId}`);
        res.render('books/delete', { book: book.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
);

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await axios.get(`${base_url}/books`);
        res.render('books/books', { books: books.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a book by id
router.get('/:bookId', async (req, res) => {
    try {
        const book = await axios.get(`${base_url}/books/${req.params.bookId}`);
        res.render('book', { book: book.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new book
router.post('/', async (req, res) => {
    try {
        await axios.post(`${base_url}/books/create`, req.body);
        res.redirect('/books/create');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a book by id
router.put('/:bookId', async (req, res) => {
    try {
        await axios.put(`${base_url}/books/${req.params.bookId}`, req.body);
        res.redirect('/books');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Delete a book by id
router.delete('/:bookId', async (req, res) => {
    try {
        await axios.delete(`${base_url}/books/${req.params.bookId}`);
        res.redirect('/books');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;