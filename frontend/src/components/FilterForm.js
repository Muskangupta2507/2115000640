import React, { useState } from 'react';

const ProductFilterForm = ({ onSubmit }) => {
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [minRating, setMinRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Prepare your filter object with form values
        const filters = {
            category,
            company,
            minRating: parseFloat(minRating),
            minPrice: parseFloat(minPrice),
            maxPrice: parseFloat(maxPrice),
        };
        onSubmit(filters); // Pass the filters to the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Category:</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div>
                <label>Company:</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div>
                <label>Minimum Rating:</label>
                <input type="number" value={minRating} onChange={(e) => setMinRating(e.target.value)} />
            </div>
            <div>
                <label>Minimum Price:</label>
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
                <label>Maximum Price:</label>
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default ProductFilterForm;
