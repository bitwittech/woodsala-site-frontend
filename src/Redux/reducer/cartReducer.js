/* eslint-disable no-case-declarations */
/* eslint-disable camelcase */
const initialState = {
  items: [],
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADDITEM":
      state.items.push(action.payload);
      return { ...state };
    case "REMOVEITEM":
      console.log(action);
      state = {
        items: state.items.filter((row) => {
          return row.product_id !== action.payload;
        }),
      };
      return { ...state };
    case "HANDLEQTY":
      // console.log(action.payload);
      state = {
        items: state.items.map((row) => {
          if (
            row.product_id === action.payload.product_id &&
            parseInt(action.payload.quantity) >= 1
          )
            row.quantity = parseInt(action.payload.quantity);
          return row;
        }),
      };
      return { ...state };
    case "DECREMENT":
      state = {
        items: state.items.map((row) => {
          if (row.product_id === action.payload && row.quantity > 1)
            row.quantity = parseInt(row.quantity) - 1;
          return row;
        }),
      };
      return { ...state };
    case "INCREMENT":
      state = {
        items: state.items.map((row) => {
          if (row.product_id === action.payload)
            row.quantity = parseInt(row.quantity) + 1;
          return row;
        }),
      };
      return { ...state };
    case "PRESETCART":
      state = action.payload;
      return { ...state };
    default:
      return state;
  }
};
