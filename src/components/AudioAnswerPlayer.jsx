import React, { useEffect, useRef } from 'react';
import API_BASE_URL from '../config/api';

const AudioAnswerPlayer = ({ audioUrl, text }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        // Stop any previous speech
        window.speechSynthesis.cancel();

        if (audioUrl) {
            // Ensure full URL
            const fullUrl = audioUrl.startsWith('http') ? audioUrl : `${API_BASE_URL}${audioUrl}`;
            if (audioRef.current) {
                audioRef.current.src = fullUrl;
                audioRef.current.play().catch(e => {
                    console.error("Audio play failed, falling back to browser TTS:", e);
                    speakText(text);
                });
            }
        } else if (text) {
            // Fallback if no audio URL provided
            speakText(text);
        }
    }, [audioUrl, text]);

    const speakText = (txt) => {
        if (!txt) return;
        const utterance = new SpeechSynthesisUtterance(txt);
        // Optional: Select a male voice if available to match "textToSpeechMale"
        const voices = window.speechSynthesis.getVoices();
        const maleVoice = voices.find(v => v.name.toLowerCase().includes('male')) || voices[0];
        if (maleVoice) utterance.voice = maleVoice;

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="mt-4 hidden">
            <audio ref={audioRef} controls onError={() => speakText(text)} />
        </div>
    );
};

export default AudioAnswerPlayer;
