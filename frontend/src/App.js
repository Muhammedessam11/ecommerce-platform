import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<ProductList />} />
            </Routes>
        </Router>
    );
}

export default App;

