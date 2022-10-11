import { createContext, useState, useEffect} from "react";
import SHOP_DATA from '../shop-data.js';
//import PRODUCTS from '../shop-data.json'
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";
//context: just a component, makes state and setState externally

//as the actual value you want to access
export const CategoriesContext = createContext({
    //initial value for context, object-->null
    categoriesMap: {},
    //setCurrentProduct: () => null,
});
//component, allow get value
export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}); //initial value for state, from PRODUCTS to []
    const value = {categoriesMap};
    /** 
     * do it only once, comment it, don't need to add data to firestore each time, usually do it in front end
    useEffect(() => {
        addCollectionAndDocuments("categories", SHOP_DATA);
    }, [])
    */
   useEffect(()=> {
    // in use effect, any async thing should be wrapped in a new async function, can't directly async () => {}
    const getCategoryMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        console.log(categoryMap);
        setCategoriesMap(categoryMap);
    }
    getCategoryMap(); // invoke after creating
   }, [])
    return <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>
}