// ================= // This file holds all the backend services -======================
const axios = require('axios');

let localApi = 'http://localhost:8000'
let official = 'http://134.209.150.190'

// token 
const WDToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiU3VwZXIgQWRtaW4iLCJlbWFpbCI6InN1cGVyQHdvb2RzaGFsYS5jb20iLCJwYXNzd29yZCI6Indvb2RzYWxhMjAyMiIsImlhdCI6MTY2MTg3Mjc4M30.LT7rczBuoQpjIedvaOUgYPKy4oW7snvtq5BrIcqpaYk"

// ========================= CURD For user =================================

// for register
export const register = async (data) => {
  return await axios.post(`${localApi}/api/register`, data);
}

// for login 
export const login = async (data) => {
  return await axios.post(`${localApi}/api/login`, data);
}

// for getting user details  
export const getCustomer = async (CID) => {
  return await axios.get(`${localApi}/api/getCustomer?CID=${CID}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }

  );
}

// for update Customer  details  
export const updateCustomer = async (data) => {
  return await axios.patch(`http://157.245.102.136/api/updateCustomer`, data,
    {
      headers: {
        Authorization: `Bearer ${WDToken}`,
      },
    }

  );
}

// ========================= End CURD For user =================================

// ======================== CURD from product =================================

export const getProducts = async () => {
  return await axios.get(`${localApi}/api/getProducts`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


// ======================== END CURD from product =================================


// ========================  CURD from Cart =================================

// add item to cart
export const addCartItem = async (data) => {
  return await axios.post(`${localApi}/api/addCartItem`, data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}

// remove item from cart
export const removeCartItem = async (data) => {
  return await axios.get(`${localApi}/api/removeCartItem?CID=${data.CID}&product_id=${data.product_id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


export const getCartItem = async (data) => {
  return await axios.get(`${localApi}/api/getCartItem?CID=${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


export const getProductDetails = async (data) => {
  return await axios.get(`${localApi}/api/getProductDetails?products=${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


export const updateQuantity = async (data) => {
  return await axios.patch(`${localApi}/api/updateQuantity`,data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
}


// ========================  END CURD from Cart =================================