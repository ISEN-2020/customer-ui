import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Home Component', () => {
  it('handles login form submission by redirecting to dashboard', () => {
    // Mock the navigate function
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    // Render the Home component
    render(
      <Router>
        <Home />
      </Router>
    );

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText(/Adresse Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Mot de Passe/i), { target: { value: 'password123' } });

    // Click the login button
    fireEvent.click(screen.getByText(/Connexion/i));

    // Assert that navigate was called with the expected path
    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });
});