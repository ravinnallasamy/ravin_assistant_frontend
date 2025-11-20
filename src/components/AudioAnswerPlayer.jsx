import React, { useEffect, useRef } from 'react';

const AudioAnswerPlayer = ({ audioUrl }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioUrl && audioRef.current) {
            audioRef.current.src = audioUrl;
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
