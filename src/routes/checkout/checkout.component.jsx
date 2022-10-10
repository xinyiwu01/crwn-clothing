import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const {cartItems, cartCost} = useContext(CartContext);
    
    
    return (
        <div className="checkout-container">
            <div className="checkout-header" >
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Delete</span>
                </div>
            </div>
            {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem = {cartItem} />
            ))}
                
            {/** 
             * const {id, name, quantity} = cartItem
                return <div key={id}>
                    <h2>{name}</h2>
                    <span>{quantity}</span>
                    <br/>
                    <span onClick={() => removeItemFromCart(cartItem)}> decrement</span>
                    <br/>
                    {/**make onClick refer to the method, not call it, to avoid infinite loop, see https://stackoverflow.com/questions/48497358/reactjs-maximum-update-depth-exceeded-error 
                    <span onClick={()=> addItemToCart(cartItem)}>increment</span>
                    </div>
            })}
            */}
            <span className="total">Total: ${cartCost} </span>
        </div>
    )
}
export default Checkout;