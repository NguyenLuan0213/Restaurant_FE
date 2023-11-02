import React, { useEffect, useState } from "react";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import "./payment.css";
import { set } from "date-fns";

const stripePromise = loadStripe("pk_test_51MlntRFtuguvBwBePPJrdA6ZJ6CtY5Or5sJqf1vH8qi1eT7oyikE8pZSgS8o70aI8qgZeInyfEv00yvMveVMl7Xu00yJetHxZl")

function Payment() {
    const { orderID } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [orderDataPay, setOrderDataPay] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7274/api/orders/${orderID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Lỗi khi lấy thông tin đơn hàng");
                }

                const data = await response.json();
                setOrderData(data);

            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        // Gọi hàm fetchData() khi thành phần được tạo hoặc orderID thay đổi
        fetchData();
    }, [orderID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://localhost:7274/api/orders/pay/${orderID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Lỗi khi lấy thông tin đơn hàng");
                }

                const data = await response.json();
                setOrderDataPay(data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        // Gọi hàm fetchData() khi thành phần được tạo hoặc orderID thay đổi
        fetchData();
    }, [orderID]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (orderData) {
                    const createPaymentIntentResponse = await fetch("https://localhost:7274/api/checkout/create-payment-intent", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(orderData),
                    });

                    if (createPaymentIntentResponse.status === 200) {
                        const clientSecretData = await createPaymentIntentResponse.json();
                        setClientSecret(clientSecretData.clientSecret);
                    } else {
                        alert("Lỗi khi lấy dữ liệu từ máy chủ");
                    }
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchData();
    }, [orderData]);

    return (
        <div className="container" style={{ marginTop: "110px" }}>
            <h1 className="h1-edit">THANH TOÁN</h1>
            <div className="row" style={{ border: '1px solid #ccc' }}>
                <div className="col-6" style={{ borderRight: '1px solid #ccc', paddingRight: '10px' }}>
                    <h2 className="h2-edit">ĐẶT BÀN SỐ {orderID}</h2>
                    <div className="row">
                        <div className="col-6 " style={{ borderRight: '1px solid #ccc', borderTop: '1px solid #ccc' }}>
                            <p className="p_tt">Thông tin khách hàng</p>
                            <div>
                                <div className="edit-div">
                                    <span className="span-edit">Tên Khách Hàng:</span>
                                    <span className="span-edit">{orderDataPay && orderDataPay.customer.fullname}</span>
                                </div>
                                <div className="edit-div">
                                    <span className="span-edit">Email:</span>
                                    <span className="span-edit">{orderDataPay && orderDataPay.customer.email}</span>
                                </div>
                                <div className="edit-div">
                                    <span className="span-edit">Số điện thoại:</span>
                                    <span className="span-edit">{orderDataPay && orderDataPay.customer.phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 " style={{ borderTop: '1px solid #ccc' }}>
                            <p className="p_tt">Thông tin đặt bàn</p>
                            <div>
                                <div className="edit-div">
                                    <span className="span-edit">Tên Order:</span>
                                    <span className="span-edit">{orderDataPay && orderID}</span>
                                </div>
                                <div className="edit-div">
                                    <span className="span-edit">Ngày Đặt Bàn:</span>
                                    <span className="span-edit">{orderDataPay && orderDataPay.orderTime}</span>
                                </div>
                                <div className="edit-div">
                                    <span className="span-edit">Số tiền:</span>
                                    <span className="span-edit">
                                        {orderDataPay && new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderDataPay.totalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-6 mt-3 mb-3">
                    {clientSecret && stripePromise && (
                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm orderID={orderID}/>
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Payment;
