import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserDashboard from './UserDashboard';
import mockData from '../mockData.json';
import axios from 'axios';

beforeEach(() => {
  sessionStorage.setItem('username', 'testuser');
});

jest.mock('axios');

describe('UserDashboard', () => {
  test('affiche les livres et permet la recherche', () => {
    render(<UserDashboard />);

    expect(screen.getByText(/The Silent Patient/i)).toBeInTheDocument();
    expect(screen.getByText(/Alex Michaelides/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Rechercher par titre/i), {
      target: { value: 'Crawdads' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Rechercher/i }));

    expect(screen.queryByText(/The Silent Patient/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Where the Crawdads Sing/i)).toBeInTheDocument();
  });

  test('affiche les livres empruntés par l’utilisateur', () => {
    render(<UserDashboard />);
    
    expect(screen.queryByText('Titre: Livre Test')).toBeNull();
  });

  test('soumet le formulaire de prêt de livre et déclenche une alerte si les champs sont vides', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<UserDashboard />);

    fireEvent.change(screen.getByPlaceholderText(/ISBM du Livre/i), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByText(/Le Louer/i));

    expect(alertMock).toHaveBeenCalledWith('Veuillez remplir tous les champs');
    alertMock.mockRestore();
  });

  test('soumet le formulaire et affiche un succès si l\'appel API réussit', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    axios.post.mockResolvedValueOnce({
      status: 201
    });

    render(<UserDashboard />);

    fireEvent.change(screen.getByPlaceholderText(/ISBM du Livre/i), {
      target: { value: '1234' },
    });

    fireEvent.click(screen.getByText(/Le Louer/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/api/create-lending/',
        { user_email: 'testuser', book_id: '1234' }
      );

      expect(alertMock).toHaveBeenCalledWith('Livre prêté avec succès');
    });

    alertMock.mockRestore();
  });
});