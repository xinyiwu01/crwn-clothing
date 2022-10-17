import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { clearCartItem, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    //const {clearCartItem, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addHandler = ()=> dispatch(addItemToCart(cartItems, cartItem));
    const removeHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const clearHandler = ()=> dispatch(clearCartItem(cartItems, cartItem)); // not call this method,otherwise infinite loop, just a refer to the function
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name} </span>
            <span className='quantity'>
                <div className='arrow'onClick={removeHandler} >&#10094;</div>
                <span className='value'> {quantity} </span>
                <div className='arrow'onClick={addHandler} >&#10095;</div>
            </span>
            <span className='price'>{price} </span>
            <div className='remove-button' onClick={ clearHandler }> &#10005;</div> {/**in html, &#10005; represents X */}
        </div>
    );
};

export default CheckoutItem;