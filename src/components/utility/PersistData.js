import { SatelliteAltTwoTone } from '@mui/icons-material';
import React, { useEffect } from 'react';

// state 
import { Store } from "../../store/Context"

// type
import { Auth, AddCartItem } from "../../store/Types";

// api server
// import {getCartItem} from '../../service/service'

const PersisteData = () => {

  const { state, dispatch } = Store()

  // for data persistance

  useEffect(() => {

    // For Auth persistance
    if (localStorage.getItem('payload')) {
      dispatch({
        type: Auth,
        payload: JSON.parse(localStorage.getItem('payload'))
      })
    }

    // cart persistance 

    if (localStorage.getItem('cart') !== null) {
      // console.log(localStorage.getItem('cart'))

      dispatch({
        type: AddCartItem,
        payload: JSON.parse(localStorage.getItem('cart'))
      })
    }

  }, [])


  return (
    <div>

    </div>
  );
}

export default PersisteData;
