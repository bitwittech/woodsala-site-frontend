// This file has will collect all the reducers in global reducer
import {combineReducers} from 'redux'

// reducer import 
import {alert, box,thanks} from './utilityReducers';
import {auth} from './authReducer';
import {cart} from './cartReducer';

const globalReducer = combineReducers({
    alert,
    auth,
    box,
    cart,
    thanks
})

export default globalReducer;