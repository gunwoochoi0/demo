const notifications = require('notifications');
const db = require('./database');

const stripe = require('stripe')('your_stripe_secret_key');


// 1. Create Customer
const createCustomer = async (email, cardToken) => {
    try {
        const customer = await stripe.customers.create({
            email: email,
            source: cardToken
        });
        return customer;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

// 2. Create Charge
const createCharge = async (customerId, amount) => {
    try {
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customerId,
            description: 'Charge for product or service'
        });
        return charge;
    } catch (error) {
        console.error('Error creating charge:', error);
        throw error;
    }
};

const handlePaymentConfirmation = async (charge, phoneNumber) => {
    if (charge.paid) {
        console.log('Payment successful:', charge);
        await notifications.sendSMSConfirmation(phoneNumber, 'Payment successful for your recent transaction.');
        await db.logPaymentConfirmation(charge.id, 'payment successful')
    } else {
        console.error('Payment failed:', charge);
        await notifications.sendSMSConfirmation(phoneNumber, 'Payment failed for your recent transaction.');
        await db.logPaymentConfirmation(charge.id, 'payment failed');
    }

    db.saveTransactionData({
        id: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        status: charge.status
    });
};

// Example Usage
export const processTransaction = async () => {
    try {
        const customer = await createCustomer('customer@email.com', 'tok_visa');
        // Additional support. Retry transactions in case of failures
        for (let i = 0; i < 3; i++) {
            const charge = await createCharge(customer.id, 2000);
            if (charge.status === 'succeeded') {
                break;
            }
        }
        handlePaymentConfirmation(charge);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
};

