import React, { useState, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

const VoiceRecordButton = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);

    const startRecording = () => {
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert("Speech recognition not supported in this browser.");
                return;
            }

            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => setIsRecording(true);

            recognition.onend = () => {
                setIsRecording(false);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                onRecordingComplete(transcript);
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsRecording(false);
                if (event.error === 'not-allowed') {
                    alert("Microphone access denied. Please allow microphone access.");
                } else if (event.error !== 'no-speech') {
                    // Ignore no-speech error as it just means silence
                    alert("Speech recognition error: " + event.error);
                }
            };

            recognition.start();
            recognitionRef.current = recognition;

        } catch (error) {
            console.error('Error accessing microphone:', error);
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    return (
        <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'
                } text-white shadow-lg`}
            title={isRecording ? "Stop Recording" : "Ask by Voice"}
        >
            {isRecording ? <Square size={24} /> : <Mic size={24} />}
        </button>
    );
};

export default VoiceRecordButton;
