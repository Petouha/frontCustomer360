import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';


const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Attach scroll event listener to show/hide the button
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <FontAwesomeIcon icon={faArrowAltCircleUp} size='3x' />
    </button>
  );
};

export default ScrollToTopButton;
