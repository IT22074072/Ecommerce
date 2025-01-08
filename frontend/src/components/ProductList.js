import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, addToCart } from '../redux/actions';
import { getProducts } from '../api';
import { Button, Card, CardContent, Grid, Typography, CircularProgress, Alert } from '@mui/material';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productQuantities, setProductQuantities] = useState({});
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getProducts();
        console.log("fetched items",response.data);
        dispatch(fetchProducts(response.data));

        const initialQuantities = response.data.reduce((acc, product) => {
          acc[product.id] = product.quantityInStock;
          return acc;
        }, {});
        setProductQuantities(initialQuantities);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.productId === product.id);

    if (existingItem) {
      alert('This product is already in your cart.');
      return;
    }

    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: prevQuantities[product.id] - 1,
    }));

    const cartItem = {
      productId: product.id,
      quantity: 1,
      productName: product.name,
      price: product.price,
    };
    dispatch(addToCart(cartItem));
    console.log("added to the cart", cartItem)
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Products</Typography>
      {products.length === 0 ? (
        <Typography>No products available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id} > 
              <Card>
                <CardContent >
                  <Typography variant="h6" mt={2}>{product.name}</Typography>
                  <Typography variant="body2" mt={2}>Price: ${product.price}</Typography>
                  <Typography variant="body2" mt={2}>Available Stock: {productQuantities[product.id]}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                    style={{ marginTop: '25px' }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ProductList;
