import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/signup" element={<Signup />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App; 