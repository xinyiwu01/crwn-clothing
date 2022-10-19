/**
 * receive a request,
 * get param, like amount,
 * register on stripe, create a payment intent
 * send back the response
 */

// like in Node, require: import   config, process env variables
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//event: like request and response in Express
exports.handler = async (event) => {
    try {
        const {amount} = JSON.parse(event.body);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });
        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent})
        }

    } catch (error) {
        console.log({error});
        return {
            statusCode: 400,
            body: JSON.stringify({error})
        }
    }

}  

/**
 * command: netlify doesn't work
 * use 'npm run netlify'
 * run all commands locally: npm run + netlify commands
 */