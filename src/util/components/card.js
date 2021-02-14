import React from 'react';
import './card.scss';

const Card = React.forwardRef(({title, children, onClose, className, ...props}, ref) => (
  <div {...props} ref={ref} className={`card ${className}`}>
    <div className="card-header flex justify-between">
      <h3>{title}</h3>
      <a href="#" onClick={onClose}>
        x
      </a>
    </div>
    {children}
  </div>
));

export default Card;