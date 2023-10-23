import React, { useState, useEffect } from 'react';
import './contact.css';
import '../default.css';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Rating from 'react-rating';
import Loading from '../layout/Loading';

const Contact = () => {
  const [userRating, setUserRating] = React.useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState({
    name: '',
    email: '',
    rating: '',
    review_text: '',
    customerId: '',
    commentDate: new Date(),
    rating: '',
    restaurantId: '',
  });
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantName, setSelectedRestaurantName] = useState('');

  const handleRatingChange = (value) => {
    setUserRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formattedDate = format(new Date(), 'yyyy-MM-dd');
      const commentToSubmit = {
        reviewText: comment.review_text,
        customerId: user.id,
        commentDate: formattedDate,
        rating: comment.rating,
        restaurantId: comment.restaurantId,
      };

      const response = await fetch('https://localhost:7274/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentToSubmit),
      });

      if (response.ok) {
        // Xử lý khi comment đã được gửi thành công
        console.log('Comment đã được gửi thành công');
        // Hiển thị thông báo thành công
        alert('Comment đã được gửi thành công!');

        // Tải lại trang sau một khoảng thời gian ngắn
        setTimeout(() => {
          window.location.reload();
        }, 1000); // 1000 milliseconds (1 giây) sau khi hiển thị thông báo, trang sẽ được tải lại
      } else {
        // Xử lý khi có lỗi xảy ra
        console.error('Đã xảy ra lỗi khi gửi comment');
        // Có thể hiển thị thông báo lỗi cho người dùng ở đây
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi khi gửi comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  useEffect(() => {
    const userFromCookie = Cookies.get('user');
    if (userFromCookie) {
      const user = JSON.parse(userFromCookie);
      setComment({
        name: user.fullName,
        email: user.email,
        subject: '',
        message: '',
      });
      setUser(user);
    }
  }, []);

  useEffect(() => {
    // Lấy danh sách nhà hàng từ API
    fetch('https://localhost:7274/api/restaurantsbr')
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.error('Đã xảy ra lỗi khi lấy danh sách nhà hàng:', error));
  }, []);

  const handleRestaurantChange = (e) => {
    const selectedRestaurantId = e.target.value;
    // Tìm tên nhà hàng tương ứng dựa trên id đã chọn
    const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === parseInt(selectedRestaurantId));
    if (selectedRestaurant) {
      setSelectedRestaurantName(selectedRestaurant.name);
    } else {
      setSelectedRestaurantName('');
    }
    // Cập nhật giá trị restaurantId trong state comment
    setComment({
      ...comment,
      restaurantId: selectedRestaurantId,
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Liên Hệ</h2>
          <p className="p custom-font ">
            Bạn cần giúp đỡ? <span style={{ color: '#ce1212' }}>Liên hệ chúng tôi</span>
          </p>
        </div>

        <div className="mb-3">
          <iframe
            title="Google Map"
            style={{ border: '0', width: '100%', height: '350px' }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9307599814006!2d106.67856689999999!3d10.816610800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528e223676081%3A0x5f12225d603ef7c4!2zMzcxIE5ndXnhu4VuIEtp4buHbSwgUGjGsOG7nW5nIDMsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oIDcwMDAw!5e0!3m2!1svi!2s!4v1696866331591!5m2!1svi!2s"
            allowFullScreen
          ></iframe>
        </div>

        <div className="row flex between">
          <div className="col-3">
            <div className="info-item flex">
              <div>
                <FontAwesomeIcon icon={faMap} />
              </div>
              <div>
                <h3>Địa Chỉ</h3>
                <p>Quận Gò Vấp, TP Hồ Chí Minh</p>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="info-item flex">
              <div>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div>
                <h3>Email</h3>
                <p>nhahang@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="info-item flex">
              <div>
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div>
                <h3>SĐT</h3>
                <p>+84 857 695 785</p>
              </div>
            </div>
          </div>

          <div className="col-3">
            <div className="info-item flex">
              <div>
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div>
                <h3>Giờ Mở</h3>
                <p>
                  <strong>T2-T7:</strong> 11AM - 23PM; &ensp;
                  <strong>Chủ Nhật:</strong> Đóng Cửa
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="row-form flex">
            <div className="col-form form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Nhập tên bạn"
                value={comment.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-form form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="Nhập email bạn"
                value={comment.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row-form flex">
            <div className="col-form form-group">
              <label htmlFor="rating">Chấm điểm cho nhà hàng</label>
              <select
                className="form-control"
                name="rating"
                id="rating"
                value={comment.rating}
                onChange={handleInputChange}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="col-form form-group">
              <select
                className="form-control"
                name="restaurantId"
                id="restaurantId"
                value={comment.restaurantId}
                onChange={handleRestaurantChange} // Thêm sự kiện nghe sự thay đổi giá trị của dropdown
                required
              >
                <option value="">Chọn một nhà hàng</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="review_text"
              rows="5"
              placeholder="Bình luận về nhà hàng"
              value={comment.review_text}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="text-center">
            {loading && <Loading />}
            {user ? (
              <button type="submit">Gửi Tin Nhắn</button>
            ) : (
              <p style={{ fontSize: '20px', color: 'red' }}>Vui lòng đăng nhập để bình luận</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
