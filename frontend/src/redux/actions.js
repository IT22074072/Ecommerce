import { addProduct as addProductApi } from '../api'; // Import the API call
import { addStock as updateQuantityApi } from '../api'; // Import the API call
import { placeOrder as placeOrderApi } from '../api'; // Import the placeOrder API call


  // Action Types for Cart
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

// Action Creators for Cart

export const fetchProducts = (products) => ({
    type: FETCH_PRODUCTS,
    payload: products,
  });

  export const addToCart = (product) => async (dispatch) => {
    try {
      const response = await addProductApi(product); // API call to add product to cart
      dispatch({
        type: ADD_TO_CART,
        payload: response.data, // Assuming your API returns the updated cart item
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
};

export const updateCartItemQuantity = (id, newQuantity) => async (dispatch) => {
  try {
    const response = await updateQuantityApi(id, newQuantity);

    console.log('Stock update response:', response.data);

    dispatch({ type: UPDATE_CART_ITEM_QUANTITY, payload: { id, newQuantity } });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
  }
};

export const placeOrder = (cartItems) => async (dispatch) => {
  try {
    // Send the cart items (with price and quantity) to the API
    const response = await placeOrderApi(cartItems);

    console.log('Order placed:', response.data);

    // Dispatch PLACE_ORDER to update the state with the placed order
    dispatch({
      type: 'PLACE_ORDER',
      payload: {
        ...response.data,
        items: cartItems,  // Send the cart items as part of the order
        totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),  // Calculate the total price based on cart
      },
    });

    // Optionally, clear the cart
    dispatch({
      type: 'CLEAR_CART',
    });

  } catch (error) {
    console.error('Error placing order:', error);
  }
};

