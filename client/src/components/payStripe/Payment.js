import { useEffect, useState } from "react";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import { loadStripe } from "@stripe/stripe-js";

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("/config").then(async (r) => {
            const { publishableKey } = await r.json();
            console.log(publishableKey);
            setStripePromise(loadStripe(publishableKey));

        });
    }, []);

    useEffect(() => {
        fetch("/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (result) => {
            var { clientSecret } = await result.json();
            setClientSecret(clientSecret);
        });
    }, []);

    return (
        <>
            <div className="container" style={{ marginTop: '100px' }}>
                <h1>React Stripe and the Payment Element</h1>
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm />
                    </Elements>
                )}
            </div>
        </>
    );
}

export default Payment;