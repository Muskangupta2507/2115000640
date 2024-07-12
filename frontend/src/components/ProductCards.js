import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body1">Company: {product.company}</Typography>
        <Typography variant="body2">Category: {product.category}</Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">Rating: {product.rating}</Typography>
        <Typography variant="body2">Discount: {product.discount}%</Typography>
        <Typography variant="body2">Availability: {product.availability}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
