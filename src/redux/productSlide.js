import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItem: (state, action) => {
      toast("One Item Deleted");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = price * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = price * qtyDec;

        state.cartItem[index].total = total;
      }
    },
    // New action to delete product from productList
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.productList = state.productList.filter(product => product._id !== productId);
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  deleteProduct, // Export the new action
} = productSlice.actions;

export default productSlice.reducer;
