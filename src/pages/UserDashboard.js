import React, { useState, useEffect } from 'react';
import mockData from '../mockData.json';
import './UserDashboard.css';
import axios from 'axios'; 

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

    // Récupérer le nom d'utilisateur depuis sessionStorage
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
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
      const lendingData = {
        "user_email": username,
        "book_id": bookId
      };
      
      const response = await axios.post('http://127.0.0.1:8000/api/create-lending/', lendingData);
      if (response.status === 201) {
        alert('Livre prêté avec succès');
      } else {
        alert('Échec du prêt');
      }
    } catch (error) {
      console.error('Erreur lors du prêt du livre');
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
            <li key={book.isbn}>
              <strong>Titre:</strong> {book.title}<br/>
              <strong>Auteur:</strong> {book.author}<br/>
              <strong>Description:</strong> {book.description}<br/>
              <strong>Date de publication:</strong> {book.publicationDate}<br/>
              <strong>Quantité:</strong> {book.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section borrow-books">
        <h3>Louer un Livre</h3>
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
            readOnly
          />
          <button type="submit">Le Louer</button>
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