import React, { useState, useEffect } from 'react';
import './cart.css';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        // Lấy danh sách sản phẩm từ sessionStorage
        const storedCart = sessionStorage.getItem('cart');

        if (storedCart) {
            // Chuyển đổi chuỗi JSON thành mảng JavaScript
            const parsedCart = JSON.parse(storedCart);

            // Cập nhật biến state 'cart' với danh sách sản phẩm từ sessionStorage
            setCart(parsedCart);
        }
    }, []);

    const handleItemCountChange = (e, index) => {
        const updatedCart = [...cart];
        const newCount = parseInt(e.target.value, 10);

        if (!isNaN(newCount) && newCount >= 0) {
            updatedCart[index].count = newCount;
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    };

    const handleRemoveItem = (index) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1); // Xóa sản phẩm khỏi mảng

            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
    };

    const handlePayment = () => {
        // Thực hiện logic thanh toán ở đây, ví dụ:
        // - Gửi dữ liệu giỏ hàng lên máy chủ
        // - Xử lý thanh toán

        // Nếu thanh toán thành công
        setPaymentSuccess(true);

        // Xóa giỏ hàng từ sessionStorage
        sessionStorage.removeItem('cart');
        setCart([]);
    };

    return (
        <>
            <div className="cart" style={{ marginTop: '100px' }}>
                <div className="container border">
                    <div className='row-8 mt-2'>
                        {cart.map((item, index) => (
                            <div key={index} className="cartItem">
                                <div>
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div>
                                    <p>{item.name}</p>
                                </div>
                                <div>
                                    <p>{item.price} VNĐ</p>
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        value={item.count}
                                        onChange={(e) => handleItemCountChange(e, index)}
                                    />
                                </div>
                                <div>
                                    <p> {item.count * item.price} VND</p>
                                </div>
                                <div>
                                    <button className="delete-button" onClick={() => handleRemoveItem(index)}>Xóa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='row-4' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="cartTotal">
                            <p>Tổng tiền: {cart.reduce((total, item) => total + item.count * item.price, 0)} VND</p>
                        </div>
                        <button className="btn btn-primary" onClick={handlePayment}>Thanh toán</button>
                    </div>
                    {paymentSuccess && (
                        <div className="payment-success">
                            <p>Thanh toán thành công!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
