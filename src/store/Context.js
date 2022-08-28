import { createContext, useContext, useReducer } from "react";
import { globalSwitch } from './Reducer.js'



const GlobalContext = createContext();

const Context = ({ children }) => {


    const [state, dispatch] = useReducer(globalSwitch, {
        Auth: {
            isAuth: false,
            CID: undefined,
            email: undefined,
            username: undefined,
            token: undefined
        },
        LogBox: {
            open: false,
            type: undefined
        },
        Notify: {
            variant: null,
            open: false,
            message: null
        }
    });

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )

}

export const Store = () => {
    return useContext(GlobalContext)
}

export default Context;

