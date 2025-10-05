import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/apiClient';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on the search query before rendering
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="container">Loading products...</div>;
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Find Cars, Mobile Phones and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h1 className="page-title">Fresh Recommendations</h1>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card-link">
              <div className="product-card">
                <div className="product-image-container">
                  <img 
                    src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={product.title} 
                    className="product-image"
                  />
                </div>
                <div className="product-details">
                  <h2 className="product-price">₹ {parseFloat(product.price).toLocaleString('en-IN')}</h2>
                  <p className="product-title">{product.title}</p>
                  <p className="product-category">{product.category}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;