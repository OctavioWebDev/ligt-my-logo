'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const PhotoCarousel = () => {
  const images = [
    '/pictures/397174942_755909426551365_5093732429376647298_n.jpeg',
    '/pictures/347252399_609176484305702_8775168318958265041_n.jpeg',
    '/pictures/347245646_670650481743927_8636533554187780558_n.jpeg',
    '/pictures/275062851_1391287971331075_4071023154152937358_n.jpeg',
    '/pictures/274942194_1389449628181576_6460728541483282972_n.jpeg',
    '/pictures/257124754_1322630461530160_147332498102588651_n.jpeg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96 -z-10">
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Carousel image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoCarousel;