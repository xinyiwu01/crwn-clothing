import { createContext, useEffect, useReducer} from "react";
//context: just a component, makes state and setState externally
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";


//as the actual value you want to access
export const UserContext = createContext({
    //initial value for context, object-->null
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
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
            throw new Error(`unhandled type ${type}` in userReducer)
    }

}
const INITIAL_STATE = {
    currentUser: null
}
//component, allow get value
export const UserProvider = ({children}) => {
    // dispatch takes in an action and pass the action
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser)
    //const {currentUser} = state: 2nd way for destructure
    //const [currentUser, setCurrentUser] = useState(null); //initial value for state
    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {                                    //callback
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                // create based on uid from snapshot
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        })
        return unsubscribe
    }, []);
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}

/**
 * reducer: just return a new object
 * const userReducer = (state, action) => {
 *      return {
 *          currentUser
 *      }
 * }
 * replace useState with useReducer
 */