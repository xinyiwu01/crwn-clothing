import { loadStripe } from '@stripe/stripe-js';
                             // this is our stripe by key
export const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);