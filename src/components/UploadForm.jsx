import React, { useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';
import API_BASE_URL from '../config/api';

const UploadForm = ({ type, onSuccess, password }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        formData.append('password', password); // Send password for auth middleware

        try {
            await axios.post(`${API_BASE_URL}/api/admin/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-admin-password': password
                }
            });
            onSuccess();
            setFile(null);
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleUpload} className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 capitalize">{type} Upload</label>
            <div className="flex gap-2">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    accept={type === 'resume' ? '.pdf,.doc,.docx' : 'image/*'}
                />
                <button
                    type="submit"
                    disabled={loading || !file}
                    className="bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
                >
                    {loading ? '...' : <Upload size={20} />}
                </button>
            </div>
        </form>
    );
};

export default UploadForm;
