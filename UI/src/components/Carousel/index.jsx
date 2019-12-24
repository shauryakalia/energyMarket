import React from 'react';
import {
  CarouselProvider, Slider, ButtonBack, ButtonNext,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// Custom Imports
import SlideItem from './Slide';

import data from '../../data/Homepage';

// Class for carousel component
const CarouselForBanner = () => (
  <CarouselProvider
    naturalSlideWidth={100}
    naturalSlideHeight={30}
    totalSlides={4}
  >
    <Slider>
      {data.slide.map(({
        id, imgSrc, title, content,
      }) => (
          <SlideItem key={id} index={id} imgSrc={imgSrc} title={title} content={content} />
        ))}
    </Slider>
    <ButtonBack className="backBtn"><i className="fas fa-chevron-left" /></ButtonBack>
    <ButtonNext className="nextBtn"><i className="fas fa-chevron-right" /></ButtonNext>
  </CarouselProvider>
);

export default CarouselForBanner;
