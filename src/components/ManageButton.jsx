import React from 'react';
import { Settings } from 'lucide-react';

const ManageButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-4 right-4 p-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full shadow-md transition-colors z-40"
            title="Manage"
        >
            <Settings size={20} />
        </button>
    );
};

export default ManageButton;
