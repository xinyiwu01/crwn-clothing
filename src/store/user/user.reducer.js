import { USER_ACTION_TYPES } from "./user.types"
const INITIAL_STATE = {
    currentUser: null
}
// since we don't have useReducer hook anymore, pass Initial state directly
export const userReducer = (state = INITIAL_STATE, action) => {
    console.log('dispatched')
    console.log(action)
    const {type, payload} = action;
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return  {
                ...state, //keep other unchanged for multiple props
                currentUser: payload
            }
        default:
            return state // return original state, because the dispatch has nothing to do with user, other reducers in redux store
            //throw new Error(`unhandled type ${type} in userReducer`)
    }

}
