const express = require('express');


const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'War and Peace',
      gender: 'Historical Fiction',
      author: 'Lev Tolstoy',
      read: false
    },
    {
      title: 'Les Miserable',
      gender: 'Historical Fiction',
      author: 'Victor Hugo',
      read: false
    }];

  bookRouter.route('/').get((req, res) => {
    res.render('books', {
      nav,
      title: 'library',
      books
    });
  });

  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;

    res.render('book', {
      nav,
      title: 'library',
      book: books[id]
    });
  });

  return bookRouter;
}

module.exports = router;
