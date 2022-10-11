import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";


const CategoriesPreview = () => {
    //const {products} = useContext(CategoriesContext);
    const {categoriesMap} = useContext(CategoriesContext);

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