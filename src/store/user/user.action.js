import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";
export const setCurrentUser = (user) => 
     createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)

/**
 * If your arrow function is being wrapped in curly braces then you need to use the return statement as curly braces are used for multiline functions.

// Function body wrapped in curly braces

export const setCurrentUser = (user) => {

    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}


If your arrow function is inline (no curly braces) as shown in the lecture, you do not need to use the return statement as whatever is to the right of the arrow is automatically returned.

// Inline function body

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);


 */
 