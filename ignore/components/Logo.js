import React from 'react';

const Logo = (props) => {
  return (
    <img
      width='100'
      height='40'
      alt="Logo"
      src="/static/cyndi_white.png"
    
      {...props}
    />
  );
};

export default Logo;
