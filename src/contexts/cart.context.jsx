import { createContext, useState, useEffect} from "react";
//context: just a component, makes state and setState externally
const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item) => item.id === productToAdd.id)
    if (existingItem) {
        return cartItems.map(
            (item) => item.id === productToAdd.id
            ? {...item, quantity: item.quantity + 1} 
            : item)
    }
    return [...cartItems, {...productToAdd, quantity: 1}]

}

//as the actual value you want to access
export const CartContext = createContext({
    //initial value for context, object-->null
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,

});
//component, allow get value
export const CartProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false); //initial value for state
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = {isOpen, setIsOpen, cartItems, addItemToCart, cartCount};
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}