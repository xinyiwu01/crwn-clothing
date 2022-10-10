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

const removeCartItem = (cartItems, cartItemToMove) => {
    const itemToRemove = cartItems.find((item) => item.id === cartItemToMove.id)
    if (itemToRemove.quantity === 1) {
        // keep items match the condition
        return cartItems.filter(cartItem => cartItem.id !== itemToRemove.id)
    }
    return cartItems.map(
        (item) => item.id ===  cartItemToMove.id
        ? {...item, quantity: item.quantity - 1} 
        : item)
}

const clearItem = (cartItems, itemToDelete) => {
    const targetItem = cartItems.find((item) => item.id === itemToDelete.id)
    return cartItems.filter(cartItem => cartItem.id !== targetItem.id)
}

//as the actual value you want to access
export const CartContext = createContext({
    //initial value for context, object-->null
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    clearCartItem: () => {},
    cartCost: 0,
});
//component, allow get value
export const CartProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false); //initial value for state
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartCost, setCartCost] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartCost = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartCost(newCartCost);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }
    
    const clearCartItem = (itemToDelete) => {
        setCartItems(clearItem(cartItems, itemToDelete))
    }

    const value = {isOpen, setIsOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearCartItem, cartCost};
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>
}

/* Render
!why in addCartItem and removeCartItem, we always create new object and return?
Because in CartItem component, (cartItem) is a props to pass in and generate item UI based on {cartItem}.
React only re-renders when props change or setState. If we only update old cartItem.quantity, react won't 
notice the change. But if we create a new item object, react will compare it with the old one, and notice 
quantity props has been updated, so it will re-render the UI.
*/