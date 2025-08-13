import React, { useState, useEffect } from 'react';
import crista from '../Photos/crista.jpg'
import train1 from '../Photos/train1.jpeg'
import train2 from '../Photos/train2.jpeg'
import train3 from '../Photos/train3.jpeg'
import flight1 from '../Photos/flight1.jpeg'
import flight2 from '../Photos/flight2.jpeg'
const images = [
  train1,flight2,train2,flight1,train3,crista
  
];

const CoverflowSlider = () => {
  const [current, setCurrent] = useState(2); // start from middle

  // Auto-slide every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[300px] flex items-center justify-center overflow-hidden mt-10">
      {/* Images */}
      {images.map((img, idx) => {
        const offset = idx - current;

        return (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className={`
              absolute transition-all duration-700 ease-in-out rounded-xl shadow-xl
              ${offset === 0 ? 'z-20 scale-100 rotate-0' : 'z-10 scale-75'}
            `}
            style={{
              transform: `translateX(${offset * 250}px) rotateY(${offset * 30}deg)`,
              opacity: offset === 0 ? 1 : 0.6,
              width: '300px',
              height: '200px',
            }}
          />
        );
      })}
    </div>
  );
};

export default CoverflowSlider;
