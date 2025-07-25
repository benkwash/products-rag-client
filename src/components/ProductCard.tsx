
import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

interface Business {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  business: Business;
  description?: string; // Make description optional
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const lastUpdated = 'Oct 12, 2024'; // Example date
  const authors = [product.business.name]; // Example authors

  return (
    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '16px 8px',
        borderBottom: '1px solid #e8eaed',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
        <div style={{ marginRight: '16px', flexShrink: 0 }}>
          {/* Placeholder for file type icon */}
          <div style={{
            width: '60px',
            height: '40px',
            backgroundColor: '#e8f0fe',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#1a73e8'
          }}>
            <img src={product.business.image} alt="File Icon" style={{ width: '100%', height: '100%', borderRadius: '4px' , objectFit: 'cover'}} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            margin: '0 0 4px 0',
            fontSize: '16px',
            fontWeight: '500',
            color: '#202124',
          }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5f6368', fontSize: '12px', marginBottom: '8px' }}>
            <span>{product.business.name}</span>
            <span>•</span>
            <span>Last updated {lastUpdated}</span>
          </div>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            color: '#5f6368',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            <ReactMarkdown
              components={{
              h1: ({children}) => (
                <h1 style={{
                  fontSize: '14px',
                  fontWeight: '400',
                }}>{children}</h1>
              ),
              h2: ({children}) => (
                <h2 style={{
                  fontSize: '14px',
                  fontWeight: '400',
                }}>{children}</h2>
              ),
              h3: ({children}) => (
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '400',
                }}>{children}</h3>
              ),
              strong: ({children}) => (
                <strong style={{
                  fontSize: '14px',
                  fontWeight: '400',
                }}>{children}</strong>
              ),
            }}
            >{product.description || 'No description available.'}</ReactMarkdown>
            {/* {product.description || 'No description available.'} */}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
