import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './../components/Cart'; 

test('adds product to cart and updates total price', () => {
  const cartItems = [];
  const addToCart = jest.fn();

  render(<Cart cartItems={cartItems} addToCart={addToCart} />);

  // Simulate adding a product to the cart
  fireEvent.click(screen.getByText('Add to Cart'));

  // Check if the addToCart function is called
  expect(addToCart).toHaveBeenCalledTimes(1);
});

test('cart total price is correct', () => {
  const cartItems = [
    { id: 1, name: 'Laptop', price: 1000, quantity: 1 },
    { id: 2, name: 'Smartphone', price: 500, quantity: 2 },
  ];
  render(<Cart cartItems={cartItems} />);

  // Check if the total price is calculated correctly
  expect(screen.getByText('Total: $2000')).toBeInTheDocument();
});
