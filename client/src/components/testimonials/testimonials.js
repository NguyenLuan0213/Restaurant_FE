import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './testimonials.css';
import '../default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faStar } from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // Danh sách testimonials từ API

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  useEffect(() => {
    // Gửi yêu cầu GET để lấy danh sách comments từ API
    fetch('https://localhost:7274/api/comments')
      .then((response) => response.json())
      .then((data) => {
        setTestimonials(data);
      })
      .catch((error) => console.error('Đã xảy ra lỗi khi lấy danh sách testimonials:', error));
  }, []);

  return (
    <section id="testimonials" className="testimonials section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Ý Kiến</h2>
          <p className="p custom-font">Ý Kiến <span>Về Chúng Tôi</span></p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <div className="row flex">
                <div className="col-content">
                  <div className="testimonial-content">
                    <p>
                      <FontAwesomeIcon icon={faQuoteLeft} size="xs" /> &thinsp;
                      {testimonial.reviewText}
                      &ensp;<FontAwesomeIcon icon={faQuoteRight} size="xs" />
                    </p>
                    <h3>{testimonial.customerName}</h3>
                    <h4>{testimonial.restaurantName}</h4>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon icon={faStar} size="xs" style={{ color: "gold" }} key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={testimonial.customerImage || 'https://res.cloudinary.com/dkba7robk/image/upload/v1696386492/mskntwukg5041d2flo2n.png'}
                    className="testimonial-img"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default Testimonials;
