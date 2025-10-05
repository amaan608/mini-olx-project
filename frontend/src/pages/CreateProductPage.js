import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import ProductForm from '../components/ProductForm';

function CreateProductPage() {
  const navigate = useNavigate();

  // This function now expects FormData
  const handleCreate = async (formData) => {
    try {
      // The headers are crucial for file uploads
      const response = await apiClient.post('/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/products/${response.data.id}`);
    } catch (error) {
      console.error('Failed to create product:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Add a New Product</h2>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}

export default CreateProductPage;