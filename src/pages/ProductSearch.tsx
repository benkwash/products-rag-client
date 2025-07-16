
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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

interface SuggestionQuery {
  id: string;
  text: string;
  category: string;
}

const ProductSearch: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Get query from URL parameters
  const query = searchParams.get('q') || '';

  const suggestionQueries: SuggestionQuery[] = [
    { id: '1', text: 'I need life insurance that gives me money back over time', category: 'cashback' },
    { id: '2', text: 'What are the most affordable term life insurance options?', category: 'term' },
    { id: '3', text: 'Are there insurance products available for non-citizens?', category: 'expat' },
    { id: '4', text: 'I want to plan ahead for funeral and burial expenses', category: 'funeral' },
    { id: '5', text: 'How can I save for my children\'s education through insurance?', category: 'education' },
    { id: '6', text: 'Show me insurance policies linked to investment returns', category: 'investment' },
    { id: '7', text: 'I want permanent life insurance that pays dividends', category: 'wholelife' },
    { id: '8', text: 'What insurance covers serious illnesses like cancer?', category: 'health' },
    { id: '9', text: 'I need comprehensive protection for my whole family', category: 'family' },
    { id: '10', text: 'Can I get life insurance without a medical examination?', category: 'nomedical' },
    { id: '11', text: 'What life insurance options are available for seniors?', category: 'senior' },
    { id: '12', text: 'I need insurance benefits for my employees', category: 'group' }
  ];

  const categoryPills = [
    { id: '1', text: 'Life Insurance', icon: '🛡️' },
    { id: '2', text: 'Health Coverage', icon: '🏥' },
    { id: '3', text: 'Premium Rates', icon: '💰' },
    { id: '4', text: 'Claims & Benefits', icon: '📋' },
    { id: '5', text: 'Policy Comparison', icon: '⚖️' },
    { id: '6', text: 'More', icon: '⋯' }
  ];

  // Initialize searchTerm from URL on component mount
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setProducts([]);
        return;
      }
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
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: SuggestionQuery) => {
    setSearchTerm(suggestion.text);
    setSearchParams({ q: suggestion.text });
  };

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
        accentHover: '#9cc2f7',
        searchBg: '#2d2d2d',
        searchBorder: '#454545',
        searchPlaceholder: '#9aa0a6'
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
        accentHover: '#1557b0',
        searchBg: '#ffffff',
        searchBorder: '#e1e5e9',
        searchPlaceholder: '#9aa0a6'
      };
    }
  };

  const theme = getThemeColors();

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
            onClick={toggleDarkMode}
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
              gap: '4px'
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

      {/* Hero Section - only show when no query */}
      {!query && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '85vh',
          padding: '40px 32px',
          backgroundColor: isDarkMode ? theme.background : '#f9f7f4',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '900px', marginBottom: '64px' }}>
            <h1 className="hero-heading" style={{
              fontSize: '56px',
              fontWeight: '400',
              margin: '0 0 24px 0',
              color: theme.text,
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}>
              Ask big questions about{' '}
              <span style={{
                color: '#f4b942',
                fontWeight: '500'
              }}>
                Insurance Products
              </span>
            </h1>
          </div>

          {/* Hero Search Box */}
          <div style={{
            width: '100%',
            maxWidth: '700px',
            marginBottom: '48px'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="What insurance product are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  width: '100%',
                  padding: '24px 70px 24px 24px',
                  fontSize: '17px',
                  backgroundColor: isDarkMode ? theme.surface : '#ffffff',
                  border: `1px solid ${isDarkMode ? theme.border : '#e0e0e0'}`,
                  borderRadius: '16px',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  color: theme.text,
                  boxShadow: isDarkMode ? '0 8px 32px rgba(0,0,0,0.3)' : '0 8px 32px rgba(0,0,0,0.12)',
                  fontWeight: '400'
                }}
                className='search-input hero-search-input'
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                style={{
                  position: 'absolute',
                  right: '12px',
                  padding: '14px 16px',
                  backgroundColor: loading ? theme.textSecondary : theme.accent,
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s',
                  opacity: loading ? 0.6 : 1,
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = theme.accentHover;
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = theme.accent;
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {loading ? '⏳' : '↗'}
              </button>
            </div>
          </div>

          {/* Suggestion Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '48px',
            maxWidth: '800px'
          }}>
            {suggestionQueries.slice(0, 6).map(suggestion => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '14px 24px',
                  backgroundColor: isDarkMode ? theme.surface : '#ffffff',
                  border: `1px solid ${isDarkMode ? theme.border : '#e0e0e0'}`,
                  borderRadius: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '15px',
                  color: theme.text,
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.08)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? theme.surfaceHover : '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? theme.surface : '#ffffff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = isDarkMode ? theme.border : '#e0e0e0';
                }}
              >
                <span style={{ fontSize: '14px', opacity: 0.7 }}>🔍</span>
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
          
          {/* Footer notice */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            color: theme.textSecondary,
            textAlign: 'center'
          }}>
            By using MyFIG, you agree to our{' '}
            <span style={{ 
              color: theme.accent, 
              cursor: 'pointer',
              textDecoration: 'underline' 
            }}>
              Terms of Service
            </span>
            {' '}and{' '}
            <span style={{ 
              color: theme.accent, 
              cursor: 'pointer',
              textDecoration: 'underline' 
            }}>
              Privacy Policy
            </span>
          </div>
        </div>
      )}

      {/* Results Section */}
      {query && (
        <div style={{
          backgroundColor: theme.background,
          minHeight: '100vh',
          paddingTop: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
            boxSizing: 'border-box'
          }}>
            {/* Compact Search Bar for Results */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '32px',
              width: '100%'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '1200px'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.textSecondary,
                  fontSize: '16px',
                  zIndex: 2
                }}>
                  🔍
                </div>
                <input
                  type="text"
                  placeholder="Search insurance products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: '100%',
                    padding: '18px 80px 18px 55px',
                    fontSize: '16px',
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '24px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    color: theme.text,
                    boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.2)' : '0 4px 16px rgba(0,0,0,0.08)',
                    boxSizing: 'border-box'
                  }}
                  className='search-input results-search-input'
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    padding: '12px 16px',
                    backgroundColor: loading ? theme.textSecondary : theme.accent,
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    opacity: loading ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = theme.accentHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = theme.accent;
                    }
                  }}
                >
                  {loading ? '⏳' : '→'}
                </button>
              </div>
            </div>

            {/* Popular suggestions - always show */}
            <div style={{ 
              marginBottom: '32px',
              display: 'flex',
              justifyContent: 'center',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1200px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: theme.textSecondary,
                  fontWeight: '500',
                  marginRight: '8px'
                }}>
                  Popular:
                </span>
                {suggestionQueries.slice(0, 6).map(suggestion => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: '13px',
                      color: theme.text,
                      fontWeight: '400',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? theme.surfaceHover : '#e8f0fe';
                      e.currentTarget.style.borderColor = theme.accent;
                      e.currentTarget.style.color = theme.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = theme.surface;
                      e.currentTarget.style.borderColor = theme.border;
                      e.currentTarget.style.color = theme.text;
                    }}
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Products count indicator */}
            {query && (
              <div style={{
                marginBottom: '24px',
                padding: '16px 0',
                borderBottom: `1px solid ${theme.border}`
              }}>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: theme.text
                }}>
                  {loading ? 'Searching...' : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
                </span>
                {query && !loading && (
                  <span style={{
                    fontSize: '14px',
                    color: theme.textSecondary,
                    marginLeft: '8px'
                  }}>
                    for "{query}"
                  </span>
                )}
              </div>
            )}

            {/* Results - show in same container */}
            {loading ? (
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                color: theme.textSecondary
              }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: `2px solid ${theme.border}`,
                    borderTop: `2px solid ${theme.accent}`,
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Searching...
                </div>
              </div>
            ) : (
              <div className="product-grid" style={{ 
                display: 'grid',
                gap: '24px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                marginTop: '24px',
                width: '100%'
              }}>
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Add CSS animation for loading spinner and mobile responsiveness */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .search-input:focus {
          border-color: ${theme.accent} !important;
          box-shadow: 0 0 0 3px ${theme.accent}20 !important;
        }
        
        .search-input::placeholder {
          color: ${theme.searchPlaceholder} !important;
        }
        
        @media (max-width: 768px) {
          .hero-heading {
            font-size: 36px !important;
            line-height: 1.2 !important;
          }
          
          .hero-search-input {
            padding: 20px 60px 20px 20px !important;
            font-size: 16px !important;
          }
          
          .results-search-input {
            padding: 16px 60px 16px 50px !important;
            font-size: 15px !important;
          }
          
          .suggestion-pills {
            justify-content: center !important;
          }
          
          .suggestion-pill {
            font-size: 12px !important;
            padding: 6px 12px !important;
          }
          
          .hero-container {
            padding: 20px 16px !important;
          }
          
          .results-container {
            padding: 0 12px !important;
          }
          
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 16px !important;
          }
          
          .search-tabs {
            flex-wrap: wrap !important;
            gap: 4px !important;
          }
          
          .search-tab {
            padding: 8px 12px !important;
            font-size: 13px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-heading {
            font-size: 28px !important;
          }
          
          .hero-search-input {
            padding: 18px 50px 18px 18px !important;
            font-size: 15px !important;
          }
          
          .results-search-input {
            padding: 14px 50px 14px 45px !important;
            font-size: 14px !important;
          }
          
          .suggestion-pill {
            font-size: 11px !important;
            padding: 5px 10px !important;
          }
          
          .product-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductSearch;
