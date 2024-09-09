import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserDashboard from './UserDashboard';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mockData from '../mockData.json';

const mock = new MockAdapter(axios);

beforeEach(() => {
    // Reset any configuration before each test
    mock.reset();
    sessionStorage.clear();
});

describe('UserDashboard', () => {
    test('should alert user when trying to lend a book without filling the fields', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        render(<UserDashboard />);

        fireEvent.click(screen.getByText(/Le Louer/i));

        expect(window.alert).toHaveBeenCalledWith('Veuillez remplir tous les champs');
    });

    test('should lend a book successfully', async () => {
        sessionStorage.setItem('username', 'testUser');
        render(<UserDashboard />);

        mock.onPost('http://127.0.0.1:8000/api/create-lending/').reply(201);

        fireEvent.change(screen.getByPlaceholderText(/ISBM du Livre/i), { target: { value: '1' } });
        fireEvent.click(screen.getByText(/Le Louer/i));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Livre prêté avec succès');
        });
    });

    test('should show error alert when lending a book fails', async () => {
        sessionStorage.setItem('username', 'testUser');
        render(<UserDashboard />);

        mock.onPost('http://127.0.0.1:8000/api/create-lending/').reply(500);

        fireEvent.change(screen.getByPlaceholderText(/ISBM du Livre/i), { target: { value: '1' } });
        fireEvent.click(screen.getByText(/Le Louer/i));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Erreur lors du prêt du livre');
        });
    });

    test('should render borrowed books for the user', () => {
        mockData.borrowedBooks.push({ id: 3, title: 'Test Book', borrowedBy: 'testUser', returnDate: '2023-10-01' });
        sessionStorage.setItem('username', 'testUser');

        render(<UserDashboard />);

        expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
    });
});