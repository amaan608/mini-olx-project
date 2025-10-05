import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { useAuth } from '../context/AuthContext';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiClient.delete(`/products/${id}/`);
        navigate('/');
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('You do not have permission to delete this product.');
      }
    }
  };

  if (!product) {
    return <div className="container">Loading...</div>;
  }

  // Use product.image directly because the API provides the full URL
  const fullImageUrl = product.image || 'https://via.placeholder.com/600x400?text=No+Image';

  // Check if the currently logged-in user is the owner
  const isOwner = user && user.username === product.owner;

  return (
    <div className="container">
      <div className="product-detail-container">
        <img src={fullImageUrl} alt={product.title} className="product-detail-image" />
        <div className="product-detail-info">
          <h1>{product.title}</h1>
          <p className="product-price">₹ {parseFloat(product.price).toLocaleString('en-IN')}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Seller:</strong> {product.owner}</p>
          <hr />
          <p>{product.description}</p>
          <hr />

          {isOwner && (
            <div className="owner-actions">
              <Link to={`/products/${id}/edit`}>
                <button>Update Product</button>
              </Link>
              <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red' }}>
                Delete Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;