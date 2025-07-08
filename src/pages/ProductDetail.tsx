
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiClient from '../api/axios';

interface Business {
  _id: string;
  name: string;
  description: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  business: Business;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto',padding: '0 20px', boxSizing: 'border-box' }}>
      <img src={product.business.image} alt={product.business.name} style={{ width: '300px', height: '200px', marginBottom: '0px', borderRadius: '8px',objectFit: 'contain' }} />
      <h1>{product.name}</h1>
      <hr style={{ margin: '20px 0' }} />
      <ReactMarkdown>{product.description}</ReactMarkdown>
      <hr style={{ margin: '20px 0' }} />
      <h2>About {product.business.name}</h2>
      <p>{product.business.description}</p>
    </div>
  );
};

export default ProductDetail;
