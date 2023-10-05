import React, { useState, useEffect } from 'react';
import api, { authAPI, endpoints } from '../configs/api';
import './reservation.css';
import '../default.css';
import Loading from '../layout/Loading';
import Cookies from 'js-cookie'; // Import thư viện js-cookie
import { format, addHours, isAfter } from 'date-fns'; // Import thư viện date-fns

const isBookingValid = (selectedDateTime) => {
  // Lấy thời gian hiện tại
  const currentTime = new Date();
  // Thêm một giờ vào thời gian hiện tại
  const minimumBookingTime = addHours(currentTime, 1);
  // Kiểm tra xem thời điểm đặt bàn có trước thời gian tối thiểu không
  return isAfter(selectedDateTime, minimumBookingTime);
};

const Reservation = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    datetime: '',
    restaurant: '',
    message: ''
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    // Check if the cookie contains user data
    const userFromCookie = Cookies.get("user");

    if (userFromCookie) {
      const userData = JSON.parse(userFromCookie);
      console.log(userData);
      // If there's user data in the cookie, use it to populate the fields
      setFormData({
        name: userData.fullName || '',
        email: userData.email || '',
        phone: userData.phoneNumber || '',
        datetime: '',
        restaurant: '',
        message: ''
      });
    }
  }, []);

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(formData.datetime);
    // Kiểm tra xem thời điểm đặt bàn có hợp lệ không
    if (!isBookingValid(selectedDateTime)) {
      alert('Thời gian đặt bàn không hợp lệ. Vui lòng đặt bàn trước 1 giờ.');
      return;
    }

    // Perform form submission handling (send data to your server)
    try {
      const response = await api.post(endpoints.reservation, formData);
      console.log('Reservation response:', response);
    } catch (error) {
      console.error('Error submitting reservation:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    const isFormValid = Object.values(formData).every(val => val !== '');
    setFormValid(isFormValid);
  };
  return (
    <section id="revervation" className="revervation" style={{ marginTop: '80px' }}>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Thông Tin Đặt Bàn Online</h2>
          <p className='custom-font' style={{ textAlign: 'center', fontSize: '22px' }}>Vui lòng đăng ký đặt bàn dùng bữa <span style={{ color: '#ce1212' }}>trước 1 giờ</span></p>
        </div>

        <div className="flex">
          <div className="col reservation-img" style={{ backgroundImage: 'url(/images/bookTb.jpg)' }} data-aos="zoom-out" data-aos-delay="200"></div>

          <div className="reservation-form-bg">
            <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="100">
              <div className="row">
                <div className="col">
                  <div className='remind'>Họ Tên (*)</div>
                  <input type="text" name="name" className="form-control" id="name" placeholder="Nhập Tên" required onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="col">
                  <div className='remind'>Email (*)</div>
                  <input type="email" className="form-control" name="email" id="email" placeholder="Nhập Email" required onChange={handleInputChange} value={formData.email} />
                </div>
                <div className="col">
                  <div className='remind'>Số Điện Thoại (*)</div>
                  <input type="text" className="form-control" name="phone" id="phone" placeholder="Nhập SĐT" required onChange={handleInputChange} value={formData.phone} />
                </div>
              </div>
              <div className='flex between' style={{ flexWrap: 'wrap' }}>
                <div className="col">
                  <div className='remind'>Chọn Chi Nhánh (*)</div>
                  <select name="restaurant" id="restaurant" required onChange={handleInputChange} value={formData.restaurant}>
                    <option value="CT">Nhà hàng Chí Tiên</option>
                    <option value="CT2">Nhà hàng Chí Tiên 2</option>
                    <option value="ST">Nhà hàng Sơn Trà</option>
                  </select>
                </div>
                <div className="col">
                  <div className='remind'>Ngày Giờ Đặt (*)</div>
                  <input
                    type="datetime-local" // Sử dụng datetime-local
                    name="datetime"
                    className="date-picker"
                    id="datetime"
                    required
                    onChange={handleInputChange}
                    value={formData.datetime}
                    lang="en"
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea className="form-control textarea" name="message" rows="5" placeholder="Tin Nhắn" onChange={handleInputChange} value={formData.message}></textarea>
              </div>
              <div>
                <div className="error-message"></div>
                {formValid && <div className="sent-message">Bạn đã điền đầy đủ và đặt bàn thành công. Xin cảm ơn !!!</div>}
              </div>
              <div className="text-center"><button type="submit">Đặt Bàn</button></div>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
};
export default Reservation;