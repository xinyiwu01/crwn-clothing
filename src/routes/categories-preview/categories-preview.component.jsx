import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/category.selector";


const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    return (
        < Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (< CategoryPreview key = {title} title = {title} products = {products}/>);
                }
                )
            }
        </Fragment>
        // <Fragment>
        //     {Object.keys(categoriesMap).map((title) => (
        //         <Fragment key={title}>
        //             <h2>{title}</h2>
        //             <div className="products-container">
        //                 {categoriesMap[title].map((product) => (
        //                     <ProductCard key={product.id} product={product}/>
        //                 ))}
        //             </div>
        //         </Fragment>
        //     ))}
        // </Fragment>

        /* <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div> */
    )
}

export default CategoriesPreview;