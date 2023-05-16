// for alert snackbar

const alertState = {
  open: false,
  variant: "",
  message: "",
};

export const alert = (state = alertState, action) => {
  switch (action.type) {
    case "NOTIFY":
      return (state = action.payload);
    default:
      return state;
  }
};

// for log Box modal

const boxState = {
  open: false,
  type: undefined,
};

export const box = (state = boxState, action) => {
  switch (action.type) {
    case "LOGBOX":
      return (state = action.payload);
    default:
      return state;
  }
};
export const thanks = (state = boxState, action) => {
  switch (action.type) {
    case "THANKS":
      return (state = action.payload);
    default:
      return state;
  }
};
