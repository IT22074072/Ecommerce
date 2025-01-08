import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppBar, Toolbar, Typography, Container, IconButton, Badge, Box, CssBaseline } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import store from './redux/store';
import OrderConfirmation from './components/OrderConfirmation';

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline /> {/* Ensures consistent Material-UI baseline styling */}
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" component={Link} to="/">
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-commerce System
            </Typography>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge color="error"> 
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation/>} />
          </Routes>
        </Container>
        <Box component="footer" sx={{ py: 10, mt:20,backgroundColor: '#f5f5f5', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} E-commerce System
          </Typography>
        </Box>
      </Router>
    </Provider>
  );
};

export default App;
