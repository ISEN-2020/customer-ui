import React, { useState, useEffect } from 'react';
import mockData from '../mockData.json';
import './UserDashboard.css';
import axios from 'axios'; 

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]); // Will be populated from backend
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [bookStatus, setBookStatus] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setBooks(mockData.books);
    setFilteredBooks(mockData.books);

    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch user borrowings from backend when username is available
  useEffect(() => {
    const fetchBorrowings = async () => {
      if (!username) return;
      try {
        const res = await axios.get(`/api/lendings/by_user/`, {
          params: { user_email: username }
        });
        setBorrowedBooks(res.data || []);
      } catch (err) {
        console.error('Erreur lors du chargement des emprunts:', err?.response?.data || err.message);
      }
    };
    fetchBorrowings();
  }, [username]);

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
      const parsedBookId = parseInt(bookId, 10);
      if (Number.isNaN(parsedBookId)) {
        alert('ISBM/ID du livre invalide. Entrez un nombre.');
        return;
      }

      const lendingData = {
<<<<<<< HEAD
        user_email: username,
        book_id: parsedBookId,
=======
        "user_email": username,
        "book_id": bookId,
        "status":bookStatus
>>>>>>> dea8687fdecd06871ddd84ad69455c059b991457
      };

      // Utiliser un chemin relatif pour fonctionner derrière un Ingress K8s
      // L'Ingress redirigera /api vers le service backend
      const response = await axios.post('/api/create-lending/', lendingData);
      if (response.status === 201) {
        // Refresh borrowings after successful lending
        try {
          const res = await axios.get(`/api/lendings/by_user/`, { params: { user_email: username } });
          setBorrowedBooks(res.data || []);
        } catch (err) {
          console.error('Impossible de rafraîchir les emprunts:', err?.response?.data || err.message);
        }
        alert('Livre prêté avec succès');
      } else {
        alert('Échec du prêt');
      }
    } catch (error) {
      const backendMsg = error?.response?.data ? JSON.stringify(error.response.data) : error?.message;
      console.error('Erreur lors du prêt du livre:', backendMsg);
      alert('Erreur lors du prêt du livre: ' + (backendMsg || 'voir console'));
    }    
  };

  // Helper to get book details from mockData by id
  const getBookById = (id) => {
    return mockData.books.find(b => b.id === String(id));
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
            <li key={book.id}>
              <strong>ISBM:</strong> {book.isbn}<br/>
              <strong>Titre:</strong> {book.title}<br/>
              <strong>Auteur:</strong> {book.author}<br/>
              <strong>Description:</strong> {book.description}<br/>
              <strong>Date de publication:</strong> {book.publicationDate}<br/>
              <strong>Quantité:</strong> {book.quantity}<br/>
              <strong>Status:</strong> {book.status}
            </li>
          ))}
        </ul>
      </div>

      <div className="dashboard-section borrow-books">
        <h3>Louer un Livre</h3>
        <form onSubmit={handleLendBook}>
          <input
            type="text"
            placeholder="ID du Livre (nombre)"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            readOnly
          />
          <input
            type="text"
            placeholder="Status du Livre"
            value={bookStatus}
            onChange={(e) => setBookStatus(e.target.value)}
          />
          <button type="submit">Le Louer</button>
        </form>
      </div>

      <div className="dashboard-section borrowed-books">
        <h3>Livres Empruntés</h3>
        <ul>
          {borrowedBooks.length === 0 && (
            <li>Aucun emprunt pour l'instant.</li>
          )}
          {borrowedBooks.map(lending => {
            const book = getBookById(lending.book_id);
            return (
              <li key={lending.id}>
                Titre: {book?.title || `Livre #${lending.book_id}`} -
                Date d'emprunt: {new Date(lending.date_borrowed).toLocaleDateString()} -
                Date de retour prévue: {new Date(lending.date_due).toLocaleDateString()}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;