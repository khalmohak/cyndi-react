import React from 'react';

const LogoLarge = (props) => {
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

const LogoSmall = (props) => {
  return (
    <img
      width='70'
      height='28'
      alt="Logo"
      src="/static/cyndi_white.png"

      {...props}
    />
  );
};

export {LogoLarge, LogoSmall};
