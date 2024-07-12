import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './pages/AllProducts';
import SingleProduct from './pages/SingleProduct';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<AllProducts />} />
                <Route path="/product/:id" element={<SingleProduct />} />
            </Routes>
        </Router>
    );
}

export default App;
