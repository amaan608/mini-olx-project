import React, { useState, useEffect } from 'react';

// 1. Define the list of categories
const categories = [
  "Cars",
  "Properties",
  "Mobiles",
  "Jobs",
  "Bikes",
  "Electronics & Appliances",
  "Commercial Vehicles & Spares",
  "Furniture",
  "Fashion",
  "Books, Sports & Hobbies",
  "Pets",
  "Services"
];

function ProductForm({ onSubmit, initialData }) {
  // State for text fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  // Set the initial category state to an empty string
  const [category, setCategory] = useState(''); 
  
  // State for the image file
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price || '');
      setCategory(initialData.category || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);

    if (imageFile) {
      formData.append('image', imageFile);
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>

      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* 2. Replace the text input with a select dropdown */}
      <label htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>-- Choose a Category --</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <label htmlFor="image">Upload Image</label>
      <input
        id="image"
        type="file"
        accept="image/png, image/jpeg, image/gif"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <button type="submit">Submit Product</button>
    </form>
  );
}

export default ProductForm;