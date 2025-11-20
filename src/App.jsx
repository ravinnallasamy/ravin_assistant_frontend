import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import AdminDashboard from './pages/AdminDashboard';


function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                <Routes>
                    <Route path="/" element={<PublicHome />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
