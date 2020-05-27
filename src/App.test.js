import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders button with text', () => {
  render(<App />);
  expect(screen.getByText('Click here!'));

});
