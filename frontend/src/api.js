import axios from 'axios';

const API_BASE = 'http://localhost:5132/api'; 

export const getProducts = () => axios.get(`${API_BASE}/products`);
export const addProduct=(product) => axios.post(`${API_BASE}/cart`, product);
export const addStock = (id, quantityToAdd) =>
  axios.put(`${API_BASE}/cart/update-quantity/${id}`, null, { params: { newQuantity: quantityToAdd } });
export const placeOrder = (cartItems) => axios.post(`${API_BASE}/orders`, cartItems);

