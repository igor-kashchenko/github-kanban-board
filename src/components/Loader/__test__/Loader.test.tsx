import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';
import '@testing-library/jest-dom/extend-expect';

describe('Loader component', () => {
  beforeEach(() => {
    render(<Loader />);
  });

  test('renders loader', () => {
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });
});