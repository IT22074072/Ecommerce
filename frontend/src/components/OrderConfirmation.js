import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 


const OrderConfirmation = () => {
  const order = useSelector((state) => state.order);
  console.log("Order Details:", order); // Log the order details to ensure they are updated
  const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate('/cart'); // Redirect to the cart page
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Order Confirmation
        </Typography>
        {order ? (
          <>
            <Typography variant="h6" mt={4}>Order ID: {order.id}</Typography>
            <Typography variant="body1">
              Order Date: {new Date(order.orderDate).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              Total Price: ${order.totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="body1" mt={4} color='#008000'>Thank you for your purchase!</Typography>
          </>
        ) : (
          <Typography variant="body1">No order placed. Please check your cart.</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoBack}
          sx={{ marginTop: '20px' }}
        >
          Go to Cart
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
