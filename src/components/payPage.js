import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Pay from './pay/pay';
import Payment from './payStripe/Payment';
import Footer from './footer/footer';
import Header from './header/header';

const stripePromise = loadStripe("pk_test_51MlntRFtuguvBwBePPJrdA6ZJ6CtY5Or5sJqf1vH8qi1eT7oyikE8pZSgS8o70aI8qgZeInyfEv00yvMveVMl7Xu00yJetHxZl");


const PayPage = () => {
    const [clientSecret, setClientSecret] = useState("");

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <>
            <Header />
            <div className='container mt-3'>
                <Pay />
                {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                        <Payment />
                    </Elements>
                )}
            </div>
            <Footer />
        </>

    )
}

export default PayPage;
