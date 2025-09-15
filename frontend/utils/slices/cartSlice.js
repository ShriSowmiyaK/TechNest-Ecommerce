import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    itemCount: {},
    count: 0,
    cost: 0,
  },
  reducers: {

    addItem: (state, action) => {
      const id = action.payload._id;
      if (state.itemCount[id]) {
        state.itemCount[id] += 1;
      } else {
        state.itemCount[id] = 1;
        state.items.push(action.payload);
      }
      state.count += 1;
      state.cost += action.payload.price;
    },

    removeItem: (state, action) => {
      const id = action.payload._id;
      if (!state.itemCount[id]) return;

      state.itemCount[id] -= 1;
      state.count -= 1;
      state.cost -= action.payload.price;

      if (state.itemCount[id] === 0) {
        delete state.itemCount[id];
        state.items = state.items.filter((item) => item._id !== id);
      }
    },
    
    emptyItems: (state) => {
      state.items = [];
      state.itemCount = {};
      state.count = 0;
      state.cost = 0;
    },
  },
});

export const { addItem, removeItem, emptyItems } = CartSlice.actions;
export default CartSlice.reducer;
