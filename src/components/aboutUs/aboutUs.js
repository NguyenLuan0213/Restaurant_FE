import React from 'react';
import './aboutUs.css';
import '../default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'

const AboutSection = () => {
  return (
    <section className="about">
      <div>
        <div>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Thông Tin</h2>
          <p className='p custom-font '>Tìm hiểu <span style={{ color: '#ce1212' }}>về chúng tôi</span></p>
        </div>
        <div className="flex">
          <div className="about-img" style={{ backgroundImage: 'url(/images/about/about.jpg)', backgroundRepeat: 'no-repeat' }}>
            <div className="call-us">
              <div>Đặt Bàn</div>
              <p>+84 868694586</p>
            </div>
          </div>
          <div>
            <div className="content">
              <p style={{ marginTop: '5px' }}>
                Chào mừng đến với trang website của chúng tôi!
              </p>
              <ul>
                <li><FontAwesomeIcon icon={faCheckDouble} size="xs" style={{ color: "#f20736" }} viewBox="800 0 448 512" /> <span>Đặt bàn dễ dàng:</span> Với chỉ vài bước đơn giản, bạn có thể chọn vị trí và thời gian phù hợp với lịch trình của mình</li>
                <li><FontAwesomeIcon icon={faCheckDouble} size="xs" style={{ color: "#f20736" }} viewBox="800 0 448 512" /> <span>Lựa chọn vị trí ưa thích:</span> Chọn từ nhiều khu vực khác nhau trong nhà hàng, từ không gian ngoài trời tới không gian nội thất sang trọng.</li>
                <li><FontAwesomeIcon icon={faCheckDouble} size="xs" style={{ color: "#f20736" }} viewBox="800 0 448 512" /> <span>Thực đơn đa dạng:</span> Tận hưởng sự đa dạng với các món ăn ngon từ nhiều loại hình ẩm thực khác nhau.</li>
                <li><FontAwesomeIcon icon={faCheckDouble} size="xs" style={{ color: "#f20736" }} viewBox="800 0 448 512" /> <span>Dịch vụ chuyên nghiệp:</span> Đội ngũ nhân viên phục vụ của chúng tôi luôn sẵn lòng mang đến cho bạn trải nghiệm ẩm thực tuyệt vời.</li>
              </ul>
              <p>
                Hãy cùng thưởng thức không gian ẩm thực đẳng cấp và trải nghiệm dịch vụ đặt bàn tiện lợi. Cảm ơn bạn đã lựa chọn chúng tôi!
              </p>
              <div>
                <img src="/images/about/aboutUsPlay.jpg" className="img-play" alt="img" />
                <a href="https://www.youtube.com/watch?v=LiWjOAE3SDo" className="play-btn" target='_blank' rel="noopener"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
