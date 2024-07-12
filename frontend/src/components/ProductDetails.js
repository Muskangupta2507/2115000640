import React, { useEffect, useState } from 'react';
import { fetchProductById } from '../api';
import { useParams } from 'react-router-dom';
import { Typography, Container, CircularProgress } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductById(id)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    if (loading) return <CircularProgress />;

    return (
        <Container>
            <img src={product.image} alt={product.name} />
            <Typography variant="h3">{product.name}</Typography>
            <Typography variant="h6">Company: {product.company}</Typography>
            <Typography variant="body1">Category: {product.category}</Typography>
            <Typography variant="body1">Price: ${product.price}</Typography>
            <Typography variant="body1">Rating: {product.rating}</Typography>
            <Typography variant="body1">Discount: {product.discount}%</Typography>
            <Typography variant="body1">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
        </Container>
    );
};

export default ProductDetails;
