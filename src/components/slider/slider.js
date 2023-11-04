import React, { useState, useEffect, useCallback } from 'react';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const images = [
    'https://res.cloudinary.com/dkba7robk/image/upload/v1696604138/a8ejftwrzvyavfsml2oc.jpg',
    'https://res.cloudinary.com/dkba7robk/image/upload/v1696604137/dlaue3rktoamoivgqm1o.jpg',
    'https://res.cloudinary.com/dkba7robk/image/upload/v1696601830/pktf7azpntuisyvejnu2.jpg',
    'https://res.cloudinary.com/dkba7robk/image/upload/v1696601825/hf1k9u4o2ykv5zd9d2bn.jpg',
    'https://res.cloudinary.com/dkba7robk/image/upload/v1696601823/gn4fr8as9jmreqekkkux.jpg'
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
    <div className="container" style={{ marginTop: '105px' }}>
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
