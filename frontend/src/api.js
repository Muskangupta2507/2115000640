import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchProducts = (params) => {
    return axios.get(`${API_URL}/categories/${params.category}/products`, { params });
};

export const fetchProductById = (id) => {
    return axios.get(`${API_URL}/products/${id}`);
};
