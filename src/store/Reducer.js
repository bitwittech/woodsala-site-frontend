import { Auth, LogBox, Notify,
  AddCartItem,
  RemoveItem,
  AddQTY,
  SubOTY, } from './Types'

export const globalSwitch = (state, action) => {
  switch (action.type) {
    case Auth:
      // console.log(action.payload)
      return { ...state, Auth: { ...action.payload } };
    case LogBox:
      return { ...state, LogBox: { ...action.payload } }
    case Notify:
      return { ...state, Notify: { ...action.payload } }
    case AddCartItem:
      localStorage.setItem('cart',JSON.stringify(action.payload))
      return {...state,AddCartItem : {...action.payload}}
      default:
      return state;
  }
}
