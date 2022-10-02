import { createContext, useState } from "react";
//context: just a component, makes state and setState externally


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
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}