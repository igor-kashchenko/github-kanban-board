import React from 'react';
import './Loader.css';

export const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper" data-testid="loader">
      <div className="loader"></div>
    </div>
  );
};
