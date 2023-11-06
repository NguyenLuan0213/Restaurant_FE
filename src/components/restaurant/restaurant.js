import React, { useState, useEffect } from 'react';
import api, { authAPI, endpoints } from '../configs/api';
import './restaurant.css';
import '../default.css';
import Loading from '../layout/Loading';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await api.get(endpoints.restaurants);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  if (restaurants.length === 0) {
    return <Loading />;
  }

  return (
    <section id="revervation" className="revervation" style={{ marginTop: '110px' }}>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2 className='h2Custum'>THÔNG TIN CÁC NHÀ HÀNG</h2>
        </div>
        <Slider {...settings}>
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-details row-wrap">
              <div className="restaurant-form-bg">
                <h2>{restaurant.name}</h2>
                <span><strong>Address:</strong> {restaurant.address}</span>
                <span><strong>Description:</strong> {restaurant.description}</span>
                <div className="image-container" style={{ paddingTop: "5px" }}>
                  <img src={restaurant.image} alt={restaurant.name} />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Restaurant;
