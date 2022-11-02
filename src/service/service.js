import config from '../config.json'

const API = config.OfficialAPI;

// ================= // This file holds all the backend services -======================
const axios = require('axios');

// token 
const WDToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3VwZXIgQWRtaW4iLCJlbWFpbCI6InN1cGVyQHdvb2RzaGFsYS5jb20iLCJwYXNzd29yZCI6Indvb2RzYWxhMjAyMiIsImlhdCI6MTY2MTg3Mjc4M30.LT7rczBuoQpjIedvaOUgYPKy4oW7snvtq5BrIcqpaYk"

// ========================= CURD For user =================================

// for register
export const register = async (data) => {
  return await axios.post(`${API}/register`, data);
}

// for login 
export const login = async (data) => {
  return await axios.post(`${API}/login`, data);
}

// for getting user details  
export const getCustomer = async (CID) => {
  return await axios.get(`${API}/getCustomer?CID=${CID}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

  );
}
// for getCustomerAddress details  
export const getCustomerAddress = async (CID) => {
  return await axios.get(`${API}/getCustomerAddress?CID=${CID}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

  );
}

// for update Customer  details  
export const updateCustomer = async (data) => {
  console.log(data)
  return await axios.patch(`https://woodshala.in/api/updateCustomer`, data,
    {
      headers: {
        Authorization: `Bearer ${WDToken}`,
      },
    }

  );
}

// ========================= End CURD For user =================================

// ======================== CURD for product =================================

export const getProducts = async () => {
  return await axios.get(`${API}/getProducts`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}

// get product details for display  
export const getProductDetails = async (data) => {
  return await axios.get(`${API}/getProductDetails?SKU=${data}`);
}


// ======================== END CURD  product =================================


// ========================  CURD from Cart =================================

// add item to cart
export const addCartItem = async (data) => {
  return await axios.post(`${API}/addCartItem`, data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}

// remove item from cart
export const removeCartItem = async (data) => {
  return await axios.get(`${API}/removeCartItem?CID=${data.CID}&product_id=${data.product_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


export const getCartItem = async (data) => {
  return await axios.get(`${API}/getCartItem?CID=${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


export const getDetails = async (data) => {
  return await axios.get(`${API}/getDetails?products=${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


export const updateQuantity = async (data) => {
  return await axios.patch(`${API}/updateQuantity`,data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


// ========================  END CURD from Cart =================================

// ========================== order CURD =================

// order ID at last
export const getLastOrder = async () => {
  return await axios.get(`https://woodshala.in/api/getLastOrder`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};

// for  adding order to the list

export const addOrder = async (data) => {
  return await axios.post(`https://woodshala.in/api/placeOrder`,data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
    },
  });
};
