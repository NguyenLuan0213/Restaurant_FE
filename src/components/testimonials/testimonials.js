import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './testimonials.css';
import '../default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faStar} from '@fortawesome/free-solid-svg-icons';

const Testimonials = () => {
  const testimonials = [
    {
      content: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam, risus at semper.",
      author: "Saul Goodman",
      position: "Ceo & Founder",
      image: "/images/testimonials/testimonials-1.jpg"
    },
    {
      content: "Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.",
      author: "Sara Wilsson",
      position: "Designer",
      image: "/images/testimonials/testimonials-1.jpg"
    },
    // Thêm các testimonial khác vào đây tương tự
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <section id="testimonials" className="testimonials section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Ý Kiến</h2>
          <p className='p custom-font'>Ý Kiến <span>Về Chúng Tôi</span></p>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <div className="row flex">
                <div className="col-content">
                  <div className="testimonial-content">
                    <p>
                      <FontAwesomeIcon icon={faQuoteLeft} size="xs" /> &thinsp;
                      {testimonial.content}
                      &ensp;<FontAwesomeIcon icon={faQuoteRight} size="xs"/>
                    </p>
                      <h3>{testimonial.author}</h3>
                      <h4>{testimonial.position}</h4>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon icon={faStar} size="xs" style={{color: "gold", alignItems: 'right'}} key={i}/>
                        ))}
                      </div>
                  </div>
                </div>
                <div>
                  <img src={testimonial.image} className="testimonial-img" alt="img" />
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
