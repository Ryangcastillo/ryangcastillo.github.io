import React from 'react';
import kiwiLogo from '../../assets/kiwi-logo.png';

// Kiwi logo as an image
export const KiwiLogoIcon: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => (
  <img
    src={kiwiLogo}
    alt="Kiwi Logo"
    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
    {...props}
  />
);

