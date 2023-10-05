import React from 'react';
import './footer.css';
import '../default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import {faTwitter, faFacebookF, faInstagram, faYoutube} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row-footer flex">
          <div className="col-footer flex" style={{marginBottom: '32px'}}>
          <div className="icon-container"><FontAwesomeIcon icon={faMap} className="icon" /></div>
            <div>
              <h4>Địa Chỉ</h4>
              <p>
                A108 Adam Street <br />
                New York, NY 535022 - US<br />
              </p>
            </div>
          </div>

          <div className="col-footer footer-links flex">
          <div className="icon-container"><FontAwesomeIcon icon={faPhone} className="icon" /></div>
            <div>
              <h4>Đặt Bàn</h4>
              <p>
                <strong>SĐT:</strong> +1 5589 55488 55<br />
                <strong>Email:</strong> info@example.com<br />
              </p>
            </div>
          </div>

          <div className="col-footer footer-links flex">
          <div className="icon-container"><FontAwesomeIcon icon={faClock} className="icon" /></div>
            <div>
              <h4>Giờ Mở Cửa</h4>
              <p>
                <strong>T2-T7: </strong>11AM - 23PM<br />
                <strong>Chủ Nhật:</strong> Đóng cửa
              </p>
            </div>
          </div>

          <div className="col-footer footer-links">
            <h4 style={{marginLeft: '50px'}}>Mạng Xã Hội</h4>
            <div className="social-links flex">
              <a href="#" className="twitter"><FontAwesomeIcon icon={faTwitter} style={{color: "#ffffff"}} /></a>
              <a href="#" className="facebook"><FontAwesomeIcon icon={faFacebookF} style={{color: "#ffffff"}} /></a>
              <a href="#" className="instagram"><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff"}} size="lg"/></a>
              <a href="#" className="youtube"><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff"}} size="lg"/></a>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>Hồng Ân - Ngọc Luân</span></strong>.
        </div>
        <div className="credits">
          Designed by <a href="https://react.dev/">ReactJS</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
