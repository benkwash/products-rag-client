
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
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0, width: '220px' }}>
      <div style={{ 
        backgroundColor: 'white',
        border: '1px solid #e8eaed',
        borderRadius: '12px',
        padding: '12px',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        height: '180px',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '80px',
          marginBottom: '8px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa'
        }}>
          <img 
            src={product.business.image} 
            alt={product.business.name} 
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.2s ease'
            }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
            }}
          />
          <div style={{
            display: 'none',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            color: '#5f6368'
          }}>
            No Image
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 4px 0',
            fontSize: '14px',
            fontWeight: '500',
            color: '#202124',
            lineHeight: '1.3',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.name}
          </h3>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: 'auto'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#e8f0fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '9px',
              fontWeight: '600',
              color: '#1a73e8'
            }}>
              {product.business.name.charAt(0).toUpperCase()}
            </div>
            <span style={{
              fontSize: '12px',
              color: '#5f6368',
              fontWeight: '400'
            }}>
              {product.business.name}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
