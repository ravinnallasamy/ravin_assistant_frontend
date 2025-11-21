import React, { useEffect, useRef, useState } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';

const AudioAnswerPlayer = ({ text }) => {
    const hasSpokenRef = useRef('');
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (!text) return;

        // Prevent double speaking if text hasn't changed
        if (hasSpokenRef.current === text) return;

        // Stop any previous speech immediately
        window.speechSynthesis.cancel();
        setIsSpeaking(true);

        const speak = () => {
            const utterance = new SpeechSynthesisUtterance(text);

            // ⚡ SPEED: 1.1x
            utterance.rate = 1.1;
            utterance.pitch = 1.0;

            // 🗣️ VOICE SELECTION DEBUGGING
            const voices = window.speechSynthesis.getVoices();
            console.log("🗣️ Available Voices:", voices.map(v => `${v.name} (${v.lang})`));

            // 1. Try specific known high-quality male voices
            let preferredVoice = voices.find(v =>
                (v.name.includes("Microsoft David") || v.name.includes("Google US English")) && v.lang.includes("en-US")
            );

            // 2. Try any male voice
            if (!preferredVoice) {
                preferredVoice = voices.find(v =>
                    (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david") || v.name.toLowerCase().includes("mark"))
                    && v.lang.includes("en-US")
                );
            }

            // 3. Fallback to any US English voice (might be female, but we have no choice)
            if (!preferredVoice) {
                preferredVoice = voices.find(v => v.lang.includes("en-US"));
            }

            if (preferredVoice) {
                utterance.voice = preferredVoice;
                console.log("🗣️ SELECTED VOICE:", preferredVoice.name);
            } else {
                console.warn("⚠️ No suitable voice found, using default.");
            }

            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = (e) => {
                if (e.error === 'interrupted') {
                    // This is expected when we cancel speech to start a new one
                    return;
                }
                console.error("🗣️ Speech Error:", e);
                setIsSpeaking(false);
            };

            window.speechSynthesis.speak(utterance);
            hasSpokenRef.current = text;
        };

        // Chrome sometimes needs a delay to load voices
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = speak;
        } else {
            speak();
        }

        // Cleanup on unmount
        return () => {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        };

    }, [text]);

    const stopAudio = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const replayAudio = () => {
        hasSpokenRef.current = ''; // Reset ref to allow replay
        // Trigger effect by forcing a re-render or just calling speak logic (simplest is to reset ref and let effect run if we toggled a state, but here we can just manually trigger if needed, but resetting ref and toggling a dummy state or just passing text again would work. 
        // Actually, simpler: just clear ref and force update. 
        // For now, let's just manually call speak logic or rely on parent. 
        // Better: Just reset ref and let user ask again? No, we want a replay button.
        // Let's just manually trigger speak here for replay.
        window.speechSynthesis.cancel();
        setIsSpeaking(true);

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1;
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v =>
            (v.name.includes("David") || v.name.includes("Mark") || v.name.includes("Male")) && v.lang.includes("en-US")
        ) || voices.find(v => v.lang.includes("en-US"));
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
    };

    if (!text) return null;

    return (
        <div className="mt-2 flex gap-2">
            {isSpeaking ? (
                <button
                    onClick={stopAudio}
                    className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors text-sm font-medium"
                >
                    <VolumeX size={16} /> Stop Audio
                </button>
            ) : (
                <button
                    onClick={replayAudio}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                    <Volume2 size={16} /> Replay Answer
                </button>
            )}
        </div>
    );
};

export default AudioAnswerPlayer;
