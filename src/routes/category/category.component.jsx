import { useState, useEffect, Fragment} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import './category.styles.scss';

/**
 * Notes:
 * a case of loading page?
 * get async component-> need a safeguard, component && render(component), render when exists
 */
const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    // is ok, but we don't need to get it each time the component renders
    // const products = categoriesMap[category]; 
    const [products, setProducts] = useState(categoriesMap[category]); // at beginning, categoriesMap is an empty object
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            <div className="category-container">
                {/**safeguard, only renders when products is defined, but get products from firestore is async, but render component is sync */}
                {   products && 
                    products.map((product) => (<ProductCard key={product.id} product={product}/>))
                }
            </div>
        </Fragment>
    )

}
export default Category;
/**
 * The useParams hook returns an object of key/value pairs of the dynamic params from the current URL 
 * that were matched by the <Route path>. Child routes inherit all params from their parent routes.
 */