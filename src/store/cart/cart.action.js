import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


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

export const setIsOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
        const newcartItems = addCartItem(cartItems, productToAdd)
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS , newcartItems)
    }
    
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
        const newcartItems = removeCartItem(cartItems, cartItemToRemove)
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS , newcartItems)
    }
    
export const clearCartItem = (cartItems, itemToDelete) => {
        const newcartItems = clearItem(cartItems, itemToDelete)
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS , newcartItems)
    }

