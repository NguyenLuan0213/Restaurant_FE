import React, { useState } from 'react';
import './goToTop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      duration: 10000
    });
  }

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  window.addEventListener('scroll', handleScroll);

  return (
    <div>
      {isVisible && (
        <div>
          <a href="#top" onClick={handleClick} id="go">
            <FontAwesomeIcon icon={faArrowTurnUp} size='lg' />
          </a>
        </div>
      )}
    </div>
  );
}

export default GoToTopButton;
