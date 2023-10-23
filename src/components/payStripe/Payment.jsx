import React, { useState, useEffect } from 'react';

const PaymentForm = ({ paymentSessionId }) => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard'); // Hoặc chọn phương thức thanh toán mặc định
    const [isLoading, setIsLoading] = useState(false);

    const handlePaymentSubmit = async () => {
        setIsLoading(true);

        try {
            // Thực hiện yêu cầu thanh toán bằng paymentSessionId và paymentMethod
            const response = await fetch('https://localhost:7274/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentSessionId, // Truyền paymentSessionId đã lấy từ tạo session
                    paymentMethod,    // Phương thức thanh toán đã chọn (creditCard, PayPal, v.v.)
                }),
            });

            if (response.ok) {
                // Thanh toán thành công
                // Cập nhật trạng thái đơn hàng (nếu cần)

                // Hiển thị thông báo thành công hoặc chuyển người dùng đến trang xác nhận thanh toán
                alert('Thanh toán thành công');
                // Hoặc thực hiện chuyển hướng trang, ví dụ: history.push('/xac-nhan-thanh-toan');
            } else {
                // Thanh toán thất bại
                alert('Lỗi khi thanh toán');
            }
        } catch (error) {
            alert('Lỗi khi thanh toán: ' + error.message);
        }

        setIsLoading(false);
    };

    return (
        <div>
            {isLoading ? (
                <p>Đang xử lý thanh toán...</p>
            ) : (
                <form>
                    <div>
                        <label>Chọn phương thức thanh toán:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="creditCard">Thẻ tín dụng</option>
                            <option value="paypal">PayPal</option>
                            {/* Thêm các phương thức thanh toán khác (nếu cần) */}
                        </select>
                    </div>
                    <button onClick={handlePaymentSubmit}>Thanh toán</button>
                </form>
            )}
        </div>
    );
};

export default PaymentForm;
