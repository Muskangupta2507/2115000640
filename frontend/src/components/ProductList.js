import React from 'react';
import ProductCard from './ProductCards';
import { Grid } from '@mui/material';

const ProductList = ({ products }) => {
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
