import { CART_ACTION_TYPES } from "./cart.types"
// 1. set initial state：only readable variable
export const CART_INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
}
// 2. create reducer: reducer return only readable variable. set states of the varaibles, do other things out of reducer
//generic function
// what reducer does: set new state!
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const {type, payload} = action
    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            }
        case CART_ACTION_TYPES.SET_IS_OPEN:
            return {
                ...state,
                isOpen: payload,
            }
        default:
            return state
    }

}