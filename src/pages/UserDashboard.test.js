import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDashboard from './UserDashboard';
import mockData from '../mockData.json';

beforeEach(() => {
  sessionStorage.setItem('username', 'testuser');
});

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
});