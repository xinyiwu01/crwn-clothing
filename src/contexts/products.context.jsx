import { createContext, useState, useEffect} from "react";
import PRODUCTS from '../shop-data.json'
//context: just a component, makes state and setState externally

//as the actual value you want to access
export const ProductsContext = createContext({
    //initial value for context, object-->null
    products: [],
    //setCurrentProduct: () => null,
});
//component, allow get value
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS); //initial value for state
    const value = {products};
    return <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>
}