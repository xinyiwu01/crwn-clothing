import { useDispatch, useSelector } from 'react-redux';
import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { selectIsOpen, selectCartCount } from '../../store/cart/cart.selector';
import { setIsOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    //const {isOpen, setIsOpen, cartCount} = useContext(CartContext);
    const isOpen = useSelector(selectIsOpen);
    const cartCount = useSelector(selectCartCount);
    const dispatch = useDispatch();

    const toggleIsCartOpen = () => dispatch(setIsOpen(!isOpen));
    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shop-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )

}

export default CartIcon;