import React, { useEffect, useState } from 'react';
import bookService from '../services/bookService';

const BookList = () => {
  const [books, setBooks] = useState([]);

  // Récupère la liste des livres à l'initialisation du composant
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await bookService.getBooks();
      setBooks(response);  // Met à jour l'état avec les livres récupérés
    };
    fetchBooks(); // Utilisation d'un tableau vide pour ne l'exécuter qu'une fois
  }, []);

  return (
    <div>
      <h2>Available Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} (Published: {book.year})
            <button onClick={() => bookService.borrowBook(book.id)}>Borrow</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;