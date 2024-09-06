import React, { useState, useEffect } from 'react';
import mockData from '../mockData.json';
import './UserDashboard.css';

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Charger les données fictives depuis le fichier JSON importé
    setBooks(mockData.books);
    setBorrowedBooks(mockData.borrowedBooks);
    setFilteredBooks(mockData.books); // Initialement, tous les livres sont affichés
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const results = books.filter(book =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
    setFilteredBooks(results);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-section search-books">
        <div className="sticky-header">
          <h3>Rechercher des Livres</h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par titre, auteur, etc."
          />
          <button onClick={handleSearch}>Rechercher</button>
        </div>
        <ul>
          {filteredBooks.map(book => (
            <li key={book.id}>{book.title} - {book.author}</li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section borrow-books">
        <h3>Prêter un Livre</h3>
        <form>
          <input type="text" placeholder="ID du Livre" />
          <input type="text" placeholder="ID de l'Utilisateur" />
          <button>Prêter</button>
        </form>
      </div>

      <div className="dashboard-section borrowed-books">
        <h3>Livres Empruntés</h3>
        <ul>
          {borrowedBooks.map(book => (
            <li key={book.id}>
              {book.title} - Emprunté par {book.borrowedBy} - Date de retour : {book.returnDate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;