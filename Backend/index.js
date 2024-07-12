import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const router = express.Router();
const PORT =3000;

// Access token for accessing the test server
const token = {
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIwNzg0MjU5LCJpYXQiOjE3MjA3ODM5NTksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImY4ODNhMDM2LTE2ZTEtNGE5NS1iOTZmLTk4YWQxZTkyYjk1MiIsInN1YiI6Im11c2thbi5ndXB0YV9jczIxQGdsYS5hYy5pbiJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiZjg4M2EwMzYtMTZlMS00YTk1LWI5NmYtOThhZDFlOTJiOTUyIiwiY2xpZW50U2VjcmV0IjoidGxjcVRua01ZVEpTRkx5VyIsIm93bmVyTmFtZSI6Ik11c2thbiBHdXB0YSIsIm93bmVyRW1haWwiOiJtdXNrYW4uZ3VwdGFfY3MyMUBnbGEuYWMuaW4iLCJyb2xsTm8iOiIyMTE1MDAwNjQwIn0.7TP9z54tjHqxlQ4IfanS5YIAVWOuljfLGT9NsjGB70Y",
    "expires_in": 1720784259
};


const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];

const fetchProductsFromCompany = async (company, categoryname, minPrice, maxPrice, top) => {
    try {
        const response = await axios.get(
            `http://20.244.56.144/test/companies/${company}/categories/${categoryname}/products`, {
                params: { minPrice, maxPrice, top }, // Include 'top' parameter here
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`Error fetching products from ${company}:`, error.response.status, error.response.data);
        } else {
            console.error(`Error fetching products from ${company}:`, error.message);
        }
        throw error; // Re-throw the error to propagate it to the caller
    }
};



router.get('/categories/:categoryname/products', async (req, res) => {
    const { categoryname } = req.params;
    let { n = 10, page = 1, sort = 'price', order = 'asc', minPrice = 1, maxPrice = 10000 } = req.query;

    // Parse integer values
    n = parseInt(n) || 5; // Use default value of 5 if n is not provided or not valid
    page = parseInt(page) || 1;
    minPrice = parseInt(minPrice) || 1;
    maxPrice = parseInt(maxPrice) || 10000;

    try {
        const promises = companies.map(company =>
            fetchProductsFromCompany(company, categoryname, minPrice, maxPrice, n) // Pass 'n' as 'top' parameter
        );

        const responses = await Promise.all(promises);
        let products = responses.flatMap(data => data);

        products = products.map(product => ({
            ...product,
            id: uuidv4(),
        }));

        products.sort((a, b) => {
            if (order === 'asc') return a[sort] > b[sort] ? 1 : -1;
            return a[sort] < b[sort] ? 1 : -1;
        });

        const startIndex = (page - 1) * n;
        const paginatedProducts = products.slice(startIndex, startIndex + n);

        res.json({
            total: products.length,
            page,
            pageSize: n,
            products: paginatedProducts,
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});