import { createContext, useState, useEffect} from "react";
//context: just a component, makes state and setState externally

//as the actual value you want to access
export const CartContext = createContext({
    //initial value for context, object-->null
    isOpen: false,
    setIsOpen: () => {},
});
//component, allow get value
export const CartProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false); //initial value for state
    const value = {isOpen, setIsOpen};
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}