const initialState = {
  isAuth: false,
  username: null,
  email: null,
  CID: null,
  token: null,
  masterToken: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      return (state = action.payload);
    case "MASTERTOKEN":
      return (state = action.payload);
    default:
      return state;
  }
};
