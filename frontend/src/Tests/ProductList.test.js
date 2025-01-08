import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './../components/ProductList';  // Path to your ProductList component

test('renders the product list with products', () => {
  // Mocking props or state for testing
  const products = [
    { id: 1, name: 'Laptop', price: 1000, description: 'High performance laptop', quantityInStock: 10 },
    { id: 2, name: 'Smartphone', price: 500, description: 'Latest model smartphone', quantityInStock: 25 },
  ];

  // Render the component
  render(<ProductList products={products} />);

  // Check if the product names are rendered
  expect(screen.getByText('Laptop')).toBeInTheDocument();
  expect(screen.getByText('Smartphone')).toBeInTheDocument();

  // Check if the product price is rendered
  expect(screen.getByText('$1000')).toBeInTheDocument();
  expect(screen.getByText('$500')).toBeInTheDocument();

    // Check if the quantityInStock is rendered
    expect(screen.getByText('10')).toBeInTheDocument();  // Adjust based on the structure
    expect(screen.getByText('25')).toBeInTheDocument();  // Adjust based on the structure
});
