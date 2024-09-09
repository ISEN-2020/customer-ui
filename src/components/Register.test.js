import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

// Moquez window.alert pour éviter les erreurs de JSDOM
global.alert = jest.fn();

test('renders Register component', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  // Vérifie que les champs et boutons sont présents
  expect(screen.getByPlaceholderText('Adresse Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Mot de Passe')).toBeInTheDocument();
  expect(screen.getByText("S'inscrire")).toBeInTheDocument();
});

test('handles form submission', () => {
  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  // Simulez la saisie dans le formulaire
  fireEvent.change(getByPlaceholderText('Adresse Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(getByPlaceholderText('Mot de Passe'), { target: { value: 'password123' } });

  // Simulez la soumission du formulaire
  fireEvent.click(getByText("S'inscrire"));

  // Vérifiez que l'alerte a été appelée
  expect(global.alert).toHaveBeenCalledWith('Registration successful!');
});
