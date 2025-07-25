
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import apiClient from '../api/axios';

interface Business {
  _id: string;
  name: string;
  description: string;
  image: string;
  website: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  business: Business;
  imageUrl?: string;
  website: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getThemeColors = () => {
    if (isDarkMode) {
      return {
        background: '#1a1a1a',
        surface: '#2d2d2d',
        surfaceHover: '#3a3a3a',
        text: '#e8eaed',
        textSecondary: '#9aa0a6',
        border: '#454545',
        borderHover: '#6b6b6b',
        accent: '#8ab4f8',
        accentHover: '#9cc2f7'
      };
    } else {
      return {
        background: '#ffffff',
        surface: '#ffffff',
        surfaceHover: '#f8f9fa',
        text: '#202124',
        textSecondary: '#5f6368',
        border: '#e8eaed',
        borderHover: '#dadce0',
        accent: '#1a73e8',
        accentHover: '#1557b0'
      };
    }
  };

  const theme = getThemeColors();

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
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        color: '#5f6368'
      }}>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '16px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            border: '3px solid #e1e5e9',
            borderTop: '3px solid #1a73e8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        color: '#5f6368',
        fontSize: '16px'
      }}>
        Product not found.
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%',
      minHeight: '100vh',
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      {/* Header with Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 32px',
        backgroundColor: theme.surface,
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            backgroundColor: theme.accent,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: '700'
          }}>
            M
          </div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: '600',
            margin: 0,
            color: theme.text
          }}>
            MyFIG
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ← Back
          </button>
          <button
            onClick={toggleDarkMode}
            style={{
              padding: '8px 12px',
              backgroundColor: 'transparent',
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.surfaceHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Product Header Section */}
      <div style={{
        backgroundColor: isDarkMode ? theme.background : '#f9f7f4',
        padding: '40px 32px',
        borderBottom: `1px solid ${theme.border}`
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px'
        }}>
          {/* Product Image */}
          <div style={{
            width: '200px',
            height: '160px',
            backgroundColor: theme.surface,
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.1)',
            flexShrink: 0
          }}>
            <img 
              src={product.imageUrl || product.business.image} 
              alt={product.business.name} 
              style={{ 
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          
          {/* Product Info and Purchase Button */}
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '400',
              color: theme.text,
              margin: '0 0 16px 0',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h1>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: theme.textSecondary,
              fontSize: '16px',
              marginBottom: '32px'
            }}>
              <span>By</span>
              <span style={{ fontWeight: '500', color: theme.accent }}>
                <a href={product.business.website} target='_blank' rel='noopener noreferrer' style={{ color: theme.accent, textDecoration: 'none' }}>
                  {product.business.name}
                </a>
              </span>
            </div>
            
            {/* Purchase Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => {
                  window.open(product.website, '_blank');
                }}
                style={{
                  padding: '16px 32px',
                  backgroundColor: theme.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isDarkMode ? '0 4px 16px rgba(138, 180, 248, 0.3)' : '0 4px 16px rgba(26, 115, 232, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.accentHover;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 6px 20px rgba(138, 180, 248, 0.4)' : '0 6px 20px rgba(26, 115, 232, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = theme.accent;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 16px rgba(138, 180, 248, 0.3)' : '0 4px 16px rgba(26, 115, 232, 0.3)';
                }}
              >
                Purchase Now
              </button>
              
              {/* <button
                onClick={() => {
                  alert(`Added ${product.name} to cart`);
                }}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'transparent',
                  color: theme.accent,
                  border: `2px solid ${theme.accent}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.accent;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 16px rgba(138, 180, 248, 0.2)' : '0 4px 16px rgba(26, 115, 232, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.accent;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Add to Cart
              </button> */}
            </div>

            {/* Quick Info */}
            {/* <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '14px',
              color: theme.textSecondary
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#34a853',
                  borderRadius: '50%'
                }}></span>
                <span>Available</span>
              </div>
              <div>💡 Expert support available</div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 32px',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '40px',
        alignItems: 'start'
      }}>
        {/* Main Content */}
        <div style={{
          backgroundColor: theme.surface,
          borderRadius: '16px',
          padding: '32px',
          border: `1px solid ${theme.border}`,
          boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          <ReactMarkdown
            components={{
              h1: ({children}) => (
                <h1 style={{
                  fontSize: '24px',
                  fontWeight: '500',
                  color: theme.text,
                  margin: '0 0 16px 0',
                  borderBottom: `2px solid ${theme.border}`,
                  paddingBottom: '8px'
                }}>{children}</h1>
              ),
              h2: ({children}) => (
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '500',
                  color: theme.text,
                  margin: '32px 0 16px 0'
                }}>{children}</h2>
              ),
              h3: ({children}) => (
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: theme.text,
                  margin: '24px 0 12px 0'
                }}>{children}</h3>
              ),
              p: ({children}) => (
                <p style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: theme.text,
                  margin: '0 0 16px 0'
                }}>{children}</p>
              ),
              ul: ({children}) => (
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: theme.text,
                  margin: '0 0 16px 0',
                  paddingLeft: '20px'
                }}>{children}</ul>
              ),
              li: ({children}) => (
                <li style={{
                  marginBottom: '8px',
                  position: 'relative'
                }}>
                  {children}
                </li>
              ),
              strong: ({children}) => (
                <strong style={{
                  fontWeight: '600',
                  color: theme.text
                }}>{children}</strong>
              )
            }}
          >
            {product.description}
          </ReactMarkdown>
        </div>

        {/* Sidebar */}
        <div style={{
          backgroundColor: theme.surface,
          borderRadius: '16px',
          padding: '24px',
          border: `1px solid ${theme.border}`,
          boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.08)',
          position: 'sticky',
          top: '20px'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: theme.text,
            margin: '0 0 16px 0',
            borderBottom: `1px solid ${theme.border}`,
            paddingBottom: '8px'
          }}>
            About {product.business.name}
          </h3>
          <p style={{
            fontSize: '14px',
            lineHeight: '1.5',
            color: theme.textSecondary,
            margin: '0 0 20px 0'
          }}>
            {product.business.description}
          </p>
          
          <div style={{
            padding: '16px',
            backgroundColor: isDarkMode ? theme.surfaceHover : '#f8f9fa',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`
          }}>
            <div style={{
              fontSize: '12px',
              color: theme.accent,
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              💡 Need Help?
            </div>
            <div style={{
              fontSize: '12px',
              color: theme.textSecondary
            }}>
              Contact our insurance experts for personalized advice
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
