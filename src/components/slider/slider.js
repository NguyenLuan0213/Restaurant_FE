import React, { useState, useEffect, useCallback } from 'react';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const images = [
    '/images/slider/image1.jpg',
    '/images/slider/image2.jpg',
    '/images/slider/image3.jpg',
    '/images/slider/image4.jpg',
    '/images/slider/image5.jpg'
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [setCurrentImage, images.length]);


  const handlePrev = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 2000);

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="container" style={{ marginTop: '90px' }}>
      <div className="slider">
        <div className='slider-content'><img src={images[currentImage]} alt={`Slide ${currentImage}`} /></div>
        <button className="slider-btn prev" onClick={handlePrev}><FontAwesomeIcon icon={faCaretLeft} /></button>
        <button className="slider-btn next" onClick={handleNext}><FontAwesomeIcon icon={faCaretRight} /></button>
        <div className="slider-digit">
          {images.map((_, index) => (
            <button
              key={index}
              className={index === currentImage ? 'dot active' : 'dot'}
              onClick={() => setCurrentImage(index)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
