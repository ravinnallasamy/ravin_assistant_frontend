import React, { useState, useEffect } from 'react';
import axios from 'axios';
        }
    };

const handleAsk = async (textOverride) => {
    const q = textOverride || question;
    if (!q.trim()) return;

    setLoading(true);
    setAnswer('');
    setAudioUrl('');

    try {
        const res = await axios.post(`${API_BASE_URL}/api/public/ask`, {
            question: q,
            voice: true // Always request audio as per requirements
        });

        setAnswer(res.data.answer);
        setAudioUrl(res.data.audioUrl);
    } catch (error) {
        console.error('Error asking question:', error);
        setAnswer('Sorry, I encountered an error. Please try again.');
    } finally {
        setLoading(false);
    }
};

const handleVoiceInput = (text) => {
    setQuestion(text);
    handleAsk(text);
};

const handleAdminLogin = (password) => {
    // Store password in session storage or context if needed for protected routes
    // For now, we just navigate to dashboard
    // In a real app, we'd set a token.
    // We'll pass the password via state or just rely on the fact that we are "logged in" 
    // (but backend checks password on every request, so we need to store it).
    sessionStorage.setItem('adminPassword', password);
    navigate('/admin');
};

if (!profile) return <div className="flex justify-center items-center h-screen">Loading...</div>;

return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-32 sm:h-48"></div>
            <div className="px-6 sm:px-8 pb-8 relative">
                <div className="relative -mt-16 sm:-mt-20 mb-6">
                    <img
                        src={profile.photo_url || "https://placehold.co/150"}
                        alt="Profile"
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                    />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl font-bold text-slate-900">My AI Assistant</h1>
                    <p className="text-slate-600 text-lg leading-relaxed">{profile.bio || "Welcome to my personal AI assistant. Ask me anything about my professional background!"}</p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {profile.resume_url && (
                            <a href={profile.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
                                <FileText size={18} /> Resume
                            </a>
                        )}
                        {profile.github_url && (
                            <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                                <Github size={20} /> GitHub
                            </a>
                        )}
                        {profile.linkedin_url && (
                            <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-blue-700 transition-colors">
                                <Linkedin size={20} /> LinkedIn
                            </a>
                        )}
                        {profile.portfolio_url && (
                            <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors">
                                <Globe size={20} /> Portfolio
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Q&A Section */}
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Ask me anything</h2>

            <div className="relative mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                        placeholder="e.g., What is your experience with React?"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                    />
                    <button
                        onClick={() => handleAsk()}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50"
                    >
                        <Send size={24} />
                    </button>
                </div>
                <div className="absolute right-16 top-1/2 -translate-y-1/2">
                    {/* Voice button positioned inside or near input */}
                </div>
            </div>

            <div className="flex justify-center mb-8">
                <VoiceRecordButton onRecordingComplete={handleVoiceInput} />
                <span className="ml-3 self-center text-slate-500 text-sm">Tap to speak</span>
            </div>

            {/* Answer Area */}
            {loading && (
                <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}

            {answer && !loading && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Answer</h3>
                    <p className="text-slate-800 text-lg leading-relaxed">{answer}</p>
                    <AudioAnswerPlayer audioUrl={audioUrl} />
                </div>
            )}
        </div>

        <ManageButton onClick={() => setIsModalOpen(true)} />

        <AdminPasswordModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onLoginSuccess={handleAdminLogin}
        />
    </div>
);
};

export default PublicHome;
