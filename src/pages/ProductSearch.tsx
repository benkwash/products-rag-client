
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import apiClient from '../api/axios';

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

const ProductSearch: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await apiClient.get('/search', {
          params: { search: query },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleSearch = () => {
    setQuery(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Search for insurance products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ flex: 1, padding: '12px 20px', margin: '8px 0', boxSizing: 'border-box',borderRadius: '8px 0 0 8px' }}
          className='search-input'
        />
        <button 
          onClick={handleSearch} 
          style={{ padding: '12px 20px', margin: '8px 0',borderRadius: '0  8px 8px 0' }} 
          disabled={loading}>
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
