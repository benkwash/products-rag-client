
import React from 'react';
import { Link } from 'react-router-dom';

interface Business {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  business: Business;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
        <img src={product.business.image} alt={product.business.name} style={{ width: '150px', height: '150px', marginRight: '16px', objectFit: 'contain' }} />
        <div>
          <h2>{product.name}</h2>
          <p>By {product.business.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
