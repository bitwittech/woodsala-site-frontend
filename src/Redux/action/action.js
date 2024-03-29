// This file has all the possible action in App

// Actions for Alert
export const setAlert = (parameters) => {
  return {
    type: "NOTIFY",
    payload: parameters,
  };
};

// Actions for Login Modal Box
export const setLoginModal = (parameters) => {
  return {
    type: "LOGBOX",
    payload: parameters,
  };
};

// Action for Authentication
export const setAuth = (parameters) => {
  return {
    type: "AUTH",
    payload: parameters,
  };
};

// Action for add item Cart
export const addItem = (parameters) => {
  return {
    type: "ADDITEM",
    payload: parameters,
  };
};

// Action for remove item Cart
export const removeItem = (parameters) => {
  return {
    type: "REMOVEITEM",
    payload: parameters,
  };
};
// Action for INCREMENT in Product Quantity
export const addQTY = (parameters) => {
  return {
    type: "INCREMENT",
    payload: parameters,
  };
};
// Action for DECREMENT in Product Quantity
export const subQTY = (parameters) => {
  return {
    type: "DECREMENT",
    payload: parameters,
  };
};
// Action for DECREMENT in Product Quantity
export const handleItemQTY = (parameters) => {
  return {
    type: "HANDLEQTY",
    payload: parameters,
  };
};
// Action for setting cart while customer logged in
export const setCart = (parameters) => {
  return {
    type: "PRESETCART",
    payload: parameters,
  };
};
// Action for thanks after order completion
export const thanks = (parameters) => {
  return {
    type: "THANKS",
    payload: parameters,
  };
};

// Action for setting wishlist
export const addToList = (parameters) => {
  return {
    type: "ADDTOLIST",
    payload: parameters,
  };
};

// Action for setting wishlist
export const removeFromList = (parameters) => {
  return {
    type: "REMOVEFROMLIST",
    payload: parameters,
  };
};
// Action for setting wishlist
export const setList = (parameters) => {
  return {
    type: "PRESETLIST",
    payload: parameters,
  };
};

// Action for setting wishlist
export const setMasterToken = (parameters) => {
  return {
    type: "MASTERTOKEN",
    payload: parameters,
  };
};

// for refresh token Box

export const setSocket = (parameters) => {
  return {
    type: "SETSOCKET",
    payload: parameters,
  };
};

// for refresh token Box

export const setActiveUser = (parameters) => {
  return {
    type: "ACTIVE_USER",
    payload: parameters,
  };
};

// for refresh token Box

export const resetUser = (parameters) => {
  return {
    type: "RESET_USER",
    payload: parameters,
  };
};
// for refresh token Box

export const setMessage = (parameters) => {
  return {
    type: "NEW_MESSAGE",
    payload: parameters,
  };
};
