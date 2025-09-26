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
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
  if (books.length > 0) {
    const IsBorrowed = books.filter(b => b.status === "BORROWED");
    console.log("Borrowed books =", IsBorrowed);
    setBorrowedBooks(IsBorrowed);
  }
  }, [books]); // se déclenche chaque fois que books change

  


  // Fetch user borrowings from backend when username is available
  useEffect(() => {
    const fetchBorrowings = async () => {
      if (!username) return;
      try {
        const res = await axios.get(`http://127.0.0.1:5000/get_books`, { headers: { Accept: "application/json" }});
        console.log("res.data =", res.data);
        setBooks(res.data || []);
        setFilteredBooks(res.data || []);
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

      let data = getDataBook(bookId)
      console.log("dataBook =", data)

      const lendingData = {
        "title":data.title,
        "author":data.author,
        "description":data.description,
        "Year":data.year,
        "quantity":data.quantity,
        "status": "BORROWED"
      };
      console.log("lendingData = ",lendingData)

      // Utiliser un chemin relatif pour fonctionner derrière un Ingress K8s
      // L'Ingress redirigera /api vers le service backend
      const response = await axios.put(`http://127.0.0.1:5000/put_books/${parsedBookId}`, lendingData);
      if (response.status === 201) {
        // Ajouter directement l'emprunt à borrowedBooks
        //setBorrowedBooks(response.data)
        alert('Livre prêté avec succès');
        const res = await axios.get(`http://127.0.0.1:5000/get_books`, { headers: { Accept: "application/json" }}); //recharge les livres
        setBooks(res.data);
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

  function getDataBook(bookId){
    let dataBook = books.find(b => b.id === Number(bookId));
    return dataBook;
  }

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
              <strong>ID:</strong> {book.id}<br/>
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
            return (
              <li key={lending.id}>
                Titre: {lending?.title || `Livre #${lending.id}`} -
                Date d'emprunt: {lending.year} -
                Emprunteur: {username}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;