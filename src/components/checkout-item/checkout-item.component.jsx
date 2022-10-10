import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const {clearCartItem, addItemToCart, removeItemFromCart} = useContext(CartContext);
    const addHandler = ()=> addItemToCart(cartItem);
    const removeHandler = () => removeItemFromCart(cartItem);
    const clearHandler = ()=> clearCartItem(cartItem); // not call this method,otherwise infinite loop, just a refer to the function
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