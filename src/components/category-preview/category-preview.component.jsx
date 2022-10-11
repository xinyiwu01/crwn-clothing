import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';
const CategoryPreview = ({title, products}) => {
    return (
        <div className="category-preview-container">
            <h2> 
                <Link to={title} className="title"> {title.toUpperCase()} </Link> {/**make only text clickable */}
            </h2>
            <div className="preview">
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => < ProductCard key = {product.id} product = {product}/>)
                }
            </div>
        </div>
    )

}

export default CategoryPreview;

/**
 * // Arrow function
filter((element) => {  } )
filter((element, index) => {  } )
filter((element, index, array) => {  } )

//
Link: make it clickable to a url
Routes: url -> page(component renders)
 */