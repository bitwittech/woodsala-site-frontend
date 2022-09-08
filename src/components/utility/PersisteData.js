import React, {useEffect} from 'react';

// state 
import {Store} from "../../store/Context" 

// type
import {Auth, AddCartItem} from "../../store/Types";


const PersisteData = () => {
    
    const {state,dispatch} = Store()

    // for data persistance
    
    useEffect(()=>{
      if (localStorage.getItem('payload'))
      {
         dispatch({
           type : Auth,
           payload : JSON.parse(localStorage.getItem('payload'))
         })
      }
      if (localStorage.getItem('cart')!== null)
      {
        JSON.parse(localStorage.getItem('cart')).items.map(async(item,index)=>{
        console.log(index)

            return await dispatch({
                type : AddCartItem,
                payload : {items : [...state.AddCartItem.items,
                    {
                    CID : state.Auth.CID || 'Not Logged In',
                    product_id : item.product_id,
                    quantity : item.quantity,
                  }]}
              })
        })
      }
     },[])
   

    return (
        <div>
            
        </div>
    );
}

export default PersisteData;
