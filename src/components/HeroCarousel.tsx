import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '50vh',
};
const styleImage: React.CSSProperties = {
  objectFit: 'cover',
  objectPosition: '',
  width: '100%',
  height: '100%',
};

const HeroCarousel: React.FC = () => (
  <Carousel autoplay>
    <div>
      <div style={contentStyle}>
        <img
          style={styleImage}
          src='https://images.unsplash.com/photo-1666162174676-19b8e288c1ff?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='lentera'
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <img
          style={styleImage}
          src='https://images.unsplash.com/photo-1666162174676-19b8e288c1ff?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='lentera'
        />
      </div>
    </div>
    <div>
      <div style={contentStyle}>
        <img
          style={styleImage}
          src='https://images.unsplash.com/photo-1666162174676-19b8e288c1ff?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='lentera'
        />
      </div>
    </div>
  </Carousel>
);

export default HeroCarousel;
