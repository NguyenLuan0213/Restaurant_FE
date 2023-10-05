import React from 'react';
import './contact.css';
import '../default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faEnvelope, faPhone, faClock } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Liên Hệ</h2>
          <p className='p custom-font '>Bạn cần giúp đỡ? <span style={{ color: '#ce1212' }}>Liên hệ chúng tôi</span></p>
        </div>

        <div className="mb-3">
          <iframe title="Google Map"
            style={{ border: '0', width: '100%', height: '350px' }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" allowFullScreen
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
                <p>A108 Adam Street, New York, NY 535022</p>
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
                <p>contact@example.com</p>
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
                <p>+1 5589 55488 55</p>
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
              <input type="text" name="name" className="form-control" id="name" placeholder="Nhập tên bạn" required />
            </div>
            <div className="col-form form-group">
              <input type="email" className="form-control" name="email" id="email" placeholder="Nhập SĐT bạn" required />
            </div>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" name="subject" id="subject" placeholder="Tiêu Đề" required />
          </div>
          <div className="form-group">
            <textarea className="form-control" name="message" rows="5" placeholder="Tin Nhắn" required></textarea>
          </div>
          {/* <div >
            <div className="loading">Loading</div>
            <div className="error-message">Chưa Nhập Đủ Thông Tin!!</div>
            <div className="sent-message">Your message has been sent. Thank you!</div>
          </div> */}
          <div className="text-center"><button type="submit">Gửi Tin Nhắn</button></div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
