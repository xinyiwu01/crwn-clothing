import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import Button from '../button/button.component';
import './product-card.styles.scss';

const ProductCard= ({product}) => {
    const {name, price, imageUrl} = product;
    //const {addItemToCart} = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttontype={'inverted'} onClick={addProductToCart} >Add to cart</Button>
        </div>
    );
}

export default ProductCard;