import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () => {
    const {isOpen, setIsOpen, cartCount} = useContext(CartContext);
    const toggleIsCartOpen = () => setIsOpen(!isOpen);
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shop-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )

}

export default CartIcon;