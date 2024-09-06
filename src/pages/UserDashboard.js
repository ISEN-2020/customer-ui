import React, { useState, useEffect } from 'react';
import mockData from '../mockData.json';
import './UserDashboard.css';
import axios from 'axios'; // Import axios (or you can use fetch instead)

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [username, setUsername] = useState('');

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

  const handleLendBook = async (e) => {
    e.preventDefault();
    if (!bookId || !username) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await axios.post(`/api/create-lending/?username=${username}&book_id=${bookId}`);
      if (response.status === 200) {
        alert('Livre prêté avec succès');
      } else {
        alert('Échec du prêt');
      }
    } catch (error) {
      console.error('Erreur lors du prêt du livre:', error);
      alert('Erreur lors du prêt du livre');
    }
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
        <form onSubmit={handleLendBook}>
          <input
            type="text"
            placeholder="ID du Livre"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Prêter</button>
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