import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from '@testing-library/react';
import App from './App';

describe('Index', () => {
  test('renders the App component without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});