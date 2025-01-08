import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart, placeOrder } from '../redux/actions';
import { Card, CardContent, Typography, Button, TextField, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom'; 


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log("cart",cart);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate to different routes


  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }

    const item = cart.find((item) => item.id === id);
    if (newQuantity > item.stock) {
      alert('Not enough stock available.');
      return;
    }

    dispatch(updateCartItemQuantity(id, newQuantity));
  };

  const handleQuantityChange = (e, id) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      const newQuantity = parseInt(value, 10) || 1;
      handleUpdateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    console.log("Updated Cart:", cart); // Check the updated cart here
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    dispatch(placeOrder(cart));
    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation'); // Use navigate to redirect to the order confirmation page
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      {cart.length === 0 ? (
        <Typography variant="h6">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{item.productName}</Typography>
                  <Typography variant="body1" color="textSecondary">Price: ${item.price}</Typography>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                    InputProps={{
                      inputProps: { min: 1, max: item.stock },
                    }}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemove(item.id)}
                    fullWidth
                  >
                    Remove from Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6">Cart Summary</Typography>
        <Typography variant="body1">Total Quantity: {totalQuantity}</Typography>
        <Typography variant="body1">Total Price: ${totalPrice.toFixed(2)}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheckout}
          fullWidth
          sx={{ marginTop: '10px' }}
        >
          Checkout
        </Button>
      </Paper>
    </Container>
  );
};

export default Cart;
