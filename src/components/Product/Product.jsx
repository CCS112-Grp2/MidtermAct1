import React from 'react';
import './Product.css';

const Product = ({ name, description, price, imageSrc, addToCart }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <img src={imageSrc} alt={name} />
      <p>{description}</p>
      <p className="price">${price}</p>
    </div>
  );
};

export default Product;
