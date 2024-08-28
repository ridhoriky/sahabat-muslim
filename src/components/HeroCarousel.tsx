import React from 'react';
import { Carousel } from 'antd';

const styleImage: React.CSSProperties = {
  objectFit: 'cover',
  objectPosition: '',
  width: '100%',
  height: '100%',
};

const HeroCarousel: React.FC = () => (
  <Carousel autoplay>
    <div>
      <div className='md:h-[70vh] h-[50vh]'>
        <img
          style={styleImage}
          src='https://images.pexels.com/photos/161276/moscow-cathedral-mosque-prospekt-mira-ramadan-sky-161276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='lentera'
        />
      </div>
    </div>
    <div>
      <div className='md:h-[70vh] h-[50vh]'>
        <img
          style={styleImage}
          src='https://images.pexels.com/photos/2102621/pexels-photo-2102621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='lentera'
        />
      </div>
    </div>
    <div>
      <div className='md:h-[70vh] h-[50vh]'>
        <img
          style={styleImage}
          src='https://images.pexels.com/photos/26833746/pexels-photo-26833746/free-photo-of-kota-tengara-penunjuk-penanda.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
          alt='lentera'
        />
      </div>
    </div>
  </Carousel>
);

export default HeroCarousel;
