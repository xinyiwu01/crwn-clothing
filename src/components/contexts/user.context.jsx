import { createContext, useState, useEffect} from "react";
//context: just a component, makes state and setState externally
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


//as the actual value you want to access
export const UserContext = createContext({
    //initial value for context, object-->null
    currentUser: null,
    setCurrentUser: () => null,
});
//component, allow get value
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null); //initial value for state
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