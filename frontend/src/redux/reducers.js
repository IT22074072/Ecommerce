const initialCartState = {
  cart: [], // Initial empty cart
  products: [],
  error: null,
  order: null, // Store the placed order here
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    case "ADD_TO_CART":
      // Check if the item already exists in the cart
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += action.payload.quantity; // Add quantity to existing product
        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload], // Add new product to the cart
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload), // Remove product from cart by ID
      };

    case "UPDATE_CART_ITEM_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ), // Update product quantity in cart
      };

    case "PLACE_ORDER":
      return {
        ...state,
        cart: [], // Clear the cart after placing the order
        order: {
          ...action.payload,
          totalPrice: action.payload.totalPrice, // Store the correct total price
        },
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [], // Only clear the cart
      };

    default:
      return state;
  }
};

export default cartReducer;
