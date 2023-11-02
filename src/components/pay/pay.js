import React, { useState, useEffect } from 'react';
import apis, { endpoints, authAPI } from '../configs/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pay.css';
import '../default.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Pay = () => {
  const navigate = useNavigate();
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [paymentSessionId, setPaymentSessionId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);


  const handlePhoneNumberChange = (event) => {
    setCustomerPhoneNumber(event.target.value);
  };

  const handleGetOrders = async () => {
    try {
      const response = await authAPI().get(endpoints['PayByPhone'](customerPhoneNumber));
      const orderData = response.data;
      setOrders(orderData);
      setError(null);
    } catch (error) {
      setError('Không tìm thấy đơn hàng hoặc khách hàng');
      setOrders([]);
    }
  };

  const handleCancel = async (id) => {
    try {
      const paymentStatus = 'Đã hủy';

      let formData = new FormData();
      formData.append("status", paymentStatus);
      await authAPI().put(endpoints['makePayment'](id), formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Đã hủy đơn hàng thành công');
      handleGetOrders(customerPhoneNumber);
    } catch (error) {
      alert('Lỗi khi hủy đơn hàng: ' + error.message);
    }
  };

  const [user, setUser] = useState({});
  const [rolesUser, setRolesUser] = useState([]);

  useEffect(() => {
    const getUserFromCookie = () => {
      const userCookie = Cookies.get("user"); // Đọc dữ liệu user từ cookie
      if (userCookie) {
        const userFromCookie = JSON.parse(userCookie);
        setUser(userFromCookie);
        setRolesUser(userFromCookie.roles);
      }
    };
    getUserFromCookie();
  }, []);

  const handlePaymentTT = async (id) => {
    try {
      let formData = {
        orderId: id,
        status: 'Đã thanh toán'
      }
      const response = await fetch(`https://localhost:7274/api/orders/paysuccces/${id}`, {
        method: 'PUT',  // Sử dụng phương thức PUT để cập nhật trạng thái thanh toán
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Đã nhận tiền từ khách hàng và cập nhật trạng thái thành công.');
        // Nếu cập nhật thành công, bạn có thể thực hiện các hành động bổ sung ở đây
        handleGetOrders(customerPhoneNumber)
      } else {
        alert('Lỗi khi cập nhật trạng thái thanh toán.');
      }
    } catch (error) {
      alert('Lỗi khi thanh toán: ' + error.message);
    }
  };

  const ShowHandalePaymentTT = (id) => {
    // Hiển thị cửa sổ cảnh báo
    const confirmed = window.confirm('Bạn đã nhận tiền từ khách hàng chưa?');
    if (confirmed) {
      // Nếu người dùng nhấn OK
      handlePaymentTT(id);
    } else {
      // Nếu người dùng nhấn Cancel hoặc đóng cửa sổ cảnh báo
      // Thực hiện xử lý nếu cần
      console.log('Người dùng đã hủy thanh toán TT.');
    }
  }

  const ShowHandalePaymentCancel = (id) => {
    // Hiển thị cửa sổ cảnh báo
    const confirmed = window.confirm('Bạn có chắc là hủy đơn hàng này không?');
    if (confirmed) {
      // Nếu người dùng nhấn OK
      handleCancel(id);
    } else {
      // Nếu người dùng nhấn Cancel hoặc đóng cửa sổ cảnh báo
      // Thực hiện xử lý nếu cần
      console.log('Người dùng đã hủy thanh toán TT.');
    }
  }

  return (
    <div className="pay">
      <div className="container border">
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
            <button className="btn btn-primary mb-2" onClick={handleGetOrders}>
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
                              <p style={{ fontSize: "20px", margin: "0px" }}>
                                Đơn hàng: {order.id}
                              </p>
                              <p style={{ fontSize: "20px", margin: "0px" }}>
                                Ngày Giờ: {order.orderTime}
                              </p>
                              <ul>
                                {order.meanItems.map((meanItem) => (
                                  <li key={meanItem.id}>
                                    <span>Món ăn: {meanItem.menuItemId}</span>
                                    <span>Số lượng: {meanItem.quantity || 0}</span>
                                    <span>
                                      Tổng giá: {meanItem.totalPrice ? meanItem.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '0 VND'}
                                    </span>
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
                              <p style={{ fontSize: "20px", margin: "0px" }}>
                                Tổng: {order.totalPrice ? order.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "0 VNĐ"}
                              </p>
                              {order.status === "Đã thanh toán" || order.status === "Đã hủy" ? (
                                <></>
                              ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                  <Link to={`/payment/${order.id}`}>
                                    <button className="btn btn-success mb-2 mt-2">Thanh Toán Online</button>
                                  </Link>
                                  {(rolesUser.includes("CASHIER") || rolesUser.includes("ADMIN")) && (
                                    <>
                                      <button className="btn btn-success mb-2 mt-2" onClick={() => ShowHandalePaymentTT(order.id)}>
                                        Thanh Toán Tiền Mặt
                                      </button>
                                      <button className="btn btn-danger mb-2 mt-2" onClick={() => ShowHandalePaymentCancel(order.id)}>
                                        Hủy Đơn Hàng
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                              {(order.status == "Đã thanh toán" && (
                                <span
                                  style={{
                                    marginTop: "5px",
                                    fontSize: "18px",
                                    padding: "4px 8px",
                                    backgroundColor: "#22ee22",
                                    color: "white",
                                    marginBottom: "5px",
                                  }}
                                >
                                  {order.status.toUpperCase()}
                                </span>
                              )) || (order.status == "Đã hủy" && (
                                <span
                                  style={{
                                    marginTop: "5px",
                                    fontSize: "18px",
                                    padding: "4px 8px",
                                    backgroundColor: "rgb(251 59 59 / 98%)",
                                    color: "white",
                                    marginBottom: "5px",
                                  }}
                                >
                                  {order.status.toUpperCase()}
                                </span>
                              )) || (<></>)}
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
      </div >
    </div >
  );
};

export default Pay;