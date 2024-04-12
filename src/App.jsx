import React, { useState } from 'react';
import Product from './components/Product.jsx';
import AddToCartButton from './components/AddToCartButton.jsx';
import CartSummary from './components/CartSummary.jsx';

const ProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Ferrari 488 GTB',
      description: 'The Ferrari 488 GTB is a mid-engine sports car produced by the Italian automobile manufacturer Ferrari.',
      price: 300000,
    },
    {
      id: 2,
      name: 'Lamborghini Huracan',
      description: 'The Lamborghini Huracán is a sports car built by Lamborghini.',
      price: 250000,
    },
    {
      id: 3,
      name: 'Porsche 911',
      description: 'The Porsche 911 is a two-door, 2+2 high-performance rear-engined sports car made since 1963.',
      price: 150000,
    },
    {
      id: 4,
      name: 'Audi R8',
      description: 'The Audi R8 is a mid-engine, 2-seater sports car which uses Audi\'s trademark quattro permanent all-wheel drive system.',
      price: 180000,
    },
    {
      id: 5,
      name: 'McLaren 720S',
      description: 'The McLaren 720S is a sports car designed and manufactured by British car manufacturer McLaren Automotive.',
      price: 350000,
    },
    {
      id: 6,
      name: 'Chevrolet Corvette',
      description: 'The Chevrolet Corvette, colloquially known as the "Vette", is a two-door, two-passenger sports car.',
      price: 70000,
    },
    {
      id: 7,
      name: 'Nissan GT-R',
      description: 'The Nissan GT-R is a high-performance sports car produced by Nissan.',
      price: 110000,
    },
    {
      id: 8,
      name: 'Ford Mustang Shelby GT500',
      description: 'The Ford Mustang Shelby GT500 is a high-performance variant of the Ford Mustang.',
      price: 85000,
    },
    {
      id: 9,
      name: 'BMW M4',
      description: 'The BMW M4 is a high-performance version of the BMW 4 Series.',
      price: 80000,
    },
    {
      id: 10,
      name: 'Mercedes-AMG GT',
      description: 'The Mercedes-AMG GT is a sports car produced in coupé and roadster form by Mercedes-AMG.',
      price: 200000,
    },
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setTotalPrice(totalPrice + product.price);
  };

  return (
    <div className="product-page">
      <header>
        <h1>Welcome to our Car Store</h1>
      </header>
      <CartSummary cartItems={cartItems} totalPrice={totalPrice} />
      <div className="products">
        {products.map(product => (
          <div key={product.id}>
            <Product
              name={product.name}
              description={product.description}
              price={product.price}
            />
            <AddToCartButton onClick={() => addToCart(product)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
