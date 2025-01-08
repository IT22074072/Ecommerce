import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderConfirmation from './../components/OrderConfirmation'; // Path to your OrderConfirmation component

test('displays order details when an order is placed', () => {
  const order = {
    id: '12345',
    orderDate: '2025-01-01T00:00:00Z',
    totalPrice: 1500,
  };

  render(<OrderConfirmation order={order} />);

  // Check if the order details are rendered
  expect(screen.getByText('Order ID: 12345')).toBeInTheDocument();
  expect(screen.getByText('Order Date: 01/01/2025')).toBeInTheDocument();
  expect(screen.getByText('Total Price: $1500.00')).toBeInTheDocument();
  expect(screen.getByText('Thank you for your purchase!')).toBeInTheDocument();
});

test('displays message when no order is placed', () => {
  render(<OrderConfirmation order={null} />);

  // Check if the "no order placed" message is shown
  expect(screen.getByText('No order placed. Please check your cart.')).toBeInTheDocument();
});
