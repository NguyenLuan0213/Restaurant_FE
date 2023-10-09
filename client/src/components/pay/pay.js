import React, { useState, useEffect } from 'react';
import apis, { endpoints, authAPI } from '../configs/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pay.css';
import '../default.css';

const Pay = () => {
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Thêm state để lưu ID đơn hàng đã chọn
  const [error, setError] = useState(null);

  const handlePhoneNumberChange = (event) => {
    setCustomerPhoneNumber(event.target.value);
  };

  const handleGetOrders = async () => {
    try {
      // Gửi yêu cầu HTTP GET đến endpoint với số điện thoại của khách hàng
      const response = await authAPI().get(endpoints['PayByPhone'](customerPhoneNumber));

      // Lấy danh sách đơn hàng từ phản hồi
      const orderData = response.data;

      // Cập nhật danh sách đơn hàng trong state
      setOrders(orderData);

      // Xóa thông báo lỗi nếu có
      setError(null);
    } catch (error) {
      // Xử lý lỗi nếu có
      setError('Không tìm thấy đơn hàng hoặc khách hàng');
      setOrders([]);
    }
  };

  const handlePayment = async (id) => {
    try {
      const paymentStatus = 'Đã thanh toán';

      let formData = new FormData()
      let res = null

      formData.append("status", paymentStatus);
      res = await authAPI().put(endpoints['makePayment'](id), formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      alert('Đã thanh toán thành công');
      window.location.reload();
    } catch (error) {
      alert('Lỗi khi thanh toán: ' + error.message);
    }
  };

  const handleCancel = async (id) => {
    try {
      const paymentStatus = 'Đã hủy';

      let formData = new FormData()
      let res = null

      formData.append("status", paymentStatus);
      res = await authAPI().put(endpoints['makePayment'](id), formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      alert('Đã hủy đơn hàng thành công');
      window.location.reload();
    } catch (error) {
      alert('Lỗi khi hủy đơn hàng: ' + error.message);
    }
  };

  return (
    <div className="pay">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h2>ĐƠN HÀNG</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập số điện thoại khách hàng"
                value={customerPhoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handleGetOrders}>
              Lấy Đơn Hàng
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {orders.length > 0 && (
              <div className="mt-3">
                <ul>
                  <div className="mt-3">
                    <h3>Danh sách đơn hàng</h3>
                    <ul>
                      {orders.map((order) => (
                        <div key={order.id}>
                          <li>
                            <div className='border border-1 border-black'>
                              <span>
                                Đơn hàng #{order.id} - Tổng giá: {order.totalPrice || 0} VNĐ
                              </span>
                              <span>
                                Trạng thái: {order.status}
                              </span>
                              <ul>
                                {order.meanItems.map((meanItem) => (
                                  <li key={meanItem.id}>
                                    <span>Món ăn: {meanItem.menuItemId}</span>
                                    <span>Số lượng: {meanItem.quantity || 0}</span>
                                    <span>Tổng giá: {meanItem.totalPrice || 0}</span>
                                  </li>
                                ))}
                              </ul>
                              {/* Hiển thị thông tin bàn ăn */}
                              <li>
                                <div className='border-top border-bottom border-black'>
                                  <span>Bàn ăn: {order.tables.tableNumber}</span>
                                  <span>Số ghế: {order.tables.seats}</span>
                                  <span>Trạng thái: {order.tables.status}</span>
                                </div>
                              </li>
                              {order.status === "Đã thanh toán" || order.status === "Đã hủy" ? (
                                <div>
                                  <button className="btn btn-danger mb-2 mt-2" disabled>
                                    Hủy Đơn Hàng
                                  </button>
                                  <button className="btn btn-success mb-2 mt-2 ml-1" disabled>
                                    Đã Thanh Toán
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <button className="btn btn-danger mb-2 mt-2" onClick={() => handleCancel(order.id)}>
                                    Hủy Đơn Hàng
                                  </button>
                                  <button className="btn btn-success mb-2 mt-2 ml-1" onClick={() => handlePayment(order.id)}>
                                    Thanh Toán
                                  </button>
                                </div>
                              )}
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
