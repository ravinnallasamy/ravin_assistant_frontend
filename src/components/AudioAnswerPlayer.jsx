import React, { useEffect, useRef } from 'react';
import API_BASE_URL from '../config/api';

const AudioAnswerPlayer = ({ audioUrl }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioUrl && audioRef.current) {
            // Ensure full URL
            const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${API_BASE_URL}${audioUrl}`;
            audioRef.current.src = fullUrl;
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
    }, [audioUrl]);

    if (!audioUrl) return null;

    return (
        <div className="mt-4 hidden">
            <audio ref={audioRef} controls />
        </div>
    );
};

export default AudioAnswerPlayer;
