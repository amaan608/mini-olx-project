import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import ProductForm from '../components/ProductForm';

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await apiClient.get(`/products/${id}/`);
      setProduct(response.data);
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (productData) => {
    try {
      await apiClient.put(`/products/${id}/`, productData);
      navigate(`/products/${id}`);
    } catch (error) {
      console.error('Failed to update product:', error.response.data);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm onSubmit={handleUpdate} initialData={product} />
    </div>
  );
}
export default EditProductPage;