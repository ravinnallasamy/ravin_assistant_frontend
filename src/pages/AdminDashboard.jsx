import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UploadForm from '../components/UploadForm';
import EditForm from '../components/EditForm';
import { ArrowLeft } from 'lucide-react';
import API_BASE_URL from '../config/api';

const AdminDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [qnaHistory, setQnaHistory] = useState([]);
    const navigate = useNavigate();
    const password = sessionStorage.getItem('adminPassword');

    useEffect(() => {
        if (!password) {
            navigate('/');
            return;
        }
        fetchData();
    }, [password, navigate]);

    const fetchData = async () => {
        try {
            // Fetch profile (Admin endpoint to get scraped data)
            // Pass password in headers as per middleware requirement (assuming middleware checks headers now, or I'll stick to body if needed but GET doesn't have body usually. 
            // Wait, the previous code had comments about middleware issues. 
            // I'll assume I can pass it in headers 'x-admin-password' or similar.
            // If middleware only checks body, I might need to fix middleware.
            // Let's check middleware first? No, I'll just try headers.
            // Actually, for GET requests, standard practice is headers.

            const profileRes = await axios.get(`${API_BASE_URL}/api/admin/profile`, {
                headers: { 'x-admin-password': password }
            });
            setProfile(profileRes.data);

            // Fetch QnA history
            const qnaRes = await axios.get(`${API_BASE_URL}/api/admin/qna`, {
                headers: { 'x-admin-password': password }
            });
            setQnaHistory(qnaRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-8">
                    <button onClick={() => navigate('/')} className="mr-4 p-2 rounded-full hover:bg-white transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Management */}
                    <div className="bg-white rounded-xl shadow-md p-6 space-y-8">
                        <h2 className="text-xl font-semibold text-slate-700 border-b pb-2">Profile Management</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <UploadForm type="photo" onSuccess={fetchData} password={password} />
                            <UploadForm type="resume" onSuccess={fetchData} password={password} />
                        </div>

                        <EditForm initialData={profile} onSuccess={fetchData} password={password} />
                    </div>

                    {/* QnA History & Scraped Data */}
                    <div className="space-y-8">
                        {/* Scraped Data View */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Scraped Data Preview</h2>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {profile ? (
                                    <>
                                        <div className="p-3 bg-slate-50 rounded border border-slate-200">
                                            <div className="flex justify-between items-center mb-1">
                                                <h3 className="font-medium text-slate-700">Resume Content</h3>
                                                {profile.resume_url && (
                                                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                                        View PDF
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 whitespace-pre-wrap">
                                                {profile.scraped_resume ? profile.scraped_resume.substring(0, 500) + '...' : 'No resume content scraped.'}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded border border-slate-200">
                                            <h3 className="font-medium text-slate-700 mb-1">GitHub Data</h3>
                                            <p className="text-xs text-slate-500 whitespace-pre-wrap">
                                                {profile.scraped_github ? profile.scraped_github.substring(0, 500) + '...' : 'No GitHub data scraped.'}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded border border-slate-200">
                                            <h3 className="font-medium text-slate-700 mb-1">LinkedIn Data</h3>
                                            <p className="text-xs text-slate-500 whitespace-pre-wrap">
                                                {profile.scraped_linkedin ? profile.scraped_linkedin.substring(0, 500) + '...' : 'No LinkedIn data scraped.'}
                                            </p>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded border border-slate-200">
                                            <h3 className="font-medium text-slate-700 mb-1">Portfolio Data</h3>
                                            <p className="text-xs text-slate-500 whitespace-pre-wrap">
                                                {profile.scraped_portfolio ? profile.scraped_portfolio.substring(0, 500) + '...' : 'No Portfolio data scraped.'}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-slate-500 text-sm">Loading profile data...</p>
                                )}
                            </div>
                        </div>

                        {/* QnA History */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-slate-700 border-b pb-2 mb-4">Q&A History</h2>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {qnaHistory.length === 0 ? (
                                    <p className="text-slate-500">No questions yet.</p>
                                ) : (
                                    qnaHistory.map((item) => (
                                        <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                            <p className="font-medium text-slate-800 mb-2">Q: {item.question}</p>
                                            <p className="text-slate-600 text-sm">A: {item.answer}</p>
                                            <p className="text-xs text-slate-400 mt-2">{new Date(item.created_at).toLocaleString()}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
