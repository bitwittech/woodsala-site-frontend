const initialSocket = {
  id: null,
  active_user: [],
};

export const socket = (state = initialSocket, action) => {
  switch (action.type) {
    case "SETSOCKET":
      return (state = { ...state, id: action.payload });
    case "ACTIVE_USER":
      // console.log(action.payload)
      return (state = { ...state, active_user: action.payload });
    default:
      return state;
  }
};
const initialMessage = {
  type: null,
  message: "",
};

export const message = (state = initialMessage, action) => {
  switch (action.type) {
    case "NEW_MESSAGE":
      console.log(action.payload);
      return (state = { ...action.payload });
    default:
      return state;
  }
};
