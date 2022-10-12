import { createContext, useReducer} from "react";
import  {createAction}  from "../utils/reducer/reducer.utils";
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
    removeItemFromCart: () => {},
    clearCartItem: () => {},
    cartCost: 0,
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_OPEN: 'SET_IS_OPEN',
}

// 1. set initial state：only readable variable
const INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    cartCost: 0,
}
// 2. create reducer: reducer return only readable variable. set states of the varaibles, do other things out of reducer
//generic function
// what reducer does: set new state!
const cartReducer = (state, action) => {
    const {type, payload} = action
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_OPEN:
            return {
                ...state,
                isOpen: payload,
            }
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`)
    }

}

//3. in provider, call reducer and dispatch actions with payload

//component, allow get value
export const CartProvider = ({children}) => {
    // const [isOpen, setIsOpen] = useState(false); //initial value for state
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartCost, setCartCost] = useState(0);
           //destructure from state
    const [{cartItems, isOpen, cartCost, cartCount}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // }, [cartItems]);

    // useEffect(() => {
    //     const newCartCost = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartCost(newCartCost);
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartCost = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        // useEffect: modify seperately
        // reducer: one dispatch modify multiple readable values. use it when need to update multiple values at the same time
       
        //dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: {cartItems: newCartItems, cartCount: newCartCount, cartCost: newCartCost,}})
        //one optimization: createAction
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartCount: newCartCount, cartCost: newCartCost,}));
        /*
        generate newCartCount

        generate newCartCost

        dispatch new actions with payload = {
            newCartItems,
            newCartCount,
            newCartCost
        }
        */

    }
    const addItemToCart = (productToAdd) => {
        const newcartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newcartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newcartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newcartItems)
    }
    
    const clearCartItem = (itemToDelete) => {
        const newcartItems = clearItem(cartItems, itemToDelete)
        updateCartItemsReducer(newcartItems)
    }

    const setIsOpen = (bool) => {
        //dispatch({type: CART_ACTION_TYPES.SET_IS_OPEN, payload: bool})
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_OPEN, bool))
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