

import React from 'react';

const Product = ({ name, description, price, addToCart }) => {
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>{description}</p>
      <p className="price">${price}</p>
    </div>
  );
};

export default Product;