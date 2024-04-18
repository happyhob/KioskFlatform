// ProductGrid.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, onAddProduct }) => {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onProductClick={() => {}} />
      ))}
      <button className="product-add" onClick={onAddProduct}>+</button>
    </div>
  );
};

export default ProductGrid;
