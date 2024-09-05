import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartProduct {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number; // Stock information
  quantity: number; // Quantity of the item in the cart
}

interface CartState {
  products: CartProduct[];
  totalPrice: number;
  totalProductsQty: number;
}

const initialState: CartState = {
  products: [],
  totalPrice: 0,
  totalProductsQty: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartProduct>) {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        // If the product is already in the cart and stock is available, increase quantity
        if (existingProduct.stock > 0) {
          existingProduct.stock -= 1;
          existingProduct.quantity += 1;
          state.totalPrice = parseFloat((state.totalPrice + existingProduct.price).toFixed(2));
          state.totalProductsQty += 1;
        }
      } else {
        if (action.payload.stock > 0) {
          // Add the product to the cart with an initial quantity of 1 and decrease stock by 1
          state.products.push({
            ...action.payload,
            quantity: 1,
            stock: action.payload.stock - 1,
          });
          state.totalPrice = parseFloat((state.totalPrice + action.payload.price).toFixed(2));
          state.totalProductsQty += 1;
        }
      }
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product._id === action.payload);
      if (product && product.quantity <= product.stock) {
        product.quantity += 1;
        state.totalProductsQty += 1;
        state.totalPrice = parseFloat((state.totalPrice + product.price).toFixed(2));
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.totalProductsQty -= 1;
        state.totalPrice = parseFloat((state.totalPrice - product.price).toFixed(2));
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const product = state.products.find((product) => product._id === action.payload);
      if (product) {
        state.totalProductsQty -= product.quantity;
        state.totalPrice = parseFloat(
          (state.totalPrice - product.price * product.quantity).toFixed(2)
        );
        state.products = state.products.filter((product) => product._id !== action.payload);
      }
    },
    clearCart(state) {
      // Reset all products, quantities, and total values
      state.products = [];
      state.totalProductsQty = 0;
      state.totalPrice = 0;
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
