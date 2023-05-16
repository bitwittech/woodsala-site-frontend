const initialState = {
  items: [],
};

export const wishlist = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTOLIST":
      state.items.push(action.payload);
      return { ...state };
    case "REMOVEFROMLIST":
      console.log(action);
      state = {
        items: state.items.filter((row) => {
          return row.product_id !== action.payload;
        }),
      };
      return { ...state };
    case "PRESETLIST":
      state = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
