import React, { useState, useEffect, useRef } from 'react';

const HorizontalAutoScroll = ({ children, scrollSpeed = 5 }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollDelay = 50;
    
    const scrollInterval = setInterval(() => {
      if (isPaused) return;
      
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        scrollAmount += scrollStep * (scrollSpeed / 5);
        container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    }, scrollDelay);

    return () => clearInterval(scrollInterval);
  }, [scrollSpeed, isPaused]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        display: 'flex',
        overflowX: 'hidden', // Changed to hidden to prevent manual scrollbar
        whiteSpace: 'nowrap',
        scrollBehavior: 'smooth',
        width: '100%',
        height: '100%',
        cursor: 'grab'
      }}
    >
      {children}
    </div>
  );
};

export default HorizontalAutoScroll;
