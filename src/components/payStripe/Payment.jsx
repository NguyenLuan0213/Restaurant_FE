import React, { useEffect, useState } from "react";
import { CardElement, Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import "./payment.css";
import Footer from '../footer/footer';
import Header from '../header/header';

import { set } from "date-fns";

const stripePromise = loadStripe("pk_test_51MlntRFtuguvBwBePPJrdA6ZJ6CtY5Or5sJqf1vH8qi1eT7oyikE8pZSgS8o70aI8qgZeInyfEv00yvMveVMl7Xu00yJetHxZl")

function Payment() {
    const { orderID } = useParams();
    const [orderData, setOrderData] = useState({
        id: null,
        cashierId: null,
        customerId: null,
        tableId: null,
        orderTime: null,
        status: null,
        totalPrice: null
    });
    const [orderDataPay, setOrderDataPay] = useState(null)
    const [clientSecret, setClientSecret] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [discountedAmount, setDiscountedAmount] = useState(0);
    const [promoName, setPromoName] = useState("");
    const [finalPrice, setFinalPrice] = useState(0);
    const [promoId, setPromoId] = useState(null);

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
                setFinalPrice(data.totalPrice);

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

    const handlePaymentIntent = () => {
        fetchData();
    };

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


    const applyPromoCode = async () => {
        const promoCode = document.getElementById("promoCodeInput").value;

        try {
            const response = await fetch(`https://localhost:7274/api/promotion/${promoCode}`);
            if (!response.ok) {
                throw new Error("Lỗi khi gọi API khuyến mãi");
            }

            const data = await response.json();
            if (data && data.promotionName) {
                const currentDate = new Date();
                const startDate = new Date(data.startDate);
                const endDate = new Date(data.endDate);

                if (currentDate >= startDate && currentDate <= endDate) {
                    setPromoName(data.promotionName);
                    setDiscountedAmount(data.discount);
                    setStartDate(startDate.toISOString().split('T')[0]);

                    // Tính giá trị mới và cập nhật finalPrice
                    const newFinalPrice = orderData.totalPrice - (orderData.totalPrice * (data.discount / 100));
                    setFinalPrice(newFinalPrice);

                    // Cập nhật giá tiền mới cho orderData
                    const updatedOrderData = { ...orderData, totalPrice: newFinalPrice };
                    setOrderData(updatedOrderData);
                    setPromoId(data.id);

                    setEndDate(endDate.toISOString().split('T')[0]);
                } else {
                    alert("Khuyến mãi đã hết hạn.");
                    resetPromoValues();
                }
            } else {
                alert("Mã khuyến mãi không hợp lệ hoặc không tồn tại.");
                resetPromoValues();
            }
        } catch (error) {
            alert("không tồn tại mã khuyến mãi:", error);
            resetPromoValues();
        }
    };

    // Hàm này giúp reset giá trị khuyến mãi khi có lỗi hoặc không hợp lệ
    const resetPromoValues = () => {
        setPromoName("");
        setDiscountedAmount(0);
        setStartDate("");
        setEndDate("");
        setFinalPrice(orderData.totalPrice);
        setPromoId(null);

        // Đồng thời, cập nhật giá tiền mới cho orderData
        setOrderData({ ...orderData, totalPrice: orderData.totalPrice });
    };


    return (
        <>
            <Header />
            <div className="container" style={{ marginTop: "110px" }}>
                <h1 className="h1-edit">THANH TOÁN</h1>
                <div className="row" style={{ border: '1px solid #ccc' }}>
                    <div className="col-6" style={{ borderRight: '1px solid #ccc', paddingRight: '10px' }}>
                        <h2 className="h2-edit"> ĐƠN ĐẶT BÀN SỐ {orderID}</h2>
                        <div>
                            <div style={{ borderTop: '1px solid #ccc' }}>
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
                            <div style={{ borderTop: '1px solid #ccc' }}>
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
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ borderTop: '1px solid #ccc' }}>
                                <p className="p_tt">Nhập mã khuyến mãi</p>
                                <div style={{ marginTop: "5px" }}>
                                    <div className="edit-promo">
                                        <input
                                            type="text"
                                            id="promoCodeInput"
                                            placeholder="Nhập mã khuyến mãi"
                                        />
                                        <button className="button-edit" onClick={applyPromoCode}>Áp dụng</button>
                                    </div>
                                    <div>
                                        <div className="edit-div">
                                            <span className="span-edit">Tên khuyến mãi:</span>
                                            <span className="span-edit">{promoName}</span>
                                        </div>
                                        <div className="edit-div">
                                            <span className="span-edit">Số phần trăm khuyến mãi:</span>
                                            <span className="span-edit">{discountedAmount} %</span>
                                        </div>
                                        <div className="edit-div">
                                            <span className="span-edit">Ngày Bắt Đầu:</span>
                                            <span className="span-edit">{startDate}</span>
                                        </div>
                                        <div className="edit-div">
                                            <span className="span-edit">Ngày kết thúc:</span>
                                            <span className="span-edit">{endDate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handlePaymentIntent}
                            style={{
                                backgroundColor: "#007bff",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "4px",
                                border: "none",
                                cursor: "pointer",
                                marginTop: "10px",
                                display: "block", // Hiển thị nút như một khối
                                margin: "0 auto", // Canh giữa theo chiều ngang\
                                marginBottom: "10px",
                            }}
                        >
                            Tạo Thanh Toán
                        </button>

                    </div>

                    <div className="col-6 mt-3 mb-3">
                        {clientSecret && stripePromise && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm orderID={orderID} promoId={promoId} />
                            </Elements>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Payment;
