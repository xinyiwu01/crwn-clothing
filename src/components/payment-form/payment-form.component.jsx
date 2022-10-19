import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, {BUTTON_TYPE_CLASS} from '../button/button.component';
import './payment-form.styles.scss';
import { selectCartCost } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartCost);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault(); // prevent default form submission
        if (!stripe || !elements) {
            return;
        }
        setIsProcessingPayment(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ amount:  amount * 100 }), //stripe expects cents
          }).then((res) => res.json());

        //const clientSecret = response.paymentIntent.client_secret
        const {paymentIntent: {client_secret}} = response
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'guest',
                }
            }
        })

        setIsProcessingPayment(false);
        if (paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status ==='succeeded') {
                alert("Payment Successful")
            }
        }
    }
    return (
        <div className='payment-form-container'>
            <div className='form-container'>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button disabled={isProcessingPayment} buttontype={ BUTTON_TYPE_CLASS.inverted } onClick={paymentHandler}>Pay Now</Button>
            </div>
        </div>
    )

}

export default PaymentForm;