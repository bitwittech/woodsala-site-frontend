// ================= // This file holds all the backend services -======================
const axios = require('axios');

let localApi = 'http://localhost:8000'
let official = 'http://134.209.150.190'


// ========================= CURD For user =================================

export const register = async(data)=>{
    return await axios.post(`${localApi}/api/register`,data);
}
export const login = async(data)=>{
    return await axios.post(`${localApi}/api/login`,data);
}


// for  adding category to the list
// export const addCategory = async (data) => {
//     return await axios.post(`${official}/addCategory`, data, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("WDToken")}`,
//       },
//     });
//   };
  

// ========================= End CURD For user =================================