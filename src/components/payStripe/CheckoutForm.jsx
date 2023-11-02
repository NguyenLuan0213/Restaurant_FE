import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ orderID }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        if (error != null) {
            setMessage(error.message);
        } else {
            try {
                const formData = {
                    orderId: orderID,
                    status: 'Đã thanh toán',
                    promotionId: null,
                };
                const response = await fetch(`https://localhost:7274/api/orders/paysuccces/${orderID}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });


                if (response.ok) {
                    alert('Đã nhận tiền từ khách hàng và cập nhật trạng thái thành công.');
                } else {
                    alert('Lỗi khi cập nhật trạng thái thanh toán.');
                }
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }

        console.log(error);
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page

                return_url: "http://localhost:3456/successpay",
            },
        });


        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
            <button className="mt-3" disabled={isLoading || !stripe || !elements} id="submit" style={{ display: "block", margin: "0 auto" }}>
                <span id="button-text" >
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh Toán Ngay"}
                </span>
            </button>
        </form>

    );
}