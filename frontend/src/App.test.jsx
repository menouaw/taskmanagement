import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders login page when user is not authenticated', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /connexion/i })).toBeInTheDocument();
  });
});


