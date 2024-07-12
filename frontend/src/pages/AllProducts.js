// src/pages/AllProducts.js
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api'; // Import your API function
import FilterForm from '../components/FilterForm';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products when component mounts
        fetchProducts({})
            .then(response => {
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error.message);
                setLoading(false);
            });
    }, []);

    const handleFilterSubmit = (filters) => {
        // Handle filter form submission
        setLoading(true);
        fetchProducts(filters)
            .then(response => {
                setProducts(response.data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching filtered products:', error.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>All Products</h1>
            <FilterForm onSubmit={handleFilterSubmit} />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products.map(product => (
                        <div key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Company: {product.company}</p>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {product.rating}</p>
                            <p>Discount: {product.discount}%</p>
                            <p>Availability: {product.availability ? 'Available' : 'Out of Stock'}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProducts;
